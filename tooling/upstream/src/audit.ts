import { existsSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

import {
  SPEC_DIR,
  WORK_DIR,
  LOCK_PATH,
  ROOT,
  readJson,
  rel,
  walk,
  type UpstreamLock,
} from "./shared";

const upstreamRoot = join(
  WORK_DIR,
  `raft-design-${readJson<UpstreamLock>(LOCK_PATH).commit}/packages/ui/src`,
);
const upstreamComponents = join(upstreamRoot, "components");

if (!existsSync(upstreamRoot)) {
  console.error(
    `check:audit failed: ${relative(ROOT, upstreamRoot)} is missing; run \`bun run fetch:upstream\`.`,
  );
  process.exit(1);
}

const isTest = (file: string) => /\.(?:test|spec)[^/]*\.(?:[cm]?[jt]sx?)$/.test(file);
const isDoc = (file: string) => file.endsWith(".md") || file.endsWith(".css");
const isFixture = (file: string) =>
  /^(?:test-scenes|test-fixture)\./.test(basename(file)) ||
  /\.(?:test-fixture|test-scenes|parity\.[^.]+)\./.test(basename(file)) ||
  file.endsWith("provenance.json");

/**
 * React-only plumbing whose behavior lives inline in the Vue component instead
 * of a one-to-one file. Keep this list explicit: a new upstream file must be
 * either ported or added here with a reason, never silently ignored.
 */
const STRUCTURAL_EQUIVALENTS: Record<string, string[]> = {
  // React ref-object bridge; the Vue port uses `use-scrollbars` directly.
  "scroll-area": ["gutters-binding.ts"],
  // Every entry below is implemented inline in VirtualList.vue:
  // columns (`ItemColumns`), the exposed imperative API (`VirtualListContext`),
  // React closure/memo helpers, and the shared ResizeObserver.
  "virtual-list": [
    "ItemColumns.tsx",
    "VirtualListContext.ts",
    "hooks/use-memo-with-previous.ts",
    "hooks/use-layout-effect-with-previous.ts",
    "hooks/use-event-callback.ts",
    "hooks/use-latest-ref.ts",
    "hooks/use-non-passive-wheel.ts",
    "hooks/use-keyboard-scroll.ts",
    "hooks/use-non-virtual-content-resize.ts",
    "resize-observer/ResizeObserverWrapper.tsx",
    "resize-observer/resize-observer-delegate.ts",
  ],
};
const localCorpus = walk(join(SPEC_DIR), (file) => /\.(vue|ts)$/.test(file) && !isTest(file))
  .map(read)
  .join("\n");

function read(path: string) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function exportNames(source: string) {
  const names = new Set<string>();
  for (const match of source.matchAll(/export\s+(?:type\s+)?\{([\s\S]*?)\}(?:\s+from)?/g)) {
    for (const part of match[1]!.split(",")) {
      const name = part
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .pop();
      if (name) names.add(name);
    }
  }
  for (const match of source.matchAll(
    /export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z0-9_$]+)/g,
  )) {
    names.add(match[1]!);
  }
  for (const match of source.matchAll(/export\s+(?:type|interface)\s+([A-Za-z0-9_$]+)/g)) {
    names.add(match[1]!);
  }
  return names;
}

/**
 * Collect `data-slot` values, including template-literal slots such as
 * ``data-slot={`thread-panel-${name}`}``. Literal prefixes are returned with a
 * `*` suffix so the comparison can treat them as wildcards.
 */
function slots(source: string) {
  const out = new Set<string>();
  // Handles `data-slot="x"`, `"data-slot": "x"`, `:data-slot="attrs['data-slot'] ?? 'x'"`
  // and template literals such as ``data-slot={`thread-panel-${part}`}``.
  for (const match of source.matchAll(
    /["']?data-slot["']?\s*[=:]\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}|`([^`]*)`)/g,
  )) {
    const expression = match[1] ?? match[2] ?? match[3] ?? match[4]!;
    for (const literal of expression.matchAll(/["'`]([\w-]+)["'`]/g)) out.add(literal[1]!);
    const template = expression.match(/`([\w-]+)\$\{/);
    if (template) out.add(`${template[1]}*`);
  }
  return out;
}

const CLASS_LIKE = /^(?:[a-z0-9[\]@:/_.%-]+:)*!?[a-z@[]/i;

/** Tailwind accepts both `data-x:` and `data-[x]:`; compare one spelling. */
const normalizeClass = (token: string) =>
  token
    .replace(/data-\[([a-z0-9-]+)\]:/g, "data-$1:")
    .replace(/group-data-\[([a-z0-9-]+)\]\//g, "group-data-$1/");

function classTokens(source: string) {
  const tokens = new Set<string>();
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  for (const match of clean.matchAll(/"([^"\\\n]+)"/g)) {
    const value = match[1]!;
    if (!/[-[:\s]/.test(value)) continue;
    for (const token of value.split(/\s+/)) {
      if (!CLASS_LIKE.test(token)) continue;
      if (/^(?:import|export|from|react|type|default|true|false)$/.test(token)) continue;
      if (token.endsWith(":")) continue;
      tokens.add(normalizeClass(token));
    }
  }
  return tokens;
}

function localSources(dir: string) {
  return walk(
    dir,
    (file) => /\.(vue|ts)$/.test(file) && !isTest(file) && !file.endsWith(".variants.ts"),
  )
    .map(read)
    .join("\n");
}

const pascal = (stem: string) =>
  stem
    .split(/[-_.]/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join("");

/**
 * A React file can hold several components (`app-rail.tsx` exports the whole
 * rail family), so a filename alone is not a reliable counterpart. A file
 * counts as covered when any exported symbol exists locally, either as a
 * `.vue` filename or as an export in the component's TypeScript sources.
 */
function missingLocalFiles(upstreamDir: string, localDir: string) {
  const localFiles = walk(localDir, (file) => !isTest(file));
  const localStems = new Set(localFiles.map((file) => basename(file).replace(/\.[^.]+$/, "")));
  const localExports = exportNames(localSources(localDir));
  const missing: string[] = [];

  for (const file of walk(
    upstreamDir,
    (entry) => !isTest(entry) && !isDoc(entry) && !isFixture(entry),
  )) {
    const relativePath = relative(upstreamDir, file).split("\\").join("/");
    const stem = basename(file).replace(/\.[^.]+$/, "");

    if (localFiles.some((local) => relative(localDir, local) === relativePath)) continue;
    if (localStems.has(stem)) continue;
    if (stem.endsWith(".recipe") && localFiles.some((local) => local.endsWith(".variants.ts")))
      continue;
    if (localStems.has(`${stem}.variants`)) continue;

    const symbols = [...exportNames(read(file))];
    const values = symbols.filter((symbol) => !/Props$/.test(symbol));
    const covered =
      values.length > 0
        ? values.some((symbol) => localExports.has(symbol) || localStems.has(symbol))
        : symbols.length > 0 &&
          symbols.every((symbol) => localExports.has(symbol) || localStems.has(symbol));
    if (!covered && !localStems.has(pascal(stem))) missing.push(relativePath);
  }

  return missing;
}

const LOCAL_ATTRIBUTE_PROPS = new Set(["children", "className", "style"]);

function declaredPropTypes(source: string) {
  const types = new Map<string, string[]>();
  for (const match of source.matchAll(/export\s+interface\s+([A-Za-z0-9_$]+Props)\b[^{]*\{/g)) {
    const start = match.index! + match[0].length;
    let depth = 1;
    let end = start;
    while (end < source.length && depth > 0) {
      if (source[end] === "{") depth += 1;
      else if (source[end] === "}") depth -= 1;
      end += 1;
    }
    const body = source.slice(start, end - 1);
    const keys = [...body.matchAll(/^\s{0,4}([A-Za-z_$][\w$]*)\??\s*:/gm)].map((key) => key[1]!);
    if (keys.length) types.set(match[1]!, keys);
  }
  return types;
}

/**
 * Upstream callback props (`onReorder`) surface as Vue emits. Accept the
 * `onX` → `x` emit spelling before reporting a prop as missing.
 */
function hasLocalProp(key: string, localSource: string) {
  if (new RegExp(`\\b${key}\\b`).test(localSource)) return true;
  if (!key.startsWith("on") || key.length < 3) return false;
  const event = key[2]!.toLowerCase() + key.slice(3);
  return new RegExp(`(?:emit\\(\\s*["'\`]${event}|\\b${event}\\s*:)`).test(localSource);
}

function localVariantSources(dir: string) {
  return walk(dir, (file) => /\.(variants|recipes?)\.ts$/.test(file))
    .map(read)
    .join("\n");
}

interface Row {
  component: string;
  upstreamFiles: string[];
  localFiles: string[];
  missingFiles: string[];
  missingExports: string[];
  missingSlots: string[];
  missingClasses: string[];
  missingProps: string[];
}

const components = walk(upstreamComponents, (file) => !isTest(file) && !isDoc(file))
  .map(
    (file) =>
      rel(file)
        .slice(rel(upstreamComponents).length + 1)
        .split("/")[0]!,
  )
  .filter((name, index, all) => all.indexOf(name) === index)
  .sort();

const rows: Row[] = [];

for (const component of components) {
  const upstreamDir = join(upstreamComponents, component);
  const localDir = join(SPEC_DIR, "components", component);
  const upstreamFiles = walk(upstreamDir, (file) => !isTest(file) && !isDoc(file));
  const localFiles = walk(localDir, (file) => !isTest(file));
  const upstreamSource = upstreamFiles.map(read).join("\n");
  const localSource = localSources(localDir);
  const variantSource = localVariantSources(localDir);

  const upstreamIndex = read(join(upstreamDir, "index.ts"));
  const localIndex = read(join(localDir, "index.ts"));
  const localExports = exportNames(`${localIndex}\n${localSource}`);
  const missingExports = [...exportNames(upstreamIndex)].filter(
    (name) => !name.endsWith("Props") && !localExports.has(name),
  );

  // A template-literal slot on either side matches by prefix, so
  // `thread-panel-${part}` covers the upstream `thread-panel-original-message`.
  const localSlots = [...slots(localCorpus)];
  const localPrefixes = localSlots
    .filter((slot) => slot.endsWith("*"))
    .map((slot) => slot.slice(0, -1));
  const missingSlots = [...slots(upstreamSource)].filter((slot) => {
    if (localSlots.includes(slot)) return false;
    if (slot.endsWith("*")) {
      return !localSlots.some((local) => local.startsWith(slot.slice(0, -1)));
    }
    return !localPrefixes.some((prefix) => slot.startsWith(prefix));
  });

  const upstreamRecipes = upstreamFiles
    .filter((file) => /\.(recipes?|variants)\.ts$/.test(file))
    .map(read)
    .join("\n");
  const localTokens = new Set(classTokens(variantSource));
  const missingClasses = [...classTokens(upstreamRecipes)].filter(
    (token) => !localTokens.has(token),
  );

  const upstreamProps: string[] = [];
  const upstreamExports = exportNames(upstreamSource);
  for (const file of upstreamFiles) {
    for (const [typeName, keys] of declaredPropTypes(read(file))) {
      const owner = typeName.replace(/Props$/, "");
      if (!upstreamExports.has(owner) && !upstreamExports.has(typeName)) continue;
      for (const key of keys) {
        if (LOCAL_ATTRIBUTE_PROPS.has(key)) continue;
        if (!hasLocalProp(key, localSource)) upstreamProps.push(`${owner}.${key}`);
      }
    }
  }

  const missingFiles = missingLocalFiles(upstreamDir, localDir).filter(
    (file) => !STRUCTURAL_EQUIVALENTS[component]?.includes(file),
  );

  if (
    missingFiles.length ||
    missingExports.length ||
    missingSlots.length ||
    missingClasses.length ||
    upstreamProps.length
  ) {
    rows.push({
      component,
      upstreamFiles: upstreamFiles.map((file) => basename(file)),
      localFiles: localFiles.map((file) => basename(file)),
      missingFiles,
      missingExports,
      missingSlots,
      missingClasses,
      missingProps: upstreamProps,
    });
  }
}

const json = process.argv.includes("--json");
const check = process.argv.includes("--check");
if (json) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  for (const row of rows) {
    console.log(`\n## ${row.component}`);
    if (row.missingFiles.length) console.log(`  files:    ${row.missingFiles.join(", ")}`);
    if (row.missingExports.length) console.log(`  exports:  ${row.missingExports.join(", ")}`);
    if (row.missingSlots.length) console.log(`  slots:    ${row.missingSlots.join(", ")}`);
    if (row.missingProps.length) console.log(`  props:    ${row.missingProps.join(", ")}`);
    if (row.missingClasses.length)
      console.log(
        `  classes (${row.missingClasses.length}): ${row.missingClasses.slice(0, 40).join(" ")}`,
      );
  }
  console.log(`\n${rows.length} of ${components.length} components have findings.`);
}

if (check && rows.length > 0) {
  process.exitCode = 1;
}
