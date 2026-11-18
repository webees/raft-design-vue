# @webees/raft-design-vue

[English](./README.md) | **简体中文**

[Raft Design System](https://github.com/botiverse/raft-design) 的非官方 Vue 3
移植版，与 Botiverse 无隶属关系。

## 安装

```bash
bun add @webees/raft-design-vue
```

需要 Vue 3.5+；只有自行编译样式入口时才需要 Tailwind CSS v4。

## 使用

```ts
import "@webees/raft-design-vue/styles.css";
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
```

```vue
<Card>
  <CardHeader><CardTitle>Workspace</CardTitle></CardHeader>
  <Button variant="primary">创建</Button>
</Card>
```

在 `<html>` 上设置 `class="light"` 或 `class="dark"`，可选 `data-theme`
（`boring`、`bots`、`critters`、`space`、`desk`、`food`、`quest`、
`weather`、`plants`、`spooky`）。

## 内容

- 102 个上游组件目录，960 个导出类型
- Tailwind v4 基础、十个主题、内置 Space Grotesk / Space Mono
- Reka UI 原语，保留上游 recipe 字符串
- 严格 TypeScript 声明，兼容 `skipLibCheck: false`
- 仅 ESM、可 tree-shaking、不注册全局组件

完整组件清单与对齐数字见
[docs/zh/parity.md](https://github.com/webees/raft-design-vue/blob/main/docs/zh/parity.md)。

## 开发

```bash
bun run build:tokens   # tokens.json + themes.json → CSS
bun run build:types    # vue-tsc 声明 + 归一化
bun run build          # ESM + CSS + 声明
```

`.vue` 文件使用 `vue` 自动导入预设；公共类型保持显式导入。Biome 负责
lint 与格式化。

## 许可证

MIT。见 `LICENSE` 与 `NOTICE.md`。不包含 Raft 品牌素材。
