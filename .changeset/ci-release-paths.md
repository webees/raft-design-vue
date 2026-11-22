---
"@webees/raft-design-vue": patch
---

Do not create PR CI runs for version-only release changes. Changesets PRs only
touch `packages/ui/package.json`, `packages/ui/CHANGELOG.md` and consumed
changesets, and GitHub holds bot-authored runs at "action required"; the push
run on `main` verifies the identical tree. The `verify` job keeps a
`changeset-release/main` guard as a fallback.
