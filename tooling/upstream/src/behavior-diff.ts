/**
 * Behavior-marker diff. Line counts mislead because React JSX is denser and Vue
 * splits JSX into templates; instead compare the observable side-effect
 * vocabulary each component uses upstream vs. locally.
 *
 * Flags a component when upstream uses a category of browser behavior that the
 * local port never touches at all (global listeners, timers, keyboard keys,
 * pointer events, observers). Zero local usage of a category upstream uses is
 * the cheapest reliable signal of a missing behavior, not a style difference.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
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
const json = args.json === true;

const stripComments = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:\\])\/\/.*$/gm, "$1");
const read = (file: string) => readFileSync(file, "utf8");
const readCode = (file: string) => stripComments(read(file));
const isTest = (file: string) => /\.(?:test|spec|browser\.test)\./.test(file);
const isDoc = (file: string) => /\.(md|mdx|css)$/.test(file);
const isFixture = (file: string) => /(?:test-scenes|test-fixture|\.parity\.|provenance\.json)/.test(file);

const listeners = (source: string) =>
  new Set([
    ...[...source.matchAll(/addEventListener\(\s*["'`]([\w:-]+)["'`]/g)].map((m) => m[1]!),
    // Vue template listeners (`@wheel`, `@keydown.escape`, …).
    ...[...source.matchAll(/@([\w-]+)(?:\.[\w-]+)?\s*=/g)].map((m) => m[1]!),
  ]);
const keys = (source: string) =>
  new Set(
    [
      ...[...source.matchAll(/["'`](Arrow\w+|Enter|Escape|Tab|Home|End|PageUp|PageDown|Space|Backspace|Delete)["'`]/g)].map(
        (m) => m[1]!,
      ),
      // Vue key modifiers (`@keydown.enter`, `@keydown.up`).
      ...[...source.matchAll(/@keydown\.([\w-]+)/g)].map((m) => {
        const name = m[1]!.toLowerCase();
        return name === "up" ? "ArrowUp" : name === "down" ? "ArrowDown" : name === "left" ? "ArrowLeft" : name === "right" ? "ArrowRight" : name[0]!.toUpperCase() + name.slice(1);
      }),
    ],
  );
const count = (source: string, pattern: RegExp) => [...source.matchAll(pattern)].length;

const markers = (source: string) => ({
  listeners: listeners(source),
  keys: keys(source),
  timers: count(source, /\bset(?:Timeout|Interval)\s*\(/g),
  raf: count(source, /requestAnimationFrame\s*\(/g),
  observers: count(source, /new\s+(?:Resize|Mutation|Intersection)Observer\b/g),
  pointer: count(source, /\bon(?:Pointer|Touch|Mouse|Wheel)\w*\b|addEventListener\(\s*["'`](?:pointer|touch|mouse|wheel)/g),
  document: count(source, /\bdocument\./g),
  window: count(source, /\bwindow\./g),
});

interface Finding {
  component: string;
  category: string;
  upstream: string;
  local: string;
  upstreamFiles: string[];
}

const findings: Finding[] = [];
const rows: { component: string; findings: number }[] = [];

for (const component of walk(upstreamComponents, () => true)
  .map((file) => relative(upstreamComponents, file).split("/")[0]!)
  .filter((name, index, all) => all.indexOf(name) === index)
  .sort()) {
  const upstreamDir = join(upstreamComponents, component);
  const localDir = join(localComponents, component);
  if (!existsSync(localDir)) continue;

  const upstreamFiles = walk(upstreamDir, (file) => !isTest(file) && !isDoc(file) && !isFixture(file));
  const localFiles = walk(localDir, (file) => /\.(vue|ts)$/.test(file) && !isTest(file));
  const upstreamSource = upstreamFiles.map(readCode).join("\n");
  const localSource = closure(localFiles, join(SPEC_DIR, ".."));
  const up = markers(upstreamSource);
  const lo = markers(localSource);
  let n = 0;

  for (const key of up.listeners) {
    if (!lo.listeners.has(key)) {
      findings.push({
        component,
        category: "listener",
        upstream: key,
        local: "none",
        upstreamFiles: upstreamFiles
          .filter((file) => new RegExp(`["'\`]${key}["'\`]`).test(readCode(file)))
          .map((file) => basename(file)),
      });
      n++;
    }
  }
  for (const key of up.keys) {
    if (!lo.keys.has(key)) {
      findings.push({
        component,
        category: "key",
        upstream: key,
        local: "none",
        upstreamFiles: upstreamFiles
          .filter((file) => new RegExp(`["'\`]${key}["'\`]`).test(readCode(file)))
          .map((file) => basename(file)),
      });
      n++;
    }
  }
  for (const key of ["timers", "raf", "observers", "document", "window"] as const) {
    if (up[key] > 0 && lo[key] === 0) {
      findings.push({
        component,
        category: key,
        upstream: String(up[key]),
        local: "0",
        upstreamFiles: upstreamFiles.map((file) => basename(file)),
      });
      n++;
    }
  }

  rows.push({ component, findings: n });
}

/**
 * Follow relative imports so behavior that was factored into `src/lib/*` counts
 * for the component that owns it. Without this every shared helper looks like a
 * missing behavior and the report becomes noise.
 */
function closure(entries: string[], srcRoot: string, depth = 0): string {
  if (depth > 6) return "";
  const texts: string[] = [];
  const seen = new Set<string>();
  const queue = [...entries];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    if (!existsSync(file)) continue;
    const source = readCode(file);
    texts.push(source);
    for (const match of source.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
      const base = join(file, "..", match[1]!);
      for (const candidate of [
        base,
        `${base}.ts`,
        `${base}.vue`,
        `${base}/index.ts`,
        base.replace(/\.js$/, ".ts"),
      ]) {
        if (
          existsSync(candidate) &&
          statSync(candidate).isFile() &&
          candidate.startsWith(srcRoot) &&
          !candidate.includes("node_modules")
        ) {
          queue.push(candidate);
          break;
        }
      }
    }
  }
  return texts.join("\n");
}

if (json) {
  console.log(JSON.stringify({ rows, findings }, null, 2));
} else {
  for (const finding of findings) {
    console.log(
      `${finding.component}\t${finding.category}\t${finding.upstream}\tfiles=${finding.upstreamFiles.join(",")}`,
    );
  }
  const clean = rows.filter((row) => row.findings === 0).length;
  console.log(`\n${clean}/${rows.length} components have no missing behavior category.`);
}
