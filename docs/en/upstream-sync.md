# Upstream sync

**English** | [简体中文](../zh/upstream-sync.md)

## Pinned upstream

`tooling/upstream/upstream.lock.json` records the exact commit this port is
measured against. Today: `botiverse/raft-design@c7045d63`. Every synced file
also stores its SHA-256, so partial edits are detectable.

## What is synced

Synced inputs are copied verbatim and must never be hand-edited:

- `design/**` Markdown (upstream documentation, English only)
- `tokens.json`, `themes.json` and the generated CSS
- font files and the Tailwind foundation
- upstream `world.css`, `graphics.css` and other global styles

Hand-written code is never overwritten: `packages/ui/src/components/**`,
`apps/docs/**`, `tooling/**` and all tests are owned by this repository.

## Commands

```bash
bun run fetch:upstream   # materialize the pinned snapshot only (CI uses this)
bun run sync:upstream    # fetch the pinned commit (or latest) and update inputs
bun run check:upstream   # report drift against upstream main
bun run check:parity     # component coverage: 102 / 102, no untracked local dirs
bun run check:audit      # recipe, class-token and prop parity against the snapshot
```

## Update procedure

1. `bun run sync:upstream` — update the lockfile, `design/`, tokens, themes and
   synced CSS.
2. Review the generated diff. Regenerate tokens with `bun run build:tokens`.
3. Run `bun run verify`.
4. Port any new upstream component or recipe the checks flag.
5. Add a changeset for user-visible changes and commit with `-s`.

`check:parity` fails when an upstream component directory exists without a
local Vue counterpart (and when a local component is not in the manifest).
`check:audit` compares recipe class strings and prop tables; it distinguishes
intentional differences from drift.

## Known differences (intentional)

- Reka UI replaces Base UI as the headless layer.
- Lucide Vue Next replaces Lucide React for icons.
- Fonts are bundled locally instead of loaded from a CDN.
- Raft logo, Agent sprites and reaction artwork are not shipped.
- `Dialog` draws a phone sheet inside a Reka `DialogContent`, which has no
  `Portal` boundary equivalent to Base UI's `Popup.sheet`. Sheet positioning
  uses `data-sheet` styles, so fixed-position children align with the card
  rather than the sheet frame.
- `DialogNav` maps upstream's `render` prop to `ScrollArea`'s `as`.
- Drag placeholders use `DropPlaceholder` (`SortableTabs`, `DraggedSlot`)
  instead of upstream's `PLACE_STYLE`, so animation frames differ slightly.
- Reka portals expose `--reka-*` variables; `Popover`, `Tooltip`,
  `PreviewCard`, `Select` and `Combobox` alias them to upstream's
  `--available-width/-height`, `--anchor-width` and `--transform-origin`.
- Reka measures `CollapsibleContent` as `--reka-collapsible-content-height`;
  `MessageActionCard` aliases it to `--collapsible-panel-height` and keeps the
  upstream transition, including keyframes for `starting-style`/`ending-style`.
- Base UI's `data-open`, `data-closed` and `data-panel-open` become Reka's
  `data-state="open|closed"`; recipes keep the upstream selector for string
  parity and add the `data-[state=...]` equivalent.
- `SelectContent` opens its own portal, so wrapping it in `SelectPortal` is
  valid but optional.
- `ComboboxList` renders inside a scroll-area frame with absolute gutters;
  `ComboboxContent` aliases Reka's `--reka-combobox-content-*` variables.
- Frame popups use the same computed rect boundary as upstream. floating-ui
  accepts a rect at runtime; Reka's prop type only names elements.
- Dialogs and alert dialogs reset the sheet scope for their own children, so a
  dialog opened inside a sheet renders as a plain dialog, matching upstream's
  `DialogSheetReset`.

## Why not track `main` directly

A moving upstream makes visual diffs, declaration snapshots and prop tables
non-reproducible. Pinning gives every check a stable oracle; upgrading is an
explicit commit that updates the lockfile and the audit baseline together.
