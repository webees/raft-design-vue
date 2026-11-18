# Parity baseline

Snapshot of what this port is measured against and what is verified today.
Treat the numbers as the floor a change must not drop below.

## Upstream

|               |                                                   |
| ------------- | ------------------------------------------------- |
| Repository    | `botiverse/raft-design`                           |
| Ref           | `main`                                            |
| Commit        | `7d280d65142bf924190f068735c246c155c45089`        |
| Synced inputs | 194 files (`tooling/upstream/upstream.lock.json`) |

## Covered surface

| Check                                   | Result                                          |
| --------------------------------------- | ----------------------------------------------- |
| Upstream component directories ported   | 102 / 102                                       |
| Upstream public types exported          | 960 / 960                                       |
| Ported `index.ts` entry points          | 102 / 102                                       |
| Untracked local component folders       | 0                                               |
| Recipe slots missing vs upstream        | 0                                               |
| Recipe class tokens missing vs upstream | 0 (multiset audit, per component)               |
| Local-only (Reka-equivalent) selectors  | listed in `README.md` under _Known differences_ |

## Verification

```bash
PATH="$HOME/.bun/bin:$PATH" bun run verify
```

Runs, in order: `check:parity → check:audit → check:docs-links → format:check
→ lint → typecheck → check:api → check:props → test → build →
check:consumer-types`.

Measured on 2026-11-19:

|             |                                 |
| ----------- | ------------------------------- |
| Test files  | 104                             |
| Tests       | 375                             |
| Type check  | clean (`vue-tsc --noEmit`)      |
| API surface | 960 / 960                       |
| Docs bundle | 4160.8 kB total, 1604.9 kB gzip |

## Static audit

These checks are cheap and are expected to stay clean:

- every `v-for` has a `:key`
- no `as any`, `as never`, `@ts-ignore`, `TODO`, `FIXME`
- no `v-html`, `JSON.parse`, `localStorage` or `Math.random` in components
- every per-component `addEventListener` has a matching removal path (the
  module-level font-loading listener in `lib/truncation.ts` lives for the page,
  as upstream's does)
- no prop is mutated; no props destructured out of reactivity
- caller `class` reaches a component's root exactly once
- caller `data-slot` wins over a component's default slot name
- every `defineEmits` entry is emitted, every declared prop is read
- every `design/**/*.md` link resolves to an existing file and heading
  (`check:docs-links`)
- every tracked file matches the repository Prettier configuration
  (`format:check`)

## Intentional differences

See _Known differences_ in `README.md`. They fall into three groups:

1. Headless layer: Reka UI instead of Base UI (attribute and variable names).
2. React-only helpers with no Vue equivalent (`useMergedRef` is a template ref,
   `styled-props` is the recipe `class` merge).
3. Positioning details Reka types differently: `SheetPopupBoundary` computes
   the sheet rect upstream passes to Base UI and hands it to Reka as its
   `collisionBoundary`; floating-ui accepts a rect at runtime, though Reka's
   prop type only names elements.
