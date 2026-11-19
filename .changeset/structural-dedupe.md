---
"@webees/raft-design-vue": patch
---

Collapse duplicated component shells into shared factories: task/board sections,
panel toggles, app-rail parts, text-link markers, submenu chevrons and the
combobox/select scroll frame now have one implementation each, measured at zero
copy-paste clones by jscpd (8 lines / 55 tokens).

Portals render their marker and caller attributes on a `display: contents`
wrapper inside the teleport, so `DialogPortal` and siblings no longer emit Vue's
extraneous-attribute warning while keeping caller `class`/`data-*` forwarding.
`VirtualList` accepts boolean slot content instead of failing prop validation,
and `useComposerSuggestions` works headlessly without `useId`/`onBeforeUnmount`
warnings.
