# ADR 0001: Pin upstream and sync canonical inputs

**English** | [简体中文](../../zh/adr/0001-upstream-sync.md)

- Status: accepted
- Date: 2026-11-17

## Context

The upstream project is a React application and component library with design
tokens, themes, documentation and 100+ components. A fork-and-merge strategy
does not work for a framework rewrite: Vue files have no common ancestor with
upstream TSX.

Upstream changes that matter to this port are concentrated in a small set of
canonical inputs: `tokens.json`, `themes.json`, generated foundations, theme
CSS and the design/component Markdown. Component source changes are reference
material, not merge candidates.

## Decision

1. Pin upstream to an exact commit in `tooling/upstream/upstream.lock.json`.
2. Vendor only canonical inputs into this repository: design docs, tokens,
   themes, fonts and the upstream Tailwind theme/utility CSS.
3. Generate `foundation.css` and `themes.css` locally from the pinned JSON so
   the output is reproducible and auditable.
4. Keep a component manifest (`tooling/upstream/component-manifest.json`) with
   `ported`, `planned` and `not-applicable` statuses.
5. `check:parity` fails when upstream adds a component that is absent from the
   manifest. This forces a conscious port/no-port decision.
6. A scheduled workflow detects drift and opens a PR with the sync diff.

## Consequences

- Upstream updates are explicit, reviewable pull requests.
- There is no long-lived merge conflict surface with React code.
- Ports can lag upstream; the parity report makes the gap visible.
- Synced files must never be edited by hand; CI and review enforce this.
