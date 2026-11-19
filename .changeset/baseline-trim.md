---
"@webees/raft-design-vue": patch
---

Trim the remaining shared boilerplate: every slot part that defaults to a
container tag now declares its props through `asChildProps`, action buttons
reuse `actionProps`, panel roots reuse `panelRootProps`, and the duplicate
close icon moved to the shared Lucide glyph. Portal parts now forward caller
attributes, and `DialogClose` renders the sheet-head action plus the desktop
bar sizing used by upstream.
