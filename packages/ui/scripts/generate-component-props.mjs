/**
 * Generates the public `*Props` aliases the React package exports.
 *
 * Every upstream component exports `type XxxProps`. A Vue SFC's props are the
 * same contract, so each missing alias is derived from the local component's
 * own `$props`. Rerun after `sync:upstream`; `check:props` fails when the
 * output is stale.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT = join(ROOT, "src/component-props.generated.ts");
const LOCAL = join(ROOT, "src/components");
const UPSTREAM = join(ROOT, "../../tooling/upstream/.work");
const LOCK = join(ROOT, "../../tooling/upstream/upstream.lock.json");

const lock = existsSync(LOCK) ? JSON.parse(await readFile(LOCK, "utf8")) : null;
const snapshot = lock ? join(UPSTREAM, `raft-design-${lock.commit}`) : null;
const upstreamRoot =
  snapshot && existsSync(snapshot) ? join(snapshot, "packages/ui/src/components") : null;

const check = process.argv.includes("--check");
if (!upstreamRoot) {
  const message = "upstream snapshot missing; run `bun run sync:upstream`";
  if (check) console.warn(`skipped props check: ${message}`);
  else {
    console.error(message);
    process.exit(1);
  }
  process.exit(0);
}

function exportedTypes(source) {
  const names = new Set();
  for (const match of source.matchAll(/export\s+type\s*\{([^}]*)\}/g)) {
    for (const part of match[1].split(",")) {
      const name = part
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (name) names.add(name);
    }
  }
  // `export { type Foo, Bar }` — mixed value/type blocks.
  for (const match of source.matchAll(/export\s+\{([^}]*)\}/g)) {
    for (const part of match[1].split(",")) {
      const trimmed = part.trim();
      if (!trimmed.startsWith("type ")) continue;
      names.add(
        trimmed
          .slice(5)
          .split(/\s+as\s+/)
          .pop()
          ?.trim(),
      );
    }
  }
  for (const match of source.matchAll(/export\s+type\s+(\w+)/g)) names.add(match[1]);
  return names;
}

function exportedComponents(source) {
  const components = new Map();
  const imports = new Map();
  for (const match of source.matchAll(/import\s+(\w+)\s+from\s+"([^"]+\.vue)"/g)) {
    imports.set(match[1], match[2]);
  }
  for (const match of source.matchAll(/export\s*\{([^}]*)\}\s*(?:from\s+"([^"]+)")?/g)) {
    const from = match[2];
    for (const part of match[1].split(",")) {
      const specifier = part.trim();
      if (specifier.startsWith("type ")) continue;
      const [local, exported] = specifier.split(/\s+as\s+/).map((value) => value?.trim());
      const name = exported || local;
      if (!name || !local) continue;
      if (local === "default" && from) components.set(name, { path: from });
      else {
        const path = imports.get(local) ?? from;
        if (path) components.set(name, { path, named: path.endsWith(".vue") ? undefined : local });
      }
    }
  }
  return components;
}

const folders = (await readdir(LOCAL, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => (a.name < b.name ? -1 : 1));
const localTypes = new Set();
const localComponents = new Map();

for (const folder of folders) {
  const indexPath = join(LOCAL, folder.name, "index.ts");
  if (!existsSync(indexPath)) continue;
  const source = await readFile(indexPath, "utf8");
  for (const name of exportedTypes(source)) localTypes.add(name);
  for (const [name, entry] of exportedComponents(source)) {
    localComponents.set(name, {
      ...entry,
      path: join("components", folder.name, entry.path.replace(/^\.\//, "")),
    });
  }
  // Files are the source of truth: a component named `CardHeader` lives in
  // `CardHeader.vue` even when the barrel only exports it indirectly.
  const entries = (await readdir(join(LOCAL, folder.name))).sort();

  for (const file of entries) {
    if (!file.endsWith(".vue")) continue;
    const name = file.slice(0, -".vue".length);
    if (!localComponents.has(name)) {
      localComponents.set(name, { path: join("components", folder.name, file) });
    }
  }
  // Parts compiled through `createSlotComponent`/`defineComponent` live in
  // plain `.ts` modules instead of SFCs.
  for (const file of entries) {
    if (!file.endsWith(".ts") || file.endsWith(".test.ts")) continue;
    const partSource = await readFile(join(LOCAL, folder.name, file), "utf8");
    for (const match of partSource.matchAll(/export\s+const\s+(\w+)\s*[=:]/g)) {
      if (!localComponents.has(match[1])) {
        localComponents.set(match[1], {
          path: join("components", folder.name, file),
          named: match[1],
        });
      }
    }
  }
}

const aliases = new Map();
if (upstreamRoot && existsSync(upstreamRoot)) {
  for (const name of await readdir(upstreamRoot)) {
    const indexPath = join(upstreamRoot, name, "index.ts");
    if (!existsSync(indexPath)) continue;
    const wanted = exportedTypes(await readFile(indexPath, "utf8"));
    for (const type of wanted) {
      if (localTypes.has(type) || aliases.has(type) || !type.endsWith("Props")) continue;
      const component = type.slice(0, -"Props".length);
      const entry = localComponents.get(component);
      if (entry) aliases.set(type, entry);
    }
  }
}

const lines = [
  "/* Generated by scripts/generate-component-props.mjs — do not edit. */",
  "/* Props aliases for the React package's exported `*Props` types. */",
  "",
];
for (const [type, entry] of [...aliases].sort(([a], [b]) => a.localeCompare(b))) {
  const exported = entry.named ? `["${entry.named}"]` : `["default"]`;
  lines.push(
    `export type ${type} = InstanceType<(typeof import("./${entry.path}"))${exported}>["$props"];`,
  );
}
lines.push("");

const content = lines.join("\n");
if (check) {
  const current = existsSync(OUT) ? await readFile(OUT, "utf8") : "";
  if (current !== content) {
    console.error("component-props.generated.ts is stale; run `bun run generate:props`");
    process.exit(1);
  }
  console.log(`component props: ${aliases.size} up to date`);
} else {
  await writeFile(OUT, content);
  console.log(`generated ${aliases.size} props types -> ${OUT}`);
}
