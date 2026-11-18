# 快速开始

[English](../en/getting-started.md) | **简体中文**

## 环境要求

- Node.js >= 22（本仓库开发使用 Bun >= 1.4）
- Vue 3.5+
- 若自行编译样式，需要 Tailwind CSS v4

## 安装

```bash
bun add @webees/raft-design-vue
# 或：npm i @webees/raft-design-vue
```

包内提供编译后的 ESM、Vue 类型声明和生成好的样式表。使用方不需要
Rslib、Reka UI 或自动导入插件。

## 样式

```ts
import "@webees/raft-design-vue/styles.css";
```

样式表包含 Tailwind v4 基础、全部语义令牌、十个上游主题与字体。它是
生成产物，不要手改。

如果使用自己的 Tailwind v4 入口：

```css
@import "@webees/raft-design-vue/styles.css";
@source "../node_modules/@webees/raft-design-vue";
```

## 渲染

```vue
<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Workspace</CardTitle>
    </CardHeader>
    <Button variant="primary">创建</Button>
  </Card>
</template>
```

组件采用显式导入，不注册全局组件，任何打包器都能做 tree-shaking。

## 主题

```html
<html class="light" data-theme="boring"></html>
```

- `class="light"` / `class="dark"` 控制明暗模式。
- `data-theme` 可选 `boring`、`bots`、`critters`、`space`、`desk`、`food`、
  `quest`、`weather`、`plants`、`spooky`。
- 省略 `data-theme` 使用默认框架主题。

所有令牌都是 CSS 自定义属性，可在运行时切换。

## SSR 与 Nuxt

库对 SSR 安全：组件在 setup 阶段不访问 `window`。样式在应用入口引入，
不要放进组件。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@webees/raft-design-vue/styles.css"],
});
```

ID 生成使用 Vue 的 `useId`，服务端与客户端标记一致。

## TypeScript

所有公开 props、emits、slots 与变体联合类型均已导出，支持 strict、
`exactOptionalPropertyTypes` 与 `noUncheckedIndexedAccess`。

```ts
import type { ButtonProps, ButtonVariant } from "@webees/raft-design-vue";
```

## 下一步

- [架构](./architecture.md)
- [上游同步](./upstream-sync.md)
- [对齐基线](./parity.md)
