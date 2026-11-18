import { existsSync } from "node:fs";
import {
  LOCK_PATH,
  UPSTREAM_REPO,
  parseArgs,
  readJson,
  resolveCommit,
  upstreamHeaders,
  type UpstreamLock,
} from "./shared";

const args = parseArgs(process.argv.slice(2));
const json = args.json === true;
const lock = existsSync(LOCK_PATH)
  ? readJson<UpstreamLock>(LOCK_PATH)
  : undefined;
const latest = await resolveCommit("main");

if (!lock) {
  const message = "No upstream.lock.json found. Run `bun run sync:upstream`.";
  if (json) console.log(JSON.stringify({ status: "missing-lock", message }));
  else console.error(message);
  process.exit(1);
}

if (lock.commit === latest) {
  const message = `Up to date with ${UPSTREAM_REPO}@${latest.slice(0, 12)}.`;
  if (json) console.log(JSON.stringify({ status: "current", commit: latest, message }));
  else console.log(message);
  process.exit(0);
}

const compare = await fetch(
  `https://api.github.com/repos/${UPSTREAM_REPO}/compare/${lock.commit}...${latest}`,
  { headers: upstreamHeaders() },
);
if (!compare.ok) {
  throw new Error(`Compare failed: HTTP ${compare.status} ${await compare.text()}`);
}
const data = (await compare.json()) as {
  ahead_by: number;
  commits: { sha: string; commit: { message: string } }[];
  files?: { filename: string; status: string; additions: number; deletions: number }[];
};
const watched = (data.files ?? []).filter((file) =>
  /(^design\/|^packages\/ui\/src\/(tokens|themes)\.json$|^packages\/ui\/src\/styles\.css$|^packages\/ui\/src\/components\/|^packages\/ui\/src\/fonts)/.test(
    file.filename,
  ),
);
const addedComponents = [
  ...new Set(
    watched
      .filter(
        (file) =>
          file.status === "added" &&
          file.filename.startsWith("packages/ui/src/components/"),
      )
      .map((file) => file.filename.split("/")[4])
      .filter((name): name is string => Boolean(name)),
  ),
];

const report = {
  status: "behind",
  repository: UPSTREAM_REPO,
  pinned: lock.commit,
  latest,
  aheadBy: data.ahead_by,
  commits: data.commits.slice(-10).map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message.split("\n")[0],
  })),
  changedFiles: watched,
  addedComponents,
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(
    [
      `${UPSTREAM_REPO} has ${data.ahead_by} new commit(s).`,
      `pinned: ${lock.commit.slice(0, 12)}`,
      `latest: ${latest.slice(0, 12)}`,
      "",
      "Watched changes:",
      ...watched.map((file) => `- ${file.status} ${file.filename}`),
      ...(addedComponents.length
        ? ["", `New components: ${addedComponents.join(", ")}`]
        : []),
      "",
      "Run `bun run sync:upstream` to update.",
    ].join("\n"),
  );
}
process.exit(1);
