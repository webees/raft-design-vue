# Raft 站点 CSS 与 raft-ui 复用分析

[English](../en/upstream-css-analysis.md) | **简体中文**

结论：`raft.build` 与 `app.raft.build` 都使用 **Tailwind CSS v4**，视觉语言是
Raft 自己的“方形贴纸 / neo-brutalist”体系。`raft-ui` 已开源，采用 MIT；
当前包名是 `@botiverse/raft-ui`（旧包名 `raft-ui` 仍可安装），仓库为
`botiverse/raft-design`。Vue 项目不能直接复用 React 组件，但可以在保留
MIT 版权声明的前提下复用其设计令牌、CSS 基础和设计文档。

## 证据

### 站点产物

- `https://raft.build/assets/main-77yWH4V8.css` 约 683 KB，含
  `@layer properties|theme|base|components|utilities`、`--tw-*` 变量和
  `--color-brutal-*` 调色板。这是 Tailwind v4 的编译输出特征。
- `https://app.raft.build/assets/app-shell-VN-s0t2L.css` 约 589 KB，同样含
  `--tw-*`、`@layer` 和 Raft 令牌；应用入口还加载
  `vendor-raft-ui-*.js`。
- 两个站点都自托管 `Space Grotesk` 与 `Space Mono` 的 WOFF2，不依赖
  Google Fonts 运行时请求。

### 上游仓库

- `botiverse/raft-design`：MIT，默认分支 `main`，描述为
  “guidelines, design tokens and raft-ui”。
- `packages/ui/package.json`：`@botiverse/raft-ui@0.102.3`，MIT，依赖
  `@base-ui/react`、`class-variance-authority`、`tailwind-merge`、
  `lucide-react`、`@dnd-kit/*`。
- `npm raft-ui@0.6.0` 的 `repository` 指向 `botiverse/rui`；GitHub 会
  301 到 `botiverse/raft-design`，说明是同一项目改名后的旧包。
- `NOTICE.md` 明确：代码 MIT；Raft Logo、Agent sprites、reaction artwork
  等品牌素材不在 MIT 授权范围内。
- 仓库欢迎 issue，但代码贡献仅限协作者；这不是“开放贡献”模型。

## 设计体系

- **框架**：Tailwind CSS v4（CSS-first `@theme`、`@utility`、`@source`），
  不依赖 `tailwind.config.js`。
- **令牌**：`tokens.json` 生成 `foundation.css` / `themes.css`。颜色使用
  OKLCH；语义层分为 `layer-*`、`fill-*`、`foreground-*`、`line-*`、
  `selected`、`brand`、状态色等。主题通过根节点类/属性切换。
- **字体**：Space Grotesk 用于人写的文本，Space Mono 用于机器文本
  （ID、时间、代码、快捷键）；中文回退 PingFang SC / Source Han Sans。
- **形状**：方形是品牌基形。头像、徽章、步骤、骨架都是方形贴纸；
  只有开关、单选框和拖拽把手使用全圆角。
- **描边与阴影**：线条 1px；控件、字段、贴纸 1.5px 墨色边；贴纸用硬边
  偏移阴影，而不是大面积模糊阴影。
- **层级**：画布 → 卡片 → 弹层逐层变亮；浅色模式用线区分，深色模式用
  明度区分。Toast/Tooltip 使用中性的 `layer-hud`，不使用品牌色。
- **色彩含义**：黄色只代表“你/当前选中”，粉色代表待办，青色代表当前
  条目，橙色代表打断，红色代表不可逆操作。
- **组件基座**：React 侧使用 Base UI 提供可访问性行为，CVA + tailwind-merge
  组合样式；Vue 侧我们用 Reka UI 对应替换。

## 能否复用

可以直接复用：

- `tokens.json`、`foundation.css`、`themes.css` 的令牌与主题定义（保留 MIT
  声明）。
- Tailwind v4 的工具类约定、语义色命名、字体与间距比例。
- 设计文档中的交互、可访问性和状态规范。

不能直接复用：

- `@botiverse/raft-ui` 的 React 组件源码（运行时与 JSX 绑定 React/Base UI）。
- Raft Logo、Agent sprites、reaction artwork 等品牌素材。
- 上游私有或未发布的字体/图片资源。

本仓库的处理方式：

- 组件用 Vue 3 + Reka UI 独立重写，不 fork 上游 React 代码。
- 令牌与基础 CSS 通过 `tooling/upstream` 同步，保留来源提交和 SHA-256
  清单，便于追踪上游变化。
- 品牌素材不进入发布包；`NOTICE.md` 记录上游 MIT 与素材例外。

## 风险

- 上游版本迭代很快（当前 0.102.x），组件 API 和令牌可能变动；必须依赖
  `bun run sync:upstream` 与 parity 清单持续对齐。
- Tailwind v4 是硬前提；消费者若仍用 v3，需要单独产出兼容 CSS。
- 直接复制上游 CSS 时，MIT 版权声明必须保留；不能把品牌素材当成 MIT。
- `raft-ui` 的“开源”是 license 层面的开源，不代表上游接受外部代码贡献。
