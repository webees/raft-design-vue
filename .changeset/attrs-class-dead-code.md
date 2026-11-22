---
"@webees/raft-design-vue": patch
---

Remove `attrs.class` reads that were always `undefined` because `class` is a declared prop. Fixes `AppLinkCardBadge` dropping caller classes when no fill is set.
