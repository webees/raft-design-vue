# Contributing

**English** | [简体中文](./docs/zh/contributing.md)

Thanks for helping build the Vue port of Raft.

## Setup

```bash
bun install
bun run dev       # docs gallery at http://localhost:3000
bun run verify    # the full gate
```

## Repository map

```
apps/docs          Rsbuild + Vue documentation site
design/            Synced upstream design docs (read-only)
packages/ui        Vue component library and generated tokens
tooling/upstream   Sync, lockfile, drift report, parity manifest
```

## Porting a component

1. Pick a `planned` component from
   `tooling/upstream/component-manifest.json`.
2. Read its upstream source and Markdown doc in the pinned snapshot under
   `tooling/upstream/.work/`.
3. Port the recipe first: copy variant names, class strings and data
   attributes. Never rename upstream variants.
4. Implement the Vue SFC with slots instead of React `children`/render props.
   Map Base UI behaviour to Reka UI and document unavoidable API differences.
5. Leave Vue runtime imports out of `.vue` and `.ts` source; the `vue`
   auto-import preset provides them. Public types stay explicitly imported.
6. Add tests for rendering, variants, events, disabled/loading states and
   accessibility attributes.
7. Add a gallery entry in `apps/docs`.
8. Set the manifest status to `ported` and add a Changeset.

## Quality gates

```bash
bun run verify
```

The chain is parity, upstream audit, docs links, Biome, `vue-tsc`, API surface,
props snapshot, Vitest, production build and consumer type checks. Pull
requests must be green.

Useful subsets:

```bash
bun run lint
bun run typecheck
bun run test
cd packages/ui && ./node_modules/.bin/vitest run src/components/<name>
```

## Upstream sync

```bash
bun run sync:upstream --ref main
```

This updates `tooling/upstream/upstream.lock.json`, regenerates CSS, refreshes
the docs mirror, rewrites internal links and prints upstream additions. Review
the diff, port anything new, then commit. Never hand-edit synced files;
`bun run check:docs-links` guards the links they point at.

## Commits and releases

- Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- A Changeset for user-visible changes: `bun run changeset`.
- Sign off every commit (`git commit -s`) for DCO 1.1.
- `main` is protected: no deletion, no force-push, pull request required
  (repository admins keep a bypass for releases).
- Releases are cut from `main` by the release workflow after a green verify.

## Code style

- Biome is authoritative for both lint and formatting.
- Vue template usage is invisible to Biome's script analysis, so `vue-tsc` is
  the source of truth for `.vue` unused/type-import rules.
- Use `<script setup lang="ts">` with typed props and emits.
- Prefer `defineModel` for `v-model`.
- Keep components token-driven and free of hard-coded colors.
- Do not hand-edit generated files (`*.generated.ts`, `foundation.css`,
  `themes.css`, `upstream-styles.css`, `tokens.json`, `themes.json`,
  `auto-imports.d.ts`, `design/**`).
