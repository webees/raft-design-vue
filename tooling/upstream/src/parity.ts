import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  MANIFEST_PATH,
  ROOT,
  parseArgs,
  readJson,
  writeJson,
  type ComponentEntry,
  type ComponentManifest,
} from "./shared";

const args = parseArgs(process.argv.slice(2));
const manifest = readJson<ComponentManifest>(MANIFEST_PATH);
const localComponents = join(ROOT, "packages/ui/src/components");
const entries = Object.entries(manifest.components);
const missingFromManifest: string[] = [];
const statusMismatch: string[] = [];
const ported: string[] = [];
const planned: string[] = [];
const notApplicable: string[] = [];

for (const [name, entry] of entries) {
  const hasLocal = existsSync(join(localComponents, name, "index.ts"));
  if (entry.status === "ported" && !hasLocal) {
    statusMismatch.push(`${name}: manifest says ported but ${entry.localPath ?? "local path"} is missing`);
  }
  if (entry.status === "planned" && hasLocal && args.write !== true) {
    statusMismatch.push(`${name}: component exists locally but manifest still says planned`);
  }
  if (entry.status === "ported") ported.push(name);
  else if (entry.status === "not-applicable") notApplicable.push(name);
  else planned.push(name);
}

if (existsSync(localComponents)) {
  const { readdirSync } = await import("node:fs");
  for (const dirent of readdirSync(localComponents, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    if (!(dirent.name in manifest.components)) missingFromManifest.push(dirent.name);
  }
}

if (args.write === true) {
  const next: ComponentManifest = {
    ...manifest,
    generatedAt: new Date().toISOString(),
    components: Object.fromEntries(
      entries
        .map(([name, entry]): [string, ComponentEntry] => {
          const hasLocal = existsSync(join(localComponents, name, "index.ts"));
          if (entry.status === "not-applicable") return [name, entry];
          return [
            name,
            {
              ...entry,
              status: hasLocal ? "ported" : "planned",
              ...(hasLocal
                ? { localPath: `packages/ui/src/components/${name}` }
                : {}),
            },
          ];
        })
        .concat(
          missingFromManifest.map((name) => [
            name,
            {
              status: "ported",
              upstreamPath: `packages/ui/src/components/${name}`,
              localPath: `packages/ui/src/components/${name}`,
            } satisfies ComponentEntry,
          ]),
        ),
    ),
  };
  await writeJson(MANIFEST_PATH, next);
}

const coverage = entries.length
  ? Math.round((ported.length / (entries.length - notApplicable.length)) * 100)
  : 0;
const result = {
  repository: manifest.repository,
  commit: manifest.commit,
  total: entries.length,
  ported: ported.length,
  planned: planned.length,
  notApplicable: notApplicable.length,
  coverage,
  missingFromManifest,
  statusMismatch,
};

if (args.json === true) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(
    [
      `Component parity: ${ported.length}/${entries.length - notApplicable.length} (${coverage}%)`,
      `planned: ${planned.length}, not applicable: ${notApplicable.length}`,
      missingFromManifest.length
        ? `untracked local components: ${missingFromManifest.join(", ")}`
        : "untracked local components: none",
      statusMismatch.length ? `status issues:\n- ${statusMismatch.join("\n- ")}` : "status issues: none",
    ].join("\n"),
  );
}

if (missingFromManifest.length || statusMismatch.length) process.exit(1);
