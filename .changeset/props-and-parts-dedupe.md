---
"@webees/raft-design-vue": patch
---

Share the prop contracts between mirrored components (`Status`, status hosts,
menu items, item roots, drag elements, floating drag parts, table sort, scroll
area, disclosure roots) and the Primitive part factory. No public prop or
export changes; jscpd now reports no clone at the 10/70 threshold and only two
template-only pairs at 6/40.
