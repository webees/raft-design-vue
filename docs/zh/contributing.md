# 贡献指南

[English](../../CONTRIBUTING.md) | **简体中文**

感谢参与 Raft 的 Vue 移植。

## 本地开发

```bash
bun install
bun run dev       # 文档画廊 http://localhost:3000
bun run verify    # 完整门禁
```

## 仓库结构

```
apps/docs          Rsbuild + Vue 文档站
design/            同步的上游设计文档（只读）
packages/ui        Vue 组件库与生成的令牌
tooling/upstream   同步、锁文件、漂移报告、对齐清单
```

## 移植组件

1. 从 `tooling/upstream/component-manifest.json` 选择一个状态为 `planned`
   的组件。
2. 在 `tooling/upstream/.work/` 的锁定快照中阅读上游源码与 Markdown 文档。
3. 先移植 recipe：复制变体名、类名字符串与 data 属性，绝不重命名上游变体。
4. 用 Vue SFC 与插槽实现，替代 React 的 `children`/render props；把 Base UI
   行为映射到 Reka UI，并记录无法避免的 API 差异。
5. `.vue` 与 `.ts` 源码都不写 Vue 运行时 import，由 `vue` 自动导入预设提供；公共类型
   仍显式导入。
6. 补测试：渲染、变体、事件、禁用/加载状态、可访问性属性。
7. 在 `apps/docs` 添加画廊条目。
8. 将清单状态改为 `ported` 并添加 Changeset。

## 质量门禁

```bash
bun run verify
```

链路为：对齐、上游审计、文档链接、Biome、`vue-tsc`、API 面、props 快照、
Vitest、生产构建、消费者类型检查。PR 必须全绿。

常用子集：

```bash
bun run lint
bun run typecheck
bun run test
cd packages/ui && ./node_modules/.bin/vitest run src/components/<name>
```

## 上游同步

```bash
bun run sync:upstream --ref main
```

该命令更新 `tooling/upstream/upstream.lock.json`、重新生成 CSS、刷新文档镜像、
重写内部链接并输出上游新增内容。审阅 diff、移植新增项后提交。禁止手改
同步文件；`bun run check:docs-links` 会校验它们指向的链接。

## 提交与发布

- 使用 Conventional Commits（`feat:`、`fix:`、`docs:`、`chore:`）。
- 用户可见变更添加 Changeset：`bun run changeset`。
- 每次提交使用 `git commit -s` 签署 DCO 1.1。
- `main` 受保护：禁止删除、禁止强推、必须走 PR（仓库管理员保留发布绕过）。
- 发布由 release 工作流在 verify 通过后从 `main` 切出。工作流仅在配置了
  `NPM_TOKEN` 时执行 npm 发布；未配置时仍会打版本并开 release PR，但跳过
  发布并以 warning 提示，不再判定为失败。

## 代码风格

- Biome 是 lint 与格式化的唯一权威。
- Biome 的脚本级分析看不到模板使用，`.vue` 的未使用/类型导入规则以
  `vue-tsc` 为准。
- 使用 `<script setup lang="ts">`，props 与 emits 必须带类型。
- `v-model` 优先使用 `defineModel`。
- 组件由令牌驱动，禁止硬编码颜色。
- 禁止手改生成物（`*.generated.ts`、`foundation.css`、`themes.css`、
  `upstream-styles.css`、`tokens.json`、`themes.json`、`auto-imports.d.ts`、
  `design/**`）。
