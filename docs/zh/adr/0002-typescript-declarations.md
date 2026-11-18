# ADR 0002：为严格消费者归一化 Vue 声明输出

[English](../../en/adr/0002-typescript-declarations.md) | **简体中文**

- 状态：已接受
- 日期：2026-11-17

## 背景

`vue-tsc` 产出的组件实例类型引用 Vue 的 `GlobalComponents` 与
`GlobalDirectives`。Vue 3.5 将二者声明为无字符串索引签名的接口，而
`CreateComponentPublicInstanceWithMixins` 的泛型约束要求
`Record<string, ...>`。

因此启用 `skipLibCheck: false` 的消费者在校验生成的声明时失败，尽管库源码
本身合法。

## 决策

`build:types` 在 `vue-tsc` 之后运行 `scripts/normalize-dts.mjs`，把产出声明
中的两个全局查找类型参数替换为 `Record<string, any>`。这样保留组件 props、
emits、slots 与公共实例类型，同时移除非法约束引用。

`tests/type-consumer` 以 `skipLibCheck: false` 编译构建产物，并作为
`bun run verify` 的一部分运行。

## 影响

- 发布的声明可在严格 TypeScript 项目中直接使用，无需 `skipLibCheck`。
- 生成实例类型中的全局组件/指令推断被有意抹除；应用层全局类型不受影响。
- 当 Vue 声明直接接受全局查找接口后，可移除此归一化步骤。
