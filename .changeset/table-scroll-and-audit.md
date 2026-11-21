---
"@webees/raft-design-vue": patch
---

Render `TableScroll` as the upstream horizontal `ScrollArea` instead of a
hand-written scroll `div`. Callers now get the scroll-area rails, sticky
gutters, native attribute/ref forwarding and the horizontal-only overscroll
behaviour, and the stray `table().scroll` slot is gone.

Honour `NotificationCenterPopup`'s `initialFocus` (it was declared but never
applied), drop the unused `TableSortButton.asChild` prop, apply
`ScrollArea`'s `style` prop, and share the tabs UI context and overlay portal
factories between their parts.
