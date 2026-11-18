import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const UPSTREAM_REPO = "botiverse/raft-design";
export const ROOT = join(import.meta.dir, "../../..");
export const UI_DIR = join(ROOT, "packages/ui");
export const SPEC_DIR = join(UI_DIR, "src");
export const DESIGN_DIR = join(ROOT, "design");
export const TOOLING_DIR = join(ROOT, "tooling/upstream");
export const LOCK_PATH = join(TOOLING_DIR, "upstream.lock.json");
export const MANIFEST_PATH = join(TOOLING_DIR, "component-manifest.json");
export const WORK_DIR = join(TOOLING_DIR, ".work");

export interface UpstreamLock {
  repository: string;
  ref: string;
  commit: string;
  syncedAt: string;
  files: Record<string, string>;
}

export interface ComponentEntry {
  status: "ported" | "planned" | "not-applicable";
  upstreamPath: string;
  localPath?: string;
  notes?: string;
}

export interface ComponentManifest {
  repository: string;
  commit: string;
  generatedAt: string;
  components: Record<string, ComponentEntry>;
}

export function sha256(data: string | Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

export function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

export async function writeJson(path: string, value: unknown): Promise<void> {
  await Bun.write(path, `${JSON.stringify(value, null, 2)}\n`);
}

export function walk(dir: string, predicate: (path: string) => boolean = () => true): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(absolute, predicate));
    } else if (entry.isFile() && predicate(absolute)) {
      out.push(absolute);
    }
  }
  return out;
}

export function isDirectory(path: string): boolean {
  return existsSync(path) && statSync(path).isDirectory();
}

export function rel(path: string): string {
  return relative(ROOT, path).split("\\").join("/");
}

export function upstreamHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "webees-raft-design-vue-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function resolveCommit(ref: string): Promise<string> {
  const response = await fetch(
    `https://api.github.com/repos/${UPSTREAM_REPO}/commits/${encodeURIComponent(ref)}`,
    { headers: upstreamHeaders() },
  );
  if (!response.ok) {
    throw new Error(
      `Cannot resolve upstream ${ref}: HTTP ${response.status} ${await response.text()}`,
    );
  }
  const data = (await response.json()) as { sha: string };
  return data.sha;
}

export function parseArgs(argv: string[]): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg?.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      index += 1;
    } else {
      args[key] = true;
    }
  }
  return args;
}
