---
"@webees/raft-design-vue": patch
---

Align deep component behaviour with upstream: dialog soft-keyboard lift and
`DialogBody` scroll-area mode, phone sheet header order, `InboxItemSkeleton`
and its list, `MessageActionCard` collapse animation, `FilesViewport` on
`ScrollArea`, and `ComboboxSelect` positioning, phone keyboard room and
keyboard scrolling. Fix uncontrolled `open` state in `ComboboxSelect`, honour
caller `data-slot` overrides on composed parts, and guard Escape from reopening
the list.

Round two: tap activation for navigation controls (tabs, segmented control,
toggle group, mobile nav, sheet back), dialogs resetting the phone-sheet scope
for their children, frame-inset-aware popup collision padding, caller `class`
applied once on composed parts, `ScrollArea`'s `onScroll` forwarded to its
scroller, and dead props removed.

Round three: `CoachMark` now runs a full stop — held Located wash, focus on
Next, the tour Tab order, and Esc only dismissing from inside the bubble;
`OverlayLayer` tracks the modal stack so nested dialogs, sheets and lightboxes
pick their scrim from context instead of an explicit prop; and a second pass of
composed parts (`DropdownMenu*`, `ContextMenu*`, sidebar sections, selection
toolbar) no longer renders the caller's `class` twice.

Round four: file-by-file audit with two new tools
(`tooling/upstream/src/audit.ts`, `audit-recipes.ts`). `ChoiceList` was rewritten
to upstream's API and behaviour (flat `items` + `groups`, `search="auto|always"`,
pinned selected rows, subgrid section/action layout, `Checkbox`/`RadioGroup`
marks, cut-line titles, empty/no-match/status). `ComboboxList` and
`SelectViewport` now use the scroll-area frame with absolute gutters.
`SelectValue` regained its fit sizer and `SelectContent` portals itself.
`ContextMenu` was rebuilt on the current recipe (`rounded-container`,
`shadow-float`, `ring-line-seam`) instead of tokens the theme never generated.
`ComposerAttachmentsScrollArea` uses `ScrollArea`. `TooltipContent` keeps text
nodes when partitioning leading icons. `FormSection` gained `status`, and
`PreviewCard`/`Dialog`/`SelectionToolbar`/`ContextMenu`/`DropdownMenu` parts
now carry upstream `data-slot` names.

Round five: file-by-file parity pass restored `AlertDialog` action/cancel
slot names and caller attribute forwarding, `ToastAction` caller slot overrides,
`SidebarItemThreadCount` including its accessible thread label, the upstream
`TextLink` external/download marker metrics, and a Reka-safe
`SegmentedControlItem` tooltip that preserves the item's checked state.
`PreviewCardContent` and `MessageActionCardStatus` now react to prop changes;
`SelectionToolbarAction` no longer inherits caller classes twice.

Round six closes the last deep parity gaps: frame popups now use the upstream
rect collision boundary as well as padding, and `VirtualList` uses one shared
ResizeObserver delegate that batches callbacks after a browser entry batch.
