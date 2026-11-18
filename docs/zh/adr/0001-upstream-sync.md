# ADR 0001：锁定上游并同步规范输入

[English](../../en/adr/0001-upstream-sync.md) | **简体中文**

- 状态：已接受
- 日期：2026-11-17

## 背景

上游是一个 React 应用与组件库，包含设计令牌、主题、文档与 100 多个组件。
框架重写无法采用 fork-and-merge：Vue 文件与上游 TSX 没有共同祖先。

对本移植真正重要的上游变更集中在少量规范输入：`tokens.json`、
`themes.json`、生成的基础层、主题 CSS 与设计/组件 Markdown。组件源码变更
属于参考材料，不是合并候选。

## 决策

1. 在 `tooling/upstream/upstream.lock.json` 中把上游锁定到确切提交。
2. 只内置规范输入：设计文档、令牌、主题、字体与上游 Tailwind 主题/工具
   CSS。
3. 由锁定的 JSON 在本地生成 `foundation.css` 与 `themes.css`，保证输出
   可复现、可审计。
4. 维护组件清单（`tooling/upstream/component-manifest.json`），状态为
   `ported`、`planned`、`not-applicable`。
5. 上游新增组件但清单缺失时 `check:parity` 失败，强制做出明确的移植或
   不移植决定。
6. 定时工作流检测漂移，并用同步 diff 开 PR。

## 影响

- 上游更新成为显式、可审阅的 PR。
- 与 React 代码之间没有长期合并冲突面。
- 移植可能落后上游；对齐报告让差距可见。
- 同步文件禁止手改，由 CI 与评审强制执行。
