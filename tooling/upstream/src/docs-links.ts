import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { LOCK_PATH, ROOT, UPSTREAM_REPO, parseArgs, readJson, type UpstreamLock } from "./shared";

const DOCS = join(ROOT, "design");
const COMPONENTS = join(DOCS, "components");
const EXTERNAL = /^(?:https?:|mailto:|tel:|#|data:)/;
const HEADING = /^#{1,6}\s+(.+)$/gm;
const SKIP = /(?:^|\/)(?:node_modules|dist|coverage|\.work|\.git|\.rsbuild)\//;

function markdownFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) markdownFiles(path, found);
    else if (path.endsWith(".md")) found.push(path);
  }
  return found;
}

function repoMarkdown(dir = ROOT, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (SKIP.test(`${path}/`)) continue;
    if (statSync(path).isDirectory()) repoMarkdown(path, found);
    else if (path.endsWith(".md")) found.push(path);
  }
  return found;
}

function brokenLinks(entries: Array<{ file: string; body: string }>, anchors: boolean): string[] {
  const broken: string[] = [];
  for (const { file, body } of entries) {
    const scan = body
      .replace(/^(`{3,}|~{3,})[\s\S]*?^\1/gm, (block) => block.replace(/[^\n]/g, " "))
      .replace(/`+[^`]*`+/g, (code) => code.replace(/[^\n]/g, " "));
    for (const [, target] of scan.matchAll(/!?\[[^\]]*\]\(([^)\s]+)/g)) {
      if (!target || (!target.startsWith("#") && EXTERNAL.test(target))) continue;
      const [path = "", ...rest] = target.split("#");
      const hash = rest.join("#");
      const local = path ? resolve(dirname(file), decodeURIComponent(path)) : file;
      const missing =
        (path && !existsSync(local)) ||
        (anchors &&
          hash &&
          local.endsWith(".md") &&
          !headings(local).has(decodeURIComponent(hash)));
      if (missing) broken.push(`${relative(ROOT, file)} -> ${target}`);
    }
  }
  return broken;
}

const headingCache = new Map<string, Set<string>>();

function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/ /g, "-");
}

function headings(file: string): Set<string> {
  const cached = headingCache.get(file);
  if (cached) return cached;
  const slugs = new Set<string>();
  const seen = new Map<string, number>();
  for (const match of readFileSync(file, "utf8").matchAll(HEADING)) {
    const text = match[1]!.replace(/[`*_~[\]]/g, "").replace(/\(([^)]*)\)/g, "$1");
    const base = headingSlug(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    slugs.add(count ? `${base}-${count}` : base);
  }
  headingCache.set(file, slugs);
  return slugs;
}

function mapSpecial(path: string): string | null {
  if (/icons\/src\/icons\.md$/.test(path)) return join(DOCS, "foundations/iconography.md");
  if (/apps\/doc\/src\/lib\/markdown\/markdown\.tsx$/.test(path))
    return join(ROOT, "apps/docs/src/pages/DesignDocs.vue");
  const mirrored = /(?:^|\/)((?:i18n|packages\/ui)\/(?:README|AGENTS|CHANGELOG)\.md)$/.exec(
    path,
  )?.[1];
  if (mirrored) {
    const commit = readJson<UpstreamLock>(LOCK_PATH).commit;
    return `https://github.com/${UPSTREAM_REPO}/blob/${commit}/${mirrored}`;
  }
  return null;
}

function resolveTarget(from: string, target: string): string | null {
  const [path = "", ...rest] = target.split("#");
  if (!path) return null;
  const hash = rest.join("#");
  const relativePath = resolve(dirname(from), decodeURIComponent(path));
  const special = existsSync(relativePath) ? null : mapSpecial(path);
  if (special?.startsWith("http")) return `${special}${hash ? `#${hash}` : ""}`;
  const local = special ?? (existsSync(relativePath) ? relativePath : findAnchored(path));
  if (!local) return null;
  const anchor = hash && (!local.endsWith(".md") || headings(local).has(decodeURIComponent(hash)));
  const next = `${relative(dirname(from), local).split("\\").join("/")}${anchor ? `#${hash}` : ""}`;
  return next === target ? null : next;
}

function findAnchored(decoded: string): string | null {
  const anchored = (prefix: string) => {
    const index = decoded.indexOf(`${prefix}/`);
    return index >= 0 ? join(ROOT, decoded.slice(index)) : null;
  };
  const direct = anchored("design") ?? anchored("packages");
  const local = direct && existsSync(direct) ? direct : join(COMPONENTS, basename(decoded));
  return existsSync(local) ? local : null;
}

function rewrite(source: string, from: string): string {
  let fenced = false;
  const rewriteLine = (line: string) =>
    line
      .replace(
        /\[OtherComponent\]\(\.\.\/other-component\/other-component\.md\)/g,
        "[OtherComponent](../../components/overview.md)",
      )
      .replace(/`+[^`\n]*`+|!?\[[^\]]*\]\(([^)\s]+)\)/g, (whole, target) => {
        if (target === undefined || EXTERNAL.test(target)) return whole;
        const next = resolveTarget(from, target);
        return next === null ? whole : whole.slice(0, whole.lastIndexOf("(") + 1) + next + ")";
      });
  return source
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return line;
      }
      return fenced ? line : rewriteLine(line);
    })
    .join("\n");
}

export function rewriteDesignLinks(options: { check?: boolean } = {}) {
  let changed = 0;
  let broken = 0;
  for (const file of markdownFiles(DOCS)) {
    const source = readFileSync(file, "utf8");
    const next = rewrite(source, file);
    if (next !== source) {
      changed += 1;
      if (!options.check) writeFileSync(file, next);
    }
    const entries = [{ file, body: next }];
    const findings = brokenLinks(entries, true);
    broken += findings.length;
    for (const finding of findings) console.log(finding);
  }
  const repoEntries = repoMarkdown()
    .filter((file) => !file.startsWith(`${DOCS}/`))
    .map((file) => ({ file, body: readFileSync(file, "utf8") }));
  const repoFindings = brokenLinks(repoEntries, false);
  broken += repoFindings.length;
  for (const finding of repoFindings) console.log(finding);
  return { changed, broken };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const check = args.check === true;
  const { changed, broken } = rewriteDesignLinks({ check });
  console.log(
    check
      ? `${changed} file(s) need rewritten links; ${broken} broken link(s).`
      : `${changed} file(s) rewritten; ${broken} broken link(s) remain.`,
  );
  if (broken > 0) process.exit(1);
}

if (process.argv[1]?.endsWith("docs-links.ts")) main();
