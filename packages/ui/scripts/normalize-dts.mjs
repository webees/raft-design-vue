import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const REPLACEMENTS = [
  ['import("vue").GlobalComponents', "Record<string, any>"],
  ['import("vue").GlobalDirectives', "Record<string, any>"],
];

async function collectDeclarations(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collectDeclarations(path);
      return entry.name.endsWith(".d.ts") ? [path] : [];
    }),
  );
  return files.flat();
}

let changed = 0;

for (const file of await collectDeclarations(DIST)) {
  const source = await readFile(file, "utf8");
  let output = source;

  for (const [from, to] of REPLACEMENTS) {
    output = output.replaceAll(from, to);
  }

  if (output !== source) {
    await writeFile(file, output);
    changed += 1;
  }
}

console.log(`normalized ${changed} declaration file(s)`);
