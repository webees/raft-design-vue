---
"@webees/raft-design-vue": patch
---

Trim the implementation to a smaller core without changing the public surface:
every drawer part now shares one recipe binding, the two slot factories are one,
scroll gutters receive a single binding object, the logo components share one
SVG root, controlled open/pressed state lives in `lib/use-controlled-state.ts`,
and the split button, dropdown content, alert-dialog content and panel toggles
no longer duplicate their plumbing. Dead exports were removed, and
`SelectionToolbarMore` no longer drops the caller's `class`.
