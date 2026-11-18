# Raft Design Vue 文档

[English](../en/README.md) | **简体中文**

[Raft Design System](https://github.com/botiverse/raft-design) 的非官方 Vue 3 移植版，
与 Botiverse 无隶属关系。

## 指南

| 文档                                        | 内容                                                     |
| ------------------------------------------- | -------------------------------------------------------- |
| [快速开始](./getting-started.md)            | 安装、渲染、主题、SSR 与 Tailwind 配置                   |
| [架构](./architecture.md)                   | 单仓结构、构建流水线、自动导入与工具链                   |
| [上游同步](./upstream-sync.md)              | 锁定提交、同步流程、对齐规则与已知差异                   |
| [对齐基线](./parity.md)                     | 覆盖率数字、审计方法与组件分组                           |
| [Raft CSS 分析](./upstream-css-analysis.md) | raft.build 使用了什么、raft-ui 能否复用、许可证边界      |
| [贡献指南](./contributing.md)               | 本地开发、移植规则、质量门禁与 DCO                       |
| [安全策略](./security.md)                   | 支持版本与漏洞上报                                       |
| [ADR 0001](./adr/0001-upstream-sync.md)     | 为什么锁定上游、只同步规范输入                           |
| [ADR 0002](./adr/0002-typescript-declarations.md) | 为什么为严格消费者归一化声明输出                   |

## 项目事实

- Vue 3.5、Reka UI、Tailwind CSS v4、Rslib、Bun 1.4
- 使用 Biome 做 lint 与格式化，不再使用 ESLint / Prettier
- `.vue` 文件中的 Vue API 自动导入（`src/auto-imports.d.ts`）
- `bun run verify` 是唯一门禁：对齐、文档链接、Biome、类型、API 面、
  属性快照、测试、库构建与消费者类型
