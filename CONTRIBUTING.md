# Contributing

Thanks for helping build the Vue port of Raft.

## Setup

```bash
bun install
bun run dev
```

## Repository map

```
apps/docs                 Rsbuild + Vue documentation site
design/                   Synced upstream design docs (read-only)
packages/ui               Vue component library and generated tokens
tooling/upstream          Sync, lockfile, drift report, parity manifest
```

## Porting a component

1. Pick a component from `tooling/upstream/component-manifest.json` whose
   status is `planned`.
2. Read its upstream source and Markdown doc in the pinned snapshot under
   `tooling/upstream/.work/` (or the upstream repository).
3. Port the recipe first: copy variant names, class strings and data
   attributes. Do not rename variants.
4. Implement the Vue SFC with slots instead of React `children`/render props.
   Map Base UI behaviour to Reka UI. Document unavoidable API differences.
5. Add tests for rendering, variants, events, disabled/loading states and
   accessibility attributes.
6. Add a gallery entry in `apps/docs`.
7. Set the manifest status to `ported` and add a Changeset.

## Quality gates

```bash
bun run verify
```

This runs component parity, the docs drift audit, the Markdown link check,
Prettier, ESLint, `vue-tsc`, the API surface check, Vitest and a full
production build. Pull requests must be green.

## Upstream sync workflow

Maintainers run:

```bash
bun run sync:upstream --ref main
```

The command updates `tooling/upstream/upstream.lock.json`, regenerates CSS,
refreshes the docs mirror, rewrites its internal links and prints a changelog
of upstream additions. Review the generated diff, port anything new, then
commit. Never hand-edit synced files; `bun run check:docs-links` guards the
links those files point at.

## Commits and releases

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Add a Changeset for user-visible changes: `bun run changeset`.
- Sign off commits (`git commit -s`) to certify the Developer Certificate of
  Origin 1.1.
- Releases are cut from `main` by the release workflow.

## Code style

- Prettier and ESLint are authoritative.
- Use `<script setup lang="ts">` and explicit prop/emit types.
- Prefer `defineModel` for v-model support.
- Keep components unstyled-by-default and token-driven.
