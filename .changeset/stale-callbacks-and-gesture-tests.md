---
"@webees/raft-design-vue": patch
---

`ScrollArea`, `ScrollAreaTextarea` and `ScrollAreaGutter` now call their
`onEdgeChange` / `onDraggingChange` handlers through `props`, so handlers the
parent recreates on every render stay live instead of freezing the first
closure.

Adds the missing upstream gesture suite for `PullToRefresh` (distance, progress,
step, iOS latch vs Android re-arm, hold/cancel and settle transitions).
