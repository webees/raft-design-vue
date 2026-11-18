/**
 * Per-file inventory diff between the upstream React sources and the local Vue
 * port. Complements `audit.ts`: that script answers "is a symbol covered?";
 * this one answers "which upstream file has no close local counterpart, and how
 * far apart are the matched files?".
 *
 * Usage:
 *   bun run src/file-diff.ts            # summary table for every component
 *   bun run src/file-diff.ts button     # detail for one component
 *   bun run src/file-diff.ts --json     # machine-readable rows
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import {
  LOCK_PATH,
  SPEC_DIR,
  WORK_DIR,
  parseArgs,
  readJson,
  walk,
  type UpstreamLock,
} from "./shared";

const args = parseArgs(process.argv.slice(2));
const upstreamComponents = join(
  WORK_DIR,
  `raft-design-${readJson<UpstreamLock>(LOCK_PATH).commit}/packages/ui/src/components`,
);
const localComponents = join(SPEC_DIR, "components");
const only = typeof args.component === "string" ? args.component : undefined;
const json = args.json === true;
const limit = typeof args.limit === "string" ? Number(args.limit) : 15;

const read = (file: string) => readFileSync(file, "utf8");
const isTest = (file: string) => /\.(test|spec|browser\.test)\./.test(file);
const isDoc = (file: string) => /\.(md|mdx)$/.test(file);
const isFixture = (file: string) => /(?:test-scenes|test-fixture|\.parity\.|provenance\.json)/.test(file);
const isGeneratedOrRecipe = (file: string) => /\.(recipes?|variants)\.ts$/.test(file);
const accepted = (file: string) =>
  !isTest(file) && !isDoc(file) && !isFixture(file) && basename(file) !== "index.ts";

const lines = (source: string) => source.split("\n").length;
const tokens = (stem: string) =>
  stem
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((token) => !["use", "index", "tsx", "ts", "vue", "js", "jsx"].includes(token));

interface Pair {
  upstream: string;
  local: string | null;
  upstreamLines: number;
  localLines: number;
}

interface ComponentRow {
  component: string;
  pairs: Pair[];
  localOnly: string[];
  /** Matched files whose local/upstream line ratio is below the threshold. */
  thin: Pair[];
}

const components = walk(upstreamComponents, accepted)
  .map((file) => relative(upstreamComponents, file).split("/")[0]!)
  .filter((name, index, all) => all.indexOf(name) === index)
  .sort()
  .filter((name) => !only || name === only);

const rows: ComponentRow[] = [];

for (const component of components) {
  const upstreamDir = join(upstreamComponents, component);
  const localDir = join(localComponents, component);
  if (!existsSync(localDir)) continue;

  const upstreamFiles = walk(upstreamDir, accepted);
  const localFiles = walk(
    localDir,
    (file) => !isTest(file) && !isGeneratedOrRecipe(file) && basename(file) !== "index.ts",
  );
  const localTokens = localFiles.map((file) => ({
    file,
    tokens: tokens(basename(file).replace(/\.[^.]+$/, "")),
  }));
  // Assign globally: highest-overlap pairs first, so a merged file such as
  // MessageItem.vue is not stolen by an earlier alphabetical sibling.
  const scoredPairs = upstreamFiles.flatMap((file) => {
    const stem = basename(file).replace(/\.[^.]+$/, "");
    const upstreamTokens = tokens(stem.replace(/\.recipe$/, "")).map((token) =>
      token === "recipe" ? "variants" : token,
    );
    return localTokens.map((entry) => {
      const shared = entry.tokens.filter((token) => upstreamTokens.includes(token)).length;
      return {
        upstream: file,
        local: entry.file,
        shared,
        score: shared / Math.max(upstreamTokens.length, entry.tokens.length, 1),
      };
    });
  })
    .filter((pair) => pair.score === 1 || (pair.shared >= 2 && pair.score >= 0.6))
    .sort((a, b) => b.score - a.score || b.shared - a.shared || a.upstream.localeCompare(b.upstream));

  const used = new Set<string>();
  const assigned = new Map<string, string>();
  for (const pair of scoredPairs) {
    if (used.has(pair.local) || assigned.has(pair.upstream)) continue;
    used.add(pair.local);
    assigned.set(pair.upstream, pair.local);
  }

  const pairs: Pair[] = [];
  for (const file of upstreamFiles) {
    const match = assigned.get(file) ?? null;
    if (match) used.add(match);
    pairs.push({
      upstream: relative(upstreamDir, file),
      local: match ? relative(localDir, match) : null,
      upstreamLines: lines(read(file)),
      localLines: match ? lines(read(match)) : 0,
    });
  }

  const thin = pairs.filter(
    (pair) => pair.local && pair.localLines / Math.max(pair.upstreamLines, 1) < 0.6,
  );

  rows.push({
    component,
    pairs,
    localOnly: localFiles.filter((file) => !used.has(file)).map((file) => relative(localDir, file)),
    thin,
  });
}

if (json) {
  console.log(JSON.stringify(rows, null, 2));
} else if (only) {
  for (const row of rows) {
    console.log(`## ${row.component}`);
    for (const pair of row.pairs) {
      const ratio = pair.local ? (pair.localLines / Math.max(pair.upstreamLines, 1)).toFixed(2) : "  - ";
      console.log(
        `  ${ratio}  ${String(pair.upstreamLines).padStart(5)}  ${pair.upstream}  ->  ${pair.local ?? "MISSING"}`,
      );
    }
    if (row.localOnly.length) console.log(`  local-only: ${row.localOnly.join(", ")}`);
  }
} else {
  const scored = rows
    .map((row) => ({
      ...row,
      missing: row.pairs.filter((pair) => !pair.local).length,
      thinLines: row.thin.reduce(
        (sum, pair) => sum + (pair.upstreamLines - pair.localLines),
        0,
      ),
    }))
    .sort((a, b) => b.missing - a.missing || b.thinLines - a.thinLines);

  for (const row of scored.slice(0, limit)) {
    const missing = row.pairs.filter((pair) => !pair.local);
    console.log(
      `\n## ${row.component}  missing=${missing.length} thin=${row.thin.length} gap=${row.thinLines}L`,
    );
    if (missing.length) {
      console.log(`  missing: ${missing.map((pair) => pair.upstream).join(", ")}`);
    }
    for (const pair of row.thin.slice(0, 8)) {
      console.log(
        `  thin: ${pair.upstreamLines}L -> ${pair.localLines}L (${pair.local})`,
      );
    }
  }
}
