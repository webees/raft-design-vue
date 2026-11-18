#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const designRoot = path.resolve(here, "../../../design");
const outDir = path.resolve(here, "../src/generated");
const outFile = path.join(outDir, "design-docs.json");

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full, base)));
    } else if (entry.name.endsWith(".md")) {
      const relative = path.relative(base, full);
      const [section] = relative.split(path.sep);
      const raw = await readFile(full, "utf8");
      const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(entry.name, ".md");
      files.push({
        id: relative.replace(/\\/g, "/"),
        section: path.dirname(relative) === "." ? "root" : section,
        title,
        body: raw,
      });
    }
  }
  return files;
}

const docs = (await walk(designRoot)).sort((a, b) => a.id.localeCompare(b.id));
await mkdir(outDir, { recursive: true });
await writeFile(outFile, `${JSON.stringify(docs, null, 2)}\n`, "utf8");
console.log(`design-docs.json: ${docs.length} documents`);

const { version } = JSON.parse(
  await readFile(path.resolve(here, "../../../packages/ui/package.json"), "utf8"),
);
const { commit } = JSON.parse(
  await readFile(path.resolve(here, "../../../tooling/upstream/upstream.lock.json"), "utf8"),
);
await writeFile(
  path.join(outDir, "meta.json"),
  `${JSON.stringify({ version, upstream: commit }, null, 2)}\n`,
  "utf8",
);
console.log(`meta.json: ${version} / ${commit.slice(0, 7)}`);
