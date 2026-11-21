---
"@webees/raft-design-vue": patch
---

Fold the primitive part prop factory into `lib/part-props.ts` and drop the
unused `ButtonSplitPart` experiment, so slot parts share one prop source of
truth. Refresh the EN/ZH parity baseline with re-measured bundle, source and
duplication numbers.
