/**
 * Copies the files referenced by `url()` in the built stylesheet next to it.
 *
 * Tailwind's CLI inlines the `@fontsource` and `steps.css` rules but not their
 * assets, so a consumer importing `@webees/raft-design-vue/styles.css` would
 * request fonts and artwork the package never ships.
 */
import { copyFile, mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, "../dist");
const searchRoots = [
  path.resolve(here, "../node_modules/@fontsource/space-grotesk/files"),
  path.resolve(here, "../node_modules/@fontsource/space-mono/files"),
  path.resolve(here, "../src/components/steps/ottie-assets"),
];

const css = await readFile(path.join(dist, "styles.css"), "utf8");
const urls = [
  ...new Set([...css.matchAll(/url\(\s*(['"]?)\.\/([^'")]+)\1\s*\)/g)].map((m) => m[2])),
];

const files = new Map();
for (const root of searchRoots) {
  for (const name of await readdir(root).catch(() => [])) {
    files.set(name, path.join(root, name));
  }
}

const copied = [];
for (const url of urls) {
  const target = path.join(dist, url);
  await mkdir(path.dirname(target), { recursive: true });
  const source = files.get(path.basename(url));
  if (!source) {
    throw new Error(`No source found for styles.css asset: ${url}`);
  }
  await copyFile(source, target);
  copied.push(url);
}

console.log(`copied ${copied.length} stylesheet asset(s) -> dist`);
