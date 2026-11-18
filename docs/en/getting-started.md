# Getting started

**English** | [简体中文](../zh/getting-started.md)

## Requirements

- Node.js >= 22 (or Bun >= 1.4 for this repository)
- Vue 3.5+
- Tailwind CSS v4 if you compile styles yourself

## Install

```bash
bun add @webees/raft-design-vue
# or: npm i @webees/raft-design-vue
```

The package ships compiled ESM, Vue type declarations and the generated
stylesheet. Consumers do not need Rslib, Reka UI or the auto-import plugin.

## Styles

```ts
import "@webees/raft-design-vue/styles.css";
```

The stylesheet contains the Tailwind v4 foundation, all semantic tokens, the
ten upstream themes and the font faces. It is a compiled artifact; do not edit
it by hand.

If you build your own Tailwind v4 entry, import the foundation instead:

```css
@import "@webees/raft-design-vue/styles.css";
@source "../node_modules/@webees/raft-design-vue";
```

## Render

```vue
<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Workspace</CardTitle>
    </CardHeader>
    <Button variant="primary">Create</Button>
  </Card>
</template>
```

Components are imported explicitly. The library does not register global
components, so tree-shaking works with any bundler.

## Theme

```html
<html class="light" data-theme="boring"></html>
```

- `class="light"` / `class="dark"` selects the color mode.
- `data-theme` selects `boring`, `bots`, `critters`, `space`, `desk`, `food`,
  `quest`, `weather`, `plants` or `spooky`.
- Omit `data-theme` to use the default frame.

The theme can be changed at runtime; all tokens are CSS custom properties.

## SSR and Nuxt

The library is SSR-safe: no component touches `window` during setup. Register
the stylesheet in your app entry, not inside a component.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@webees/raft-design-vue/styles.css"],
});
```

Id generation uses Vue's `useId`, so server and client markup match.

## TypeScript

All public props, emits, slots and variant unions are exported. Strict mode,
`exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` are supported.

```ts
import type { ButtonProps, ButtonVariant } from "@webees/raft-design-vue";
```

## Next

- [Architecture](./architecture.md)
- [Upstream sync](./upstream-sync.md)
- [Parity baseline](./parity.md)
