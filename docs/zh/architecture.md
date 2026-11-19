# 架构

[English](../en/architecture.md) | **简体中文**

## 仓库结构

```
packages/ui/          Vue 组件库、令牌、主题与编译样式
apps/docs/            Rsbuild 文档与组件画廊
tooling/upstream/     上游同步、锁文件、漂移报告、对齐审计
tests/                跨包消费者冒烟测试
design/               同步的上游 Markdown（只读，不翻译）
```

这是一个 Bun 单仓。每个包声明自己的依赖；根目录只负责脚本、共享
TypeScript 配置和锁文件。

## 构建流水线

`bun run build` 依次执行三段：

1. **令牌** — `tokens.json` + `themes.json` 生成 `foundation.css`、
   `themes.css` 和 Tailwind `@theme` 块。
2. **组件库** — Rslib（Rsbuild）打包 ESM，Vue SFC 由
   `@rsbuild/plugin-vue` 编译，`vue-tsc` 产出声明，再由
   `scripts/normalize-dts.mjs` 展平 Vue 声明辅助类型。
3. **文档** — Rsbuild 渲染 `design/` Markdown 与组件画廊。

只有第 2 步产出发布包；文档与测试消费的是同一份源码，因此文档构建
通过就是一次真实的集成校验。

## Vue 自动导入

`unplugin-auto-import` 通过 `vue` 预设接入 Rslib、Vitest 与文档构建：

```ts
AutoImport({ imports: ["vue"], dts: "src/auto-imports.d.ts" });
```

因此 SFC 与 TypeScript 模块都可直接使用 `ref`、`computed`、`useAttrs`、
`watch`、生命周期钩子等 Vue 运行时 API，无需 import。出现在公共 props
中的类型仍显式导入（`import type { Ref, VNode } from "vue"`），因为声明
产物需要模块级符号。

生成的 `src/auto-imports.d.ts` 需要提交，并由 Biome 排除。不要手改，
每次构建与测试都会重新生成。

`packages/ui/src` 下的所有文件都由该预设编译，因此重新加入运行时导入
属于应当清理的冗余。

## Lint 与格式化

Biome 取代 ESLint 与 Prettier：

```bash
bun run lint      # biome check .
bun run format    # biome check --write .
```

`biome.json` 固定仓库原有风格（100 列、2 空格、双引号、分号、尾逗号），
并排除生成物、`design/`、同步 CSS 与 Tailwind 入口。

两处 Vue 例外是有意为之：

- 脚本级分析看不到模板使用，因此 `.vue` 关闭 `noUnusedVariables`、
  `noUnusedImports` 与 `useImportType`。Vue 代码以 `vue-tsc` 为准。
- 与上游 recipe 冲突的强观点规则（`noImportantStyles`、
  `noDescendingSpecificity`，以及对 `fit()` 误报的 `noFocusedTests`）关闭。

## 质量门禁

`bun run verify` 是唯一必需命令：

```
check:parity → check:audit → check:docs-links → lint → typecheck
→ check:api → check:props → test → build → check:consumer-types
```

CI 在 Node 22 + Bun 上跑同一条链并附加覆盖率；发布工作流要求 verify 通过。

## TypeScript

根配置启用 `strict`、`exactOptionalPropertyTypes`、
`noUncheckedIndexedAccess` 与 `verbatimModuleSyntax`。`vue-tsc` 检查 SFC，
`tsc` 检查工具与测试。公共类型由 `check:api`（960 个导出）快照，props
由 `check:props` 快照。

## 生成文件

禁止手改：

```
packages/ui/src/component-props.generated.ts
packages/ui/src/foundation.css
packages/ui/src/themes.css
packages/ui/src/upstream-styles.css
packages/ui/src/tokens.json
packages/ui/src/themes.json
packages/ui/src/auto-imports.d.ts
design/**
```

它们由令牌构建或上游同步产出。
