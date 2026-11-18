# @webees/raft-design-vue

**English** | [简体中文](./README.zh-CN.md)

Unofficial Vue 3 port of the [Raft Design System](https://github.com/botiverse/raft-design).
Not affiliated with Botiverse.

## Install

```bash
bun add @webees/raft-design-vue
```

Requires Vue 3.5+. Styles need Tailwind CSS v4 only if you compile your own
entry.

## Usage

```ts
import "@webees/raft-design-vue/styles.css";
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
```

```vue
<Card>
  <CardHeader><CardTitle>Workspace</CardTitle></CardHeader>
  <Button variant="primary">Create</Button>
</Card>
```

Set `class="light"` or `class="dark"` plus an optional `data-theme`
(`boring`, `bots`, `critters`, `space`, `desk`, `food`, `quest`, `weather`,
`plants`, `spooky`) on `<html>`.

## What is inside

- 102 upstream component directories, 960 exported types
- Tailwind v4 foundation, ten themes, bundled Space Grotesk / Space Mono
- Reka UI primitives with upstream recipe strings preserved
- Strict TypeScript declarations, `skipLibCheck: false` compatible
- ESM only, tree-shakeable, no global component registration

The full component inventory and parity numbers live in
[docs/en/parity.md](https://github.com/webees/raft-design-vue/blob/main/docs/en/parity.md).

## Development

```bash
bun run build:tokens   # tokens.json + themes.json → CSS
bun run build:types    # vue-tsc declarations + normalization
bun run build          # ESM + CSS + declarations
```

`.vue` files use the `vue` auto-import preset; public types stay explicit.
Biome handles lint and formatting.

## License

MIT. See `LICENSE` and `NOTICE.md`. Raft brand assets are not included.
