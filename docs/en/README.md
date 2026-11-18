# Raft Design Vue — Documentation

**English** | [简体中文](../zh/README.md)

Unofficial Vue 3 port of the [Raft Design System](https://github.com/botiverse/raft-design).
Not affiliated with Botiverse.

## Guides

| Document                                        | Contents                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| [Getting started](./getting-started.md)         | Install, render, theme, SSR and Tailwind setup                   |
| [Architecture](./architecture.md)               | Monorepo layout, build pipeline, auto-import, tooling            |
| [Upstream sync](./upstream-sync.md)             | Pinned upstream, sync workflow, parity rules, known differences  |
| [Parity baseline](./parity.md)                  | Coverage numbers, audit method, component groups                 |
| [Raft CSS analysis](./upstream-css-analysis.md) | What raft.build uses, whether raft-ui is reusable, licensing     |
| [Contributing](../../CONTRIBUTING.md)           | Local setup, porting rules, quality gates, DCO                   |
| [Security](../../SECURITY.md)                   | Supported versions and reporting                                 |
| [ADR 0001](./adr/0001-upstream-sync.md)         | Why upstream is pinned and only canonical inputs are synced      |
| [ADR 0002](./adr/0002-typescript-declarations.md) | Why declaration output is normalized for strict consumers      |

## Project facts

- Vue 3.5, Reka UI, Tailwind CSS v4, Rslib, Bun 1.4
- Biome for linting and formatting; no ESLint or Prettier
- Vue APIs are auto-imported in `.vue` files (`src/auto-imports.d.ts`)
- `bun run verify` is the single gate: parity, docs links, Biome, types,
  API surface, props snapshot, tests, library build and consumer types
