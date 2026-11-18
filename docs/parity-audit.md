# Per-component parity audit

Every component under `packages/ui/src/components` is checked on four axes.
The checks are scriptable, so a new upstream snapshot is audited the same way.

## How to run

```bash
bun run tooling/upstream/src/audit.ts          # exports, data-slots, literal classes
bun run tooling/upstream/src/audit-recipes.ts  # recipe class-string multisets
bun run check:parity                           # 102/102 directories present
bun run check:api                              # upstream types resolvable
```

`audit.ts` reports per-component findings as `missingSlots`, `missingExports`,
`missingClasses` and `missingProps`. `--json` prints the machine-readable form.

## What counts as a difference

Only three kinds of divergence are accepted:

1. **Headless attribute names.** Reka UI exposes `data-state="open|checked|on"`
   where Base UI uses `data-open`, `data-checked`, `data-pressed`. Recipes keep
   the upstream selector and add the Reka equivalent, so behaviour and string
   parity both hold.
2. **CSS variables.** Reka publishes `--reka-*-available-width/height` and
   `--reka-*-transform-origin`; components alias them to the upstream
   `--available-*` / `--transform-origin` names at the component boundary, so
   recipes stay byte-comparable.
3. **Composition-only helpers.** Reka merges the positioner and popup into one
   `*Content` component (`ComboboxContent`, `SelectContent`). Where upstream
   splits them, the Vue port applies the positioner class to the outer element
   and the popup class to the inner `data-slot` element.

Anything else is a defect: a missing export, a missing `data-slot`, an invalid
utility (a token the theme never generated), or a recipe string that drifted.

## Findings fixed in this pass

| Component | Defect | Fix |
| --- | --- | --- |
| `context-menu` | recipe used `rounded-popup`, `shadow-popover`, `bg-fill-hover`, none of which exist in the generated theme; slot names were stale | rebuilt from the current upstream recipe (`rounded-container`, `shadow-float`, `ring-line-seam`, `min-h-option`), added submenu indicator |
| `dropdown-menu` | `dropdown-menu-sub-trigger`, `-sub-popup`, `-radio-label` names; submenu trigger had no chevron | upstream `data-slot` names, `submenuTrigger` slot, indicator span |
| `combobox` | list had no scroll-area frame/gutters; `ComboboxPopup` emitted `combobox-popup`; content used undefined `--available-*` vars | `combobox-list-frame` + `ScrollAreaGutters`, `combobox-content`, Reka-variable aliases |
| `select` | viewport had no frame/gutters; `SelectValue` had no fit sizer; `SelectContent` did not portal; `SelectPortal` was a no-op | frame + gutters, `SelectValueSizer` + overflow title, internal portal |
| `choice-list` | simplified API (`groups[].items`, boolean `search`), no pinning, no subgrid layout, no primitive marks | rewritten to upstream API (`items` + `groups`, `search="auto|always"`, pin snapshot, subgrid rows/actions, Checkbox/RadioGroup marks, CutLine titles, status line) |
| `composer` | attachments scroller measured edges by hand, nav buttons used the wrong variant | uses `ScrollArea` (`horizontal`, `small`, `scroll`, `contain`) with `composerAttachment` classes |
| `tooltip` | text nodes were dropped when partitioning a leading icon | only comments are filtered; text stays in the body |
| `form-section` | no `status` prop, no `-title`/`-status`/`-description` slots | added `status` badge and slots |
| `preview-card` | trigger and portal emitted no `data-slot` | upstream names added |
| `drag` | lift had no portal wrapper | `drag-lift-portal` (`contents`, `dir`) |
| `dialog` | commit slot was `dialog-sheet-commit` | upstream `dialog-commit-slot` |
| `selection-toolbar` | action label had no slot | `selection-toolbar-action-label` |

## Verified clean

`activity-inbox`, `alert-dialog`, `announcement-dialog`, `app-link-card`,
`app-rail`, `app-shell`, `avatar`, `badge`, `banner`, `button`, `card`,
`checkbox`, `coach-mark`, `code-block`, `combobox-select`, `comment`,
`conversation-panel`, `date-divider`, `description-list`, `dialog`, `drawer`,
`field`, `file-row`, `hover-card`, `inbox-item`, `input`, `input-group`, `kbd`,
`lightbox`, `list-row`, `menu`, `message-action-card`, `message-attachment`,
`message-embed`, `message-forwarded-bundle`, `message-item`, `message-list`,
`message-quoted-preview`, `mobile-nav`, `notification-center`, `overlay-layer`,
`panel`, `picker-trigger-button`, `popover`, `preview-card`, `radio-group`,
`scroll-area`, `search`, `segmented-control`, `selection-toolbar`, `sheet`,
`sidebar`, `spinner`, `split-button`, `status`, `steps`, `switch`, `system-message`,
`table`, `tabs`, `task-board`, `task-dnd`, `task-list`, `tasks`, `text`,
`text-link`, `text-selection-toolbar`, `textarea`, `thread-panel`, `timeline`,
`toast`, `toggle-group`, `tooltip`, `virtual-list`, `web-top-bar`,
`workspace-button`.

## Round six: string-parity pass

After normalising attribute spelling (`data-x` ⇄ `data-[x]`), CSS variable
aliases and grouped class strings, both audits now report **zero missing
slots, exports or class tokens**. The remaining recipe diffs are local-only
selectors (`data-[state=...]`, `--reka-*` fallbacks, `starting:`); they are
listed as intentional differences, not gaps.

Real defects fixed while auditing file by file:

| Component / file | Defect | Fix |
| --- | --- | --- |
| `InlineCode` | missing `appearance="message"`; default size was `0.9em` with no baseline padding | upstream `0.875em`, `wrap-anywhere`, full message variant |
| `Ellipsis` | expanded/lines states used a single `truncate`; no print rules | upstream compound variants (truncate, `wrap-anywhere`, `line-clamp`, print overrides) |
| `ComboboxInput` | input had no owner variants, so chips/control inputs were unstyled | `inputOwner` (group/control) variants + provide/inject context |
| `ComposerToolbarLabel` | rendered `<span>` with caption styling; upstream renders a `<label>` | `<label>` with bar-button height and disabled affordances |
| `SegmentedControl` | upstream `data-overflowing`, `data-checked`, `data-fit-label` rules absent | attributes now drive the same recipes, with Reka state aliases |
| `InboxItemTrigger` | `data-slot="inbox-item-trigger"` while the recipe targets `inbox-item-open`; was a `span` with `role=button` | `<button>` with `data-slot="inbox-item-open"` + disabled context |
| `ListRowSkeleton` | not ported (upstream `./wip`) | full Vue port + tests |
| `DropdownMenuLinkItem` | not ported (upstream `./wip`) | link item with `current` indicator + `aria-current` |
| `SheetPopupBoundary` | not ported; sheet popups bounded by the viewport only | rect boundary + `useSheetPopupBoundary`, wired into every positioner and both sheet surfaces |
| `MessageActionCard` | hint label spacing rule missing; trigger lacked `data-panel-open` | upstream hint rule, `data-panel-open` attribute, `--collapsible-panel-height` alias |
| `Tabs` | sorting/drag cursor rules missing | `data-[sorting]`, `data-[reorderable]`, `data-[dragging-source]` classes |
| `TaskChip` | link/button hover and focus rules missing | upstream `[a,button]` overlay + focus ring |
| `CoachMark` | Escape outside the popup closed the tour | outside Escape is cancelled, matching upstream |

## Known limits

- Class strings are compared as multisets; ordering inside a recipe array is
  not significant for Tailwind, so reordering is not reported.
- Local-only Reka selectors are reported as `extra`; they are reviewed by hand
  against the intentional-differences list rather than auto-accepted.
