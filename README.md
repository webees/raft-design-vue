# Raft Design Vue

**English** | [简体中文](./docs/zh/README.md)

> Unofficial Vue 3 port of the [Raft Design System](https://github.com/botiverse/raft-design).
> Not affiliated with Botiverse.

[![CI](https://github.com/webees/raft-design-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/webees/raft-design-vue/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-141111)](./LICENSE)

A source-faithful Vue 3 implementation of Raft's design language: warm paper
surfaces, yellow frames, hard 1.5px ink lines, restrained radii, Space Grotesk
and mono metadata. Recipes and tokens stay byte-comparable with upstream
instead of inventing a new visual language.

## Stack

- **Runtime**: Vue 3.5, TypeScript, Reka UI primitives
- **Styling**: Tailwind CSS v4, tailwind-variants, tailwind-merge
- **Build**: Bun workspaces, Rslib (Rsbuild library mode), Vue SFC auto-import
- **Docs**: Rsbuild + Vue, upstream Markdown rendered at build time
- **Quality**: Biome, Vitest, Vue Test Utils, Changesets, GitHub Actions

## Quick start

```bash
bun install
bun run dev          # docs at http://localhost:3000
bun run build        # tokens + library + docs
bun run verify       # parity + docs + lint + types + tests + build
```

Requirements: Bun >= 1.4, Node >= 22.

## Packages

| Package            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `packages/ui`      | `@webees/raft-design-vue`, Vue components, tokens and CSS |
| `apps/docs`        | Documentation and live component gallery                  |
| `tooling/upstream` | Upstream sync, lockfile, drift report and parity checks   |

## Usage

```bash
bun add @webees/raft-design-vue
```

```ts
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
import "@webees/raft-design-vue/styles.css";
```

```vue
<Button variant="primary" size="md">Create</Button>
```

Set the theme on the document root:

```html
<html class="light" data-theme="boring"></html>
```

`light` / `dark` select the mode. `data-theme` selects one of the upstream
themes (`boring`, `bots`, `critters`, `space`, `desk`, `food`, `quest`,
`weather`, `plants`, `spooky`). Omit `data-theme` for the default frame.

## Upstream updates

Upstream is pinned to an exact commit in
`tooling/upstream/upstream.lock.json`. Synced inputs (design docs, tokens,
themes, fonts, Tailwind foundations) are never hand-edited:

```bash
bun run sync:upstream     # fetch pinned/latest upstream and update synced inputs
bun run check:upstream    # detect drift from upstream main
bun run check:parity      # fail if upstream adds an untracked component
```

Hand-written Vue components are never overwritten. See
[`docs/en/upstream-sync.md`](./docs/en/upstream-sync.md) for the workflow and
the intentional differences list.

## Status

Pre-release. `check:parity` reports **102 / 102** upstream component
directories ported, **960 / 960** public types exported, and zero missing
recipe slots or class tokens. Coverage, baseline numbers and the audit method
are in [`docs/en/parity.md`](./docs/en/parity.md).

## Documentation

| English                                                 | 简体中文                                                |
| ------------------------------------------------------- | ------------------------------------------------------- |
| [Getting started](./docs/en/getting-started.md)         | [快速开始](./docs/zh/getting-started.md)                |
| [Architecture](./docs/en/architecture.md)               | [架构](./docs/zh/architecture.md)                       |
| [Upstream sync](./docs/en/upstream-sync.md)             | [上游同步](./docs/zh/upstream-sync.md)                  |
| [Parity baseline](./docs/en/parity.md)                  | [对齐基线](./docs/zh/parity.md)                         |
| [Contributing](./CONTRIBUTING.md)                       | [贡献指南](./docs/zh/contributing.md)                   |
| [Security](./SECURITY.md)                               | [安全策略](./docs/zh/security.md)                       |
| [Raft CSS analysis](./docs/en/upstream-css-analysis.md) | [Raft CSS 分析](./docs/zh/upstream-css-analysis.md)     |

## License and attribution

MIT. Upstream Raft Design System is MIT licensed, copyright Botiverse. Brand
artwork, logos and Agent sprites are excluded. See [`NOTICE.md`](./NOTICE.md).
