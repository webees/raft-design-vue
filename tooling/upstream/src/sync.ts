import { cp, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  DESIGN_DIR,
  LOCK_PATH,
  MANIFEST_PATH,
  ROOT,
  SPEC_DIR,
  TOOLING_DIR,
  UPSTREAM_REPO,
  WORK_DIR,
  isDirectory,
  parseArgs,
  readJson,
  rel,
  resolveCommit,
  sha256,
  walk,
  writeJson,
  type ComponentEntry,
  type ComponentManifest,
  type UpstreamLock,
} from "./shared";
import { rewriteDesignLinks } from "./docs-links";

const args = parseArgs(process.argv.slice(2));
const ref = typeof args.ref === "string" ? args.ref : "main";
const commit = typeof args.commit === "string" ? args.commit : await resolveCommit(ref);
const sourceDir = join(WORK_DIR, `raft-design-${commit}`);
const archive = join(WORK_DIR, `${commit}.tar.gz`);

await mkdir(WORK_DIR, { recursive: true });

if (!existsSync(join(sourceDir, "packages/ui/src/tokens.json"))) {
  console.log(`Fetching ${UPSTREAM_REPO}@${commit.slice(0, 12)}…`);
  const response = await fetch(`https://codeload.github.com/${UPSTREAM_REPO}/tar.gz/${commit}`, {
    headers: { "User-Agent": "webees-raft-design-vue-sync" },
  });
  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status}`);
  }
  await Bun.write(archive, response);
  await mkdir(sourceDir, { recursive: true });
  const tar = Bun.spawnSync(["tar", "-xzf", archive, "-C", sourceDir, "--strip-components=1"], {
    stdout: "inherit",
    stderr: "inherit",
  });
  if (tar.exitCode !== 0) throw new Error("Failed to extract upstream archive");
}

const synced = new Map<string, string>();

async function copyFile(from: string, to: string): Promise<void> {
  if (!existsSync(from)) return;
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to);
  synced.set(rel(to), sha256(await Bun.file(to).bytes()));
}

// Design documentation and fonts. Brand artwork is deliberately excluded.
for (const file of walk(
  join(sourceDir, "design"),
  (path) => path.endsWith(".md") || path.endsWith(".woff2") || path.endsWith("OFL.txt"),
)) {
  const relativePath = file.slice(join(sourceDir, "design").length + 1);
  await copyFile(file, join(DESIGN_DIR, relativePath));
}

// Canonical token and theme inputs.
await copyFile(join(sourceDir, "packages/ui/src/tokens.json"), join(SPEC_DIR, "tokens.json"));
await copyFile(join(sourceDir, "packages/ui/src/themes.json"), join(SPEC_DIR, "themes.json"));

// Upstream generator is kept next to its expected paths so its output is
// byte-for-byte reproducible.
await copyFile(
  join(sourceDir, "packages/ui/scripts/build-tokens.mjs"),
  join(SPEC_DIR, "../scripts/vendor-build-tokens.mjs"),
);

// Fonts CSS and files.
for (const file of walk(join(sourceDir, "packages/ui/src/fonts"))) {
  const relativePath = file.slice(join(sourceDir, "packages/ui/src/fonts").length + 1);
  await copyFile(file, join(SPEC_DIR, "fonts", relativePath));
}
await copyFile(join(sourceDir, "packages/ui/src/fonts.css"), join(SPEC_DIR, "fonts.css"));

// Tailwind theme aliases and custom utilities. Remove imports that point at
// React component CSS; those are reimplemented in Vue.
const upstreamStylesPath = join(sourceDir, "packages/ui/src/styles.css");
if (existsSync(upstreamStylesPath)) {
  const original = await Bun.file(upstreamStylesPath).text();
  const stripped = original.replace(/^@import[^\n]*\n/gm, "");
  const header = [
    "/*",
    " * Vendored from botiverse/raft-design packages/ui/src/styles.css.",
    ` * Upstream commit: ${commit}`,
    " * MIT licensed. Do not edit by hand: run `bun run sync:upstream`.",
    " * React component @import lines are removed; equivalent Vue components",
    " * live in packages/ui/src/components.",
    " */",
    "",
  ].join("\n");
  const output = `${header}${stripped}`;
  const target = join(SPEC_DIR, "upstream-styles.css");
  await Bun.write(target, output);
  synced.set(rel(target), sha256(output));
}

// Component docs are copied into the design mirror for the docs browser.
const upstreamComponents = join(sourceDir, "packages/ui/src/components");
for (const { name, file } of componentDocs(upstreamComponents)) {
  await copyFile(file, join(DESIGN_DIR, "components", `${name}.md`));
}

await copyFile(join(sourceDir, "LICENSE"), join(TOOLING_DIR, "UPSTREAM-LICENSE"));
await copyFile(join(sourceDir, "NOTICE.md"), join(TOOLING_DIR, "UPSTREAM-NOTICE.md"));
const notice = join(TOOLING_DIR, "UPSTREAM-NOTICE.md");
if (existsSync(notice)) {
  const text = (await Bun.file(notice).text())
    .replace("](./LICENSE)", "](./UPSTREAM-LICENSE)")
    .replace("](./design/fonts/OFL.txt)", "](../../design/fonts/OFL.txt)");
  await Bun.write(notice, text);
  synced.set(rel(notice), sha256(text));
}

const links = rewriteDesignLinks();
if (links.broken > 0) throw new Error(`Upstream docs have ${links.broken} broken link(s)`);
for (const path of synced.keys()) {
  if (path.startsWith("design/"))
    synced.set(path, sha256(await Bun.file(join(ROOT, path)).bytes()));
}

const lock: UpstreamLock = {
  repository: UPSTREAM_REPO,
  ref,
  commit,
  syncedAt: new Date().toISOString(),
  files: Object.fromEntries([...synced.entries()].sort(([a], [b]) => a.localeCompare(b))),
};
await writeJson(LOCK_PATH, lock);

const previousManifest = existsSync(MANIFEST_PATH)
  ? readJson<ComponentManifest>(MANIFEST_PATH)
  : undefined;
const components: Record<string, ComponentEntry> = previousManifest?.components ?? {};
const upstreamDirs = isDirectory(upstreamComponents)
  ? await readdir(upstreamComponents, { withFileTypes: true })
  : [];
const names = upstreamDirs
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const name of names) {
  const localPath = join(SPEC_DIR, "components", name);
  const previous = components[name];
  components[name] = {
    status:
      previous?.status === "not-applicable"
        ? "not-applicable"
        : existsSync(join(localPath, "index.ts"))
          ? "ported"
          : (previous?.status ?? "planned"),
    upstreamPath: `packages/ui/src/components/${name}`,
    ...(existsSync(join(localPath, "index.ts")) ? { localPath: rel(localPath) } : {}),
    ...(previous?.notes ? { notes: previous.notes } : {}),
  };
}
for (const [name, entry] of Object.entries(components)) {
  if (!names.includes(name)) {
    components[name] = { ...entry, notes: "Removed upstream; decide whether to keep." };
  }
}

const manifest: ComponentManifest = {
  repository: UPSTREAM_REPO,
  commit,
  generatedAt: new Date().toISOString(),
  components,
};
await writeJson(MANIFEST_PATH, manifest);

const added = names.filter((name) => !previousManifest?.components[name]);
const ported = Object.values(components).filter((entry) => entry.status === "ported").length;
console.log(
  [
    `Synced ${UPSTREAM_REPO}@${commit.slice(0, 12)}`,
    `files: ${synced.size}`,
    `components: ${names.length} (${ported} ported)`,
    added.length ? `new upstream components: ${added.join(", ")}` : "new upstream components: none",
  ].join("\n"),
);

function componentDocs(dir: string): { name: string; file: string }[] {
  if (!existsSync(dir)) return [];
  return walk(dir, (path) => path.endsWith(".md")).flatMap((file) => {
    const parts = file.slice(dir.length + 1).split("/");
    return parts.length === 2 && parts[0] && parts[1] ? [{ name: parts[0], file }] : [];
  });
}
