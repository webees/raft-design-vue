# 对齐基线

[English](../en/parity.md) | **简体中文**

本移植版本的对照对象、审计方式，以及任何改动都不得跌破的下限。本文件
合并了此前的基线文档与逐组件审计说明。

## 上游

|          |                                            |
| -------- | ------------------------------------------ |
| 仓库     | `botiverse/raft-design`                    |
| 提交     | `7d280d65142bf924190f068735c246c155c45089` |
| 同步输入 | 194 个文件（`tooling/upstream/upstream.lock.json`） |

## 覆盖范围

| 检查项                         | 结果                                      |
| ------------------------------ | ----------------------------------------- |
| 已移植上游组件目录             | 102 / 102                                 |
| 已导出上游公共类型             | 960 / 960                                 |
| 已移植 `index.ts` 入口         | 102 / 102                                 |
| 未登记本地组件目录             | 0                                         |
| 缺失 recipe 槽位               | 0                                         |
| 缺失 recipe 类名 token         | 0（逐组件多重集审计）                     |
| 本地独有（Reka 等价）选择器    | 记录于[上游同步](./upstream-sync.md)      |

## 验证

```bash
bun run verify
```

顺序：`check:parity → check:audit → check:docs-links → lint → typecheck →
check:api → check:props → test → build → check:consumer-types`。

2026-11-19，Bun 1.4.4 / Node 22 实测：

|          |                                      |
| -------- | ------------------------------------ |
| 测试文件 | 104                                  |
| 测试用例 | 377                                  |
| 类型检查 | 通过（`vue-tsc --noEmit`）           |
| API 面   | 960 / 960                            |
| 库产物   | 1983.1 kB 原始，285.5 kB gzip        |
| 文档产物 | 4160.4 kB 总计，1605.8 kB gzip       |

### 源码基线

`packages/ui/src` 中 `.ts` + `.vue` 的规模与重复度下限，2026-11-19 实测：

| 指标                                  | 数值        |
| ------------------------------------- | ----------- |
| 源码行数                              | 55,275      |
| `components/` 行数                    | 50,319      |
| `lib/` 行数                           | 3,823       |
| 复制粘贴克隆（jscpd，10 行 / 70 token） | 0          |
| 重复行 / 重复 token                   | 0.00% / 0.00% |
| 未使用变量与参数（`vue-tsc`）          | 0           |
| 无任何导入方的组件文件                | 0           |

复测命令：

```bash
find packages/ui/src \( -name '*.ts' -o -name '*.vue' \) | xargs wc -l
bunx jscpd packages/ui/src --min-lines 10 --min-tokens 70 \
  --ignore "**/*.test.ts,**/*.generated.ts,**/*.css,**/*.json"
cd packages/ui && ./node_modules/.bin/vue-tsc --noEmit \
  -p tsconfig.json --noUnusedLocals --noUnusedParameters
```

## 审计方法

`packages/ui/src/components` 下每个组件按四个维度检查：

```bash
bun run tooling/upstream/src/audit.ts          # 导出、data-slot、字面类名
bun run tooling/upstream/src/audit-recipes.ts  # recipe 类名多重集
bun run check:parity                           # 102/102 目录存在
bun run check:api                              # 上游类型可解析
```

`audit.ts` 输出 `missingSlots`、`missingExports`、`missingClasses`、
`missingProps`；加 `--json` 输出机器可读结果。只有三类差异被接受：

1. **无头层属性名** — Reka 用 `data-state`，Base UI 用 `data-open` /
   `data-checked` / `data-pressed`。recipe 保留上游选择器并补充 Reka 等价
   规则。
2. **CSS 变量** — Reka 的 `--reka-*` 在组件边界别名为上游名称。
3. **组合辅助** — Reka 合并 positioner 与 popup 时，positioner 类加在外层，
   popup 类加在内层 `data-slot` 元素。

其它一律视为缺陷：缺失导出、缺失 `data-slot`、主题未生成的 utility，或
漂移的 recipe 字符串。

## 静态审计

以下检查成本低且必须保持干净：

- 每个 `v-for` 都有 `:key`
- 无 `as any`、`as never`、`@ts-ignore`、`TODO`、`FIXME`
- 组件内无 `v-html`、`JSON.parse`、`localStorage`、`Math.random`
- 每个组件级 `addEventListener` 都有对应移除路径
- 不修改 prop；不从响应式对象解构 props
- 调用方 `class` 只到达组件根一次
- 调用方 `data-slot` 覆盖组件默认值
- 每个 `defineEmits` 条目都会被触发，每个声明的 prop 都被读取
- 每个 Markdown 链接都指向存在的文件与标题（`check:docs-links`）
- 每个受跟踪文件都通过 Biome 格式检查（`bun run lint`）

## 组件清单

| 分组     | 组件族                                                                   |
| -------- | ------------------------------------------------------------------------ |
| 操作     | `Button`、`TextLink`、`KbdButton`、`IconTile`、`ToggleGroup`             |
| 展示     | `Badge`、`Card`、`Avatar`、`Kbd`、`Status`、`Progress`、`Spinner`、`Skeleton`、`Separator`、`Text`、`InlineCode`、`Meter`、`FilterChip`、`SaveStatus` |
| 表单     | `Input`、`Label`、`Field`、`Checkbox`、`Switch`、`RadioGroup`、`Textarea`、`FormSection`、`InputGroup`、`SegmentedControl`、`Select`、`ChoiceList` |
| 内容     | `CodeBlock`、`CopyableCode`、`Banner`、`EmptyState`、`Timeline`、`Markdown`、`FilePreview`、`Files` |
| 导航     | `Tabs`、`Steps`、`AppRail`、`MobileNav`、`SearchTrigger`、`SearchShell`  |
| 浮层     | `Tooltip`、`Popover`、`DropdownMenu`、`ContextMenu`、`Dialog`、`AlertDialog`、`Drawer`、`Lightbox`、`Toast`、`NotificationCenter`、`AnnouncementDialog`、`PreviewCard`、`CoachMark`、`SelectionToolbar` |
| 数据     | `Table`、`DescriptionList`、`ListRow`                                    |
| 布局     | `Resizable`、`ScrollArea`、`Panel`、`ConversationPanel`、`ProfilePanel`、`ThreadPanel`、`AppShell`、`WebTopBar` |
| 任务     | `TasksPanel`、`TaskCard`、`TaskList`、`TaskBoard`、`TaskDnd*`、`TaskCompletionControl`、`TaskDrag*` |
| 消息     | `MessageItem`、`MessageList`、`MessageReplies`、`MessageEmbed`、`SystemMessage`、`MessageActionCard`、`MessageForwardedBundle`、`ActivityInbox`、`InboxItem`、`Composer` |
| 协作     | `CommentMargin`、`CommentCard`、`CommentEntry`、`CommentMarker`、`DragScope`、`Draggable`、`Droppable`、`DragLift`、`DropPlaceholder`、`PullToRefresh` |
| 品牌     | `RaftLogo`、`RaftWordmark`、`RaftLogoLockup`                             |

机器可读清单见 `tooling/upstream/component-manifest.json`。
