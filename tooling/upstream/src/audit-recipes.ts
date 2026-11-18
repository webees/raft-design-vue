/**
 * Recipe drift audit.
 *
 * Compares every quoted string in upstream `*.recipe.ts` files with the local
 * `*.recipe.ts` / `*.variants.ts` counterpart. Recipes are ordered arrays of
 * class strings, so a multiset diff finds missing/extra classes while staying
 * immune to formatting and ordering changes.
 *
 * Usage: bun run tooling/upstream/src/audit-recipes.ts [--json]
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { LOCK_PATH, ROOT, SPEC_DIR, WORK_DIR, readJson, walk, type UpstreamLock } from "./shared";

const upstreamRoot = join(
  WORK_DIR,
  `raft-design-${readJson<UpstreamLock>(LOCK_PATH).commit}/packages/ui/src/components`,
);
const localRoot = join(SPEC_DIR, "components");
const json = process.argv.includes("--json");

const strings = (source: string) => {
  const out: string[] = [];
  // Comments contain prose that looks like class tokens ("head fits its
  // column"); strip them before harvesting strings.
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  for (const match of clean.matchAll(/"([^"\\\n]*)"/g)) {
    const raw = match[1]!.trim();
    // Object keys are variant names, not classes.
    if (/^\s*:/.test(clean.slice(match.index + match[0].length))) continue;
    if (!raw || raw.startsWith("../") || raw.startsWith("./")) continue;
    // Compare token multisets so grouping several utilities into one string
    // does not count as drift.
    out.push(...raw.split(/\s+/).map(normalize).filter(Boolean));
  }
  return out;
};

/** Collapse Tailwind shorthands so equivalent class strings compare equal. */
const normalize = (value: string) =>
  value
    .replace(/data-(?!\[)([a-z0-9-]+):/g, "data-[$1]:")
    .replace(
      /data-\[state=([a-z-]+)\]:/g,
      (_m, state: string) => `data-[${state === "on" ? "pressed" : state}]:`,
    )
    .replace(
      /data-state=([a-z-]+)/g,
      (_m, state: string) => `data-${state === "on" ? "pressed" : state}`,
    )
    .replace(/(^|:)disabled:/g, "$1data-[disabled]:")
    .replace(/group-data-(?!\[)([a-z0-9-]+)\//g, "group-data-[$1]/")
    .replace(/var\[var\((--[a-z0-9-]+)\)\]/g, "var($1)")
    .replace(/\[var\((--[a-z0-9-]+)\)\]/g, "($1)")
    .replace(/\*\*:data-\[slot=([a-z0-9-]+)\]:/g, "[&_[data-slot=$1]]:")
    .replace(/\*:data-\[slot=([a-z0-9-]+)\]:/g, "[&>*[data-slot=$1]]:")
    .replace(/\*\*:data-\[slot=['"]([a-z0-9-]+)['"]\]:/g, "[&_[data-slot=$1]]:")
    .replace(/\*:data-\[slot=['"]([a-z0-9-]+)['"]\]:/g, "[&>*[data-slot=$1]]:")
    .replace(/\*\*:data-\[([a-z0-9-]+)=([a-z0-9-]+)\]:/g, "[&_[data-$1=$2]]:")
    .replace(/\[data-slot=['"]([a-z0-9-]+)['"]\]/g, "[data-slot=$1]")
    .replace(/\[class\*=['"]([^'"]+)['"]\]/g, "[class*=$1]")
    .replace(/(^|:)-(ml|mr|mt|mb|mx|my)-\[([^\]]+)\]$/, "$1$2-[-$3]");

const multiset = (values: string[]) => {
  const map = new Map<string, number>();
  for (const value of values) map.set(value, (map.get(value) ?? 0) + 1);
  return map;
};

const diff = (upstream: string[], local: string[]) => {
  const counts = multiset(local);
  const missing: string[] = [];
  for (const value of upstream) {
    const left = counts.get(value) ?? 0;
    if (left > 0) counts.set(value, left - 1);
    else missing.push(value);
  }
  const extra = [...counts.entries()].flatMap(([value, count]) => Array<string>(count).fill(value));
  return { missing: [...new Set(missing)], extra: [...new Set(extra)] };
};

const recipeFiles = (dir: string) =>
  walk(
    dir,
    (file) => /\.(recipes?|variants)\.ts$/.test(file) && !basename(file).includes(".test."),
  );

const tvBlocks = (source: string) => {
  const blocks: string[] = [];
  let index = source.indexOf("tv({");
  while (index !== -1) {
    let depth = 0;
    let cursor = index + 3;
    for (; cursor < source.length; cursor++) {
      if (source[cursor] === "{") depth++;
      else if (source[cursor] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    blocks.push(source.slice(index, cursor + 1));
    index = source.indexOf("tv({", cursor);
  }
  return blocks;
};

const inlineRecipeStrings = (dir: string) =>
  walk(dir, (file) => file.endsWith(".tsx"))
    .flatMap((file) => tvBlocks(readFileSync(file, "utf8")))
    .flatMap((block) => strings(block));

interface Report {
  component: string;
  upstream: string;
  local: string;
  missing: string[];
  extra: string[];
}

const reports: Report[] = [];

const components = [
  ...new Set(
    walk(
      upstreamRoot,
      (file) => /(\.recipe\.ts|\.tsx)$/.test(file) && !file.includes(".test."),
    ).map((file) => file.slice(upstreamRoot.length + 1).split("/")[0]!),
  ),
]
  .filter((component) => {
    const dir = join(upstreamRoot, component);
    return recipeFiles(dir).length > 0 || inlineRecipeStrings(dir).length > 0;
  })
  .sort();

for (const component of components) {
  const localDir = join(localRoot, component);
  if (!existsSync(localDir)) continue;
  const upstreamFiles = recipeFiles(join(upstreamRoot, component));
  const localFiles = recipeFiles(localDir);
  if (!localFiles.length) continue;

  const upstreamStrings = [
    ...upstreamFiles.flatMap((file) => strings(readFileSync(file, "utf8"))),
    ...inlineRecipeStrings(join(upstreamRoot, component)),
  ];
  const localStrings = localFiles.flatMap((file) => strings(readFileSync(file, "utf8")));
  // Classes may also live in SFC templates; treat a token as present when the
  // component source mentions it anywhere.
  const localCorpus = normalize(
    walk(localDir, (file) => /\.(ts|vue)$/.test(file) && !file.includes(".test."))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n"),
  );
  const raw = diff(upstreamStrings, localStrings);
  const missing = raw.missing.filter((token) => !localCorpus.includes(token));
  const extra = raw.extra;
  if (!missing.length && !extra.length) continue;
  reports.push({
    component,
    upstream: upstreamFiles.map((file) => file.slice(upstreamRoot.length + 1)).join(", "),
    local: localFiles.map((file) => file.slice(localRoot.length + 1)).join(", "),
    missing,
    extra,
  });
}

if (json) {
  console.log(JSON.stringify(reports, null, 2));
} else {
  for (const report of reports) {
    console.log(`\n## ${report.component}  (${report.upstream} → ${report.local})`);
    if (report.missing.length)
      console.log(`  missing (${report.missing.length}): ${report.missing.join(" · ")}`);
    if (report.extra.length)
      console.log(`  extra   (${report.extra.length}): ${report.extra.join(" · ")}`);
  }
  console.log(`\n${reports.length} of ${components.length} components differ`);
}

void ROOT;
