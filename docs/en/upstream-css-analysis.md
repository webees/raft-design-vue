# Raft CSS and raft-ui reuse analysis

**English** | [简体中文](../zh/upstream-css-analysis.md)

Conclusion: `raft.build` and `app.raft.build` both use **Tailwind CSS v4** and
the same in-house "square sticker / neo-brutalist" visual language. `raft-ui`
is open source under MIT; the current package is `@botiverse/raft-ui` (the old
`raft-ui` package still installs) in `botiverse/raft-design`. A Vue project
cannot reuse the React components directly, but it can reuse the design
tokens, CSS foundation and design docs with the MIT notice preserved.

## Evidence

### Site artifacts

- `https://raft.build/assets/main-77yWH4V8.css` (~683 KB) contains
  `@layer properties|theme|base|components|utilities`, `--tw-*` variables and
  the `--color-brutal-*` palette — the fingerprint of compiled Tailwind v4.
- `https://app.raft.build/assets/app-shell-VN-s0t2L.css` (~589 KB) contains
  the same `--tw-*` variables, layers and Raft tokens; the app entry also loads
  `vendor-raft-ui-*.js`.
- Both sites self-host Space Grotesk and Space Mono WOFF2 files instead of
  requesting Google Fonts at runtime.

### Upstream repository

- `botiverse/raft-design`: MIT, default branch `main`, described as
  "guidelines, design tokens and raft-ui".
- `packages/ui/package.json`: `@botiverse/raft-ui@0.102.3`, MIT, depending on
  `@base-ui/react`, `class-variance-authority`, `tailwind-merge`,
  `lucide-react` and `@dnd-kit/*`.
- `npm raft-ui@0.6.0` points at `botiverse/rui`, which GitHub redirects (301)
  to `botiverse/raft-design`: the same project under its old name.
- `NOTICE.md` states that code is MIT while the Raft logo, Agent sprites,
  reaction artwork and other brand assets are not.
- Issues are welcome, but code contributions are limited to collaborators:
  open source in license, not an open contribution model.

## Design system

- **Framework**: Tailwind CSS v4 (CSS-first `@theme`, `@utility`, `@source`),
  no `tailwind.config.js`.
- **Tokens**: `tokens.json` generates `foundation.css` / `themes.css`. Colors
  use OKLCH; the semantic layer covers `layer-*`, `fill-*`, `foreground-*`,
  `line-*`, `selected`, `brand` and status colors. Themes switch through a class
  or attribute on the root element.
- **Type**: Space Grotesk for human text, Space Mono for machine text (IDs,
  timestamps, code, shortcuts); Chinese falls back to PingFang SC / Source Han
  Sans.
- **Shape**: the square is the brand primitive — avatars, badges, steps and
  skeletons are square stickers. Only switches, radios and drag handles are
  fully round.
- **Lines and shadows**: 1px hairlines; 1.5px ink borders on controls, fields
  and stickers; stickers use hard offset shadows, not large blurred ones.
- **Layering**: canvas → card → popover get progressively lighter; light mode
  separates with lines, dark mode with luminance. Toasts and tooltips use the
  neutral `layer-hud`, not brand colors.
- **Color meaning**: yellow means "you / selected", pink is todo, cyan is the
  current item, orange is interruption, red is irreversible.
- **Component base**: React uses Base UI for accessibility behavior plus CVA
  and tailwind-merge for styling; the Vue port maps this to Reka UI.

## What can be reused

Directly reusable:

- Token and theme definitions from `tokens.json`, `foundation.css` and
  `themes.css` (keep the MIT notice).
- Tailwind v4 utility conventions, semantic color names, type and spacing
  scale.
- Interaction, accessibility and state specifications from the design docs.

Not reusable:

- React component source from `@botiverse/raft-ui` (runtime and JSX are bound
  to React/Base UI).
- Raft logo, Agent sprites, reaction artwork and other brand assets.
- Private or unpublished upstream fonts and images.

How this repository handles it:

- Components are rewritten with Vue 3 + Reka UI instead of forking React code.
- Tokens and base CSS are synced by `tooling/upstream` with the source commit
  and a SHA-256 manifest, so upstream changes stay traceable.
- Brand assets never enter the published package; `NOTICE.md` records the
  upstream MIT license and the asset exception.

## Risks

- Upstream moves fast (currently 0.102.x); component APIs and tokens can
  change, so keep running `bun run sync:upstream` and the parity manifest.
- Tailwind v4 is a hard requirement; consumers on v3 need a separate
  compatibility build.
- Copying upstream CSS requires keeping the MIT notice; brand assets are not
  MIT.
- `raft-ui` is open source at the license level, not an open contribution
  project.
