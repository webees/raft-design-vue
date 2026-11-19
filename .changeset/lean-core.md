---
"@webees/raft-design-vue": patch
---

Continue the lean-core pass: reference chips, inbox parts and the task tree
parts are built by one factory each, panel toggles and collapsible sections
share their props and controlled state, both split-button halves share one
props object, drag elements register through `useDragElement`, and the app
shell trigger always renders `PanelAction`. Copy-paste clones measured by
jscpd (10 lines / 70 tokens) are now zero.
