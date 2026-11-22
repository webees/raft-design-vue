---
"@webees/raft-design-vue": patch
---

`VirtualList.scrollTo` honours its documented `debounce` flag again: by default
it scrolls only as far as needed to reveal the row, and `debounce: false` jumps
to the aligned position. Fixes the option being declared but never read.
