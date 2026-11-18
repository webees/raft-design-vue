# ADR 0002: Normalize Vue declaration output for strict consumers

## Status

Accepted

## Context

`vue-tsc` emits component instance types that reference `GlobalComponents` and
`GlobalDirectives` from Vue. Vue 3.5 declares both as interfaces without a
string index signature, while the generic constraints in
`CreateComponentPublicInstanceWithMixins` require `Record<string, ...>`.

Consumers that enable `skipLibCheck: false` therefore fail while checking the
generated declarations, even though the library source is valid.

## Decision

The `build:types` pipeline runs `scripts/normalize-dts.mjs` after `vue-tsc`.
The script replaces the two global lookup type arguments in emitted
declarations with `Record<string, any>`. This preserves component props,
emits, slots, and public instance types while removing the invalid constraint
reference.

`tests/type-consumer` compiles the built package with
`skipLibCheck: false` and runs as part of `bun run verify`.

## Consequences

- Published declarations work in strict TypeScript projects without requiring
  `skipLibCheck`.
- Global component and directive inference inside the generated public
  instance types is intentionally erased; application-level global typings are
  unaffected.
- The normalization step can be removed once Vue's declarations accept the
  global lookup interfaces directly.
