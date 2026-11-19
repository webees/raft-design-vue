---
"@webees/raft-design-vue": patch
---

Route the message footer and reaction parts through the shared `createSlotPart`
factory, forward `as` from `PanelScrollViewport` to its scroll area, and record
the refreshed source baseline.
