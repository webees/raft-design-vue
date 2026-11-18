/**
 * Fails when an upstream component barrel exports a type we do not.
 *
 * The check writes a temporary probe that imports every upstream type from the
 * package root and lets `vue-tsc` resolve it, so aliases, re-exports and
 * `export *` chains are all evaluated by the real compiler instead of a regex.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const uiRoot = join(import.meta.dir, "..");
const root = join(uiRoot, "../..");
const lock = JSON.parse(readFileSync(join(root, "tooling/upstream/upstream.lock.json"), "utf8"));
const upstream = join(
  root,
  "tooling/upstream/.work",
  `raft-design-${lock.commit}`,
  "packages/ui/src/components",
);

if (!existsSync(upstream)) {
  console.error(`Upstream snapshot missing: ${upstream}\nRun \`bun run sync:upstream\`.`);
  process.exit(1);
}

const typeBlock = /export\s+type\s*\{([^}]*)\}/g;
const typeDeclaration = /export\s+(?:type|interface)\s+(\w+)/g;

function exportedTypes(file) {
  const source = readFileSync(file, "utf8");
  const names = new Set();
  for (const match of source.matchAll(typeBlock)) {
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
  for (const match of source.matchAll(typeDeclaration)) names.add(match[1]);
  return [...names].sort();
}

const names = [];
for (const entry of readdirSync(upstream)) {
  const dir = join(upstream, entry);
  if (!statSync(dir).isDirectory()) continue;
  const barrel = join(dir, "index.ts");
  if (existsSync(barrel)) names.push(...exportedTypes(barrel));
}

const unique = [...new Set(names)].sort();
const probe = join(uiRoot, "src/__api-surface.probe.ts");
writeFileSync(
  probe,
  `import type {\n${unique.map((name) => `  ${name},`).join("\n")}\n} from "./index";\n`,
);

let output = "";
try {
  execFileSync(join(uiRoot, "node_modules/.bin/vue-tsc"), ["--noEmit", "-p", "tsconfig.json"], {
    cwd: uiRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (error) {
  output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
} finally {
  rmSync(probe, { force: true });
}

const missing = [
  ...new Set(
    output
      .split("\n")
      .filter((line) => line.includes("__api-surface.probe.ts"))
      .map((line) => line.match(/no exported member (?:named )?'(\w+)'/)?.[1])
      .filter(Boolean),
  ),
].sort();

if (missing.length) {
  console.error(`Missing ${missing.length} upstream type(s):\n- ${missing.join("\n- ")}`);
  process.exit(1);
}

console.log(`API surface: ${unique.length}/${unique.length} upstream types exported.`);
