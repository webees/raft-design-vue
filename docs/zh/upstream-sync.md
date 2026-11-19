# 上游同步

[English](../en/upstream-sync.md) | **简体中文**

## 锁定上游

`tooling/upstream/upstream.lock.json` 记录本移植版本对照的确切提交，当前为
`botiverse/raft-design@c7045d63`。每个同步文件还记录 SHA-256，可检测局部
篡改。

## 同步范围

以下输入逐字复制，禁止手改：

- `design/**` Markdown（上游文档，仅英文）
- `tokens.json`、`themes.json` 及生成的 CSS
- 字体文件与 Tailwind 基础层
- 上游 `world.css`、`graphics.css` 等全局样式

手写代码永不被覆盖：`packages/ui/src/components/**`、`apps/docs/**`、
`tooling/**` 与全部测试归本仓库所有。

## 命令

```bash
bun run fetch:upstream   # 仅落盘锁定快照（CI 使用）
bun run sync:upstream    # 拉取锁定提交（或最新）并更新同步输入
bun run check:upstream   # 报告相对上游 main 的漂移
bun run check:parity     # 组件覆盖：102 / 102，无未登记目录
bun run check:audit      # 对照快照审计 recipe、类名与 props
```

## 升级流程

1. `bun run sync:upstream` — 更新锁文件、`design/`、令牌、主题与同步 CSS。
2. 审阅生成的 diff，执行 `bun run build:tokens` 重新生成令牌。
3. 运行 `bun run verify`。
4. 按检查结果移植新增组件或 recipe。
5. 为用户可见变更添加 changeset，使用 `-s` 提交。

`check:parity` 在上游存在组件目录但本地缺少 Vue 实现（或本地目录未登记
清单）时失败。`check:audit` 比对 recipe 类名字符串与 props 表，并区分
有意差异与漂移。

## 已知差异（有意）

- Reka UI 取代 Base UI 作为无头层。
- Lucide Vue Next 取代 Lucide React 提供图标。
- 字体本地打包，不从 CDN 加载。
- 不附带 Raft logo、Agent sprites 与 reaction 素材。
- `Dialog` 在 Reka `DialogContent` 内绘制手机 sheet，没有 Base UI
  `Popup.sheet` 的 portal 边界。sheet 定位改用 `data-sheet` 样式，固定定位
  子元素对齐卡片而非 sheet 外框。
- `DialogNav` 把上游 `render` prop 映射为 `ScrollArea` 的 `as`。
- 拖拽占位使用 `DropPlaceholder`（`SortableTabs`、`DraggedSlot`）而非上游
  `PLACE_STYLE`，动画首尾帧略有差异。
- Reka portal 暴露 `--reka-*` 变量；`Popover`、`Tooltip`、`PreviewCard`、
  `Select`、`Combobox` 将其别名为上游的 `--available-width/-height`、
  `--anchor-width` 与 `--transform-origin`。
- Reka 的 `CollapsibleContent` 高度变量为
  `--reka-collapsible-content-height`；`MessageActionCard` 别名为
  `--collapsible-panel-height` 并保留上游过渡，含 Reka 不发出的
  `starting-style`/`ending-style` 关键帧。
- Base UI 的 `data-open`、`data-closed`、`data-panel-open` 在 Reka 下变为
  `data-state="open|closed"`；recipe 保留上游选择器以满足字符串对齐，并补充
  `data-[state=...]` 等价规则。
- `SelectContent` 自带 portal，因此再包 `SelectPortal` 合法但非必需。
- `ComboboxList` 渲染在带绝对沟槽的 scroll-area 框架内；
  `ComboboxContent` 将 Reka 的 `--reka-combobox-content-*` 变量做别名。
- 框架弹层使用与上游相同的计算矩形边界；floating-ui 运行时接受 rect，
  Reka 的 prop 类型只声明元素。
- Dialog 与 AlertDialog 会为自己的子节点重置 sheet 作用域，使 sheet 内打开
  的对话框按普通对话框渲染，对应上游 `DialogSheetReset`。

## 为什么不直接跟踪 `main`

上游持续变化会让视觉 diff、声明快照与 props 表无法复现。锁定提交为所有
检查提供稳定基准；升级是一次显式提交，同时更新锁文件与审计基线。
