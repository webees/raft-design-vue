# Agent instructions

Read `CONTRIBUTING.md` and `docs/adr/0001-upstream-sync.md` before changing
code. Key rules:

- This is a source-faithful port. Copy upstream recipes, tokens and semantics
  instead of redesigning them.
- Never edit `packages/ui/src/foundation.css`, `themes.css`, `upstream-styles.css`,
  `tokens.json`, `themes.json`, `design/` or `packages/ui/src/fonts/` by hand.
  They are generated or synced by `bun run sync:upstream` and
  `bun run build:tokens`. `design/**/*.md` internal links are rewritten during
  sync, so `bun run check:docs-links` must stay green.
- Every new component needs: Vue SFC, recipe module, `index.ts`, tests, docs
  entry, and an entry in `tooling/upstream/component-manifest.json`.
- Prefer semantic tokens (`bg-layer-card`, `text-foreground`,
  `border-line-strong`) over raw palette values.
- Run `bun run verify` before finishing.
