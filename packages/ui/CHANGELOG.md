# @webees/raft-design-vue

## 0.1.7

### Patch Changes

- f5eb918: `VirtualList.scrollTo` honours its documented `debounce` flag again: by default
  it scrolls only as far as needed to reveal the row, and `debounce: false` jumps
  to the aligned position. Fixes the option being declared but never read.

## 0.1.6

### Patch Changes

- 67e9fa0: Glide drag overlays into place with the upstream `DRAG_SETTLE` token: drops
  settle onto the droppable rect, cancels return to the origin, the animation is
  skipped under `prefers-reduced-motion`, and the internal keyboard drag path
  shares the same finish logic. The lifted copy is frozen for the duration of the
  glide, so callers that clear their active id on drop still animate real content.
  Also drop the duplicate `MessageReference` export so the message-item barrel
  exposes `MessageReferenceChip` only, matching upstream.

## 0.1.5

### Patch Changes

- e2ff63a: Forward caller attributes on `FormSection` and `WorkspaceButtonName`, drop dead props (`ToastProvider.class`, empty `withDefaults` wrappers), and align the Release workflow with `changesets/action@v2` input names so publishing runs again.
- 875a410: Run the test suite on the threads pool with bounded workers and a 20s timeout so jsdom-heavy files no longer flake on loaded machines.

## 0.1.4

### Patch Changes

- f4ab1f6: Remove `attrs.class` reads that were always `undefined` because `class` is a declared prop. Fixes `AppLinkCardBadge` dropping caller classes when no fill is set.
- 5f869ac: Trim internal-only type exports and drop the unused `SheetPopupBoundaryProps` alias; no runtime change.

## 0.1.3

### Patch Changes

- e949658: Collapse the duplicated `DragScope` and toolbar icon markup so `jscpd` reports
  zero clones at 6 lines / 40 tokens, and refresh the measured parity baseline
  (library 1928.0 kB raw / 293.5 kB gzip, 46,858 source lines).

## 0.1.2

### Patch Changes

- 39591a8: Fold the primitive part prop factory into `lib/part-props.ts` and drop the
  unused `ButtonSplitPart` experiment, so slot parts share one prop source of
  truth. Refresh the EN/ZH parity baseline with re-measured bundle, source and
  duplication numbers.

## 0.1.1

### Patch Changes

- 091dc08: Share the prop contracts between mirrored components (`Status`, status hosts,
  menu items, item roots, drag elements, floating drag parts, table sort, scroll
  area, disclosure roots) and the Primitive part factory. No public prop or
  export changes; jscpd now reports no clone at the 10/70 threshold and only two
  template-only pairs at 6/40.

## 0.1.0

### Minor Changes

- 67586ab: Complete the upstream Raft component surface: lightbox, comments, native drag,
  task drag-and-drop, composer, toast, search, notification center, mobile
  navigation and pull-to-refresh. Parity is now 102 / 102.
- 67586ab: First public alpha: Bun + Rsbuild + Vue 3 toolchain, 71 ported components,
  token/theme generation, shipped type declarations, documentation site, and
  upstream sync/parity tooling.

### Patch Changes

- faae9da: Remove the Vue runtime imports that the auto-import preset already provides
  from `.ts` modules and tests, so the build actually relies on the preset
  instead of shipping the same imports twice. Public type imports stay explicit.
- 7b3abb5: Trim the remaining shared boilerplate: every slot part that defaults to a
  container tag now declares its props through `asChildProps`, action buttons
  reuse `actionProps`, panel roots reuse `panelRootProps`, and the duplicate
  close icon moved to the shared Lucide glyph. Portal parts now forward caller
  attributes, and `DialogClose` renders the sheet-head action plus the desktop
  bar sizing used by upstream.
- 4211afb: `usePopupCollision` now mirrors upstream's six-argument contract
  (`collisionPadding`, `collisionBoundary`, `defaultPadding`, `container`, `gap`,
  `anchor`) and adds `useContentCollision` for positioner components.
  
  Popover, PreviewCard, DropdownMenu, Tooltip, Select, ContextMenu, Combobox,
  NotificationCenter and MobileNavServerPopover forward `collisionPadding`,
  `collisionBoundary`, `container` and `anchor` to the Reka positioner, keep the
  sheet boundary when no boundary is given, and read frame insets through
  `readFrameInsets` with inherited `direction` for RTL.
  
  `CoachMarkContent` drops the extra frame-inset wrapper and passes its
  `collisionPadding` straight to `PopoverContent`, matching upstream.
- 8f59c22: Continue the lean-core pass: reference chips, inbox parts and the task tree
  parts are built by one factory each, panel toggles and collapsible sections
  share their props and controlled state, both split-button halves share one
  props object, drag elements register through `useDragElement`, and the app
  shell trigger always renders `PanelAction`. Copy-paste clones measured by
  jscpd (10 lines / 70 tokens) are now zero.
- dadf119: Trim the implementation to a smaller core without changing the public surface:
  every drawer part now shares one recipe binding, the two slot factories are one,
  scroll gutters receive a single binding object, the logo components share one
  SVG root, controlled open/pressed state lives in `lib/use-controlled-state.ts`,
  and the split button, dropdown content, alert-dialog content and panel toggles
  no longer duplicate their plumbing. Dead exports were removed, and
  `SelectionToolbarMore` no longer drops the caller's `class`.
- 67586ab: Align deep component behaviour with upstream: dialog soft-keyboard lift and
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
  
  Round seven repairs the docs mirror: `sync:upstream` now rewrites every
  upstream-relative Markdown link into this repo's layout, drops anchors the
  target document cannot satisfy, and `check:docs-links` fails CI on any broken
  file or heading link. The docs viewer follows relative `.md` links in-app and
  emits GitHub-compatible heading ids, so cross-document anchors work. Toast
  components lost their last `any`, sharing the exported `ToastObject<ToastData>`
  type with the rest of the package.
- 8c9b0c5: Route the message footer and reaction parts through the shared `createSlotPart`
  factory, forward `as` from `PanelScrollViewport` to its scroll area, and record
  the refreshed source baseline.
- fc81a2c: Collapse duplicated component shells into shared factories: task/board sections,
  panel toggles, app-rail parts, text-link markers, submenu chevrons and the
  combobox/select scroll frame now have one implementation each, measured at zero
  copy-paste clones by jscpd (8 lines / 55 tokens).
  
  Portals render their marker and caller attributes on a `display: contents`
  wrapper inside the teleport, so `DialogPortal` and siblings no longer emit Vue's
  extraneous-attribute warning while keeping caller `class`/`data-*` forwarding.
  `VirtualList` accepts boolean slot content instead of failing prop validation,
  and `useComposerSuggestions` works headlessly without `useId`/`onBeforeUnmount`
  warnings.
- e672801: Render `TableScroll` as the upstream horizontal `ScrollArea` instead of a
  hand-written scroll `div`. Callers now get the scroll-area rails, sticky
  gutters, native attribute/ref forwarding and the horizontal-only overscroll
  behaviour, and the stray `table().scroll` slot is gone.
  
  Honour `NotificationCenterPopup`'s `initialFocus` (it was declared but never
  applied), drop the unused `TableSortButton.asChild` prop, apply
  `ScrollArea`'s `style` prop, and share the tabs UI context and overlay portal
  factories between their parts.
