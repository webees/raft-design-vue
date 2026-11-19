---
"@webees/raft-design-vue": patch
---

Remove the Vue runtime imports that the auto-import preset already provides
from `.ts` modules and tests, so the build actually relies on the preset
instead of shipping the same imports twice. Public type imports stay explicit.
