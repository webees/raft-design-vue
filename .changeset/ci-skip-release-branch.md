---
"@webees/raft-design-vue": patch
---

Skip the CI job on pull requests from `changeset-release/main`. The branch is
deleted moments after the admin merge, so the queued run finished with zero
jobs and a "workflow file issue" failure on every release. A skipped job still
satisfies the required check, and the push run on `main` verifies the merged
commit.
