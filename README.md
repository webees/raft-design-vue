# Raft Design Vue

> Unofficial Vue 3 port of the [Raft Design System](https://github.com/botiverse/raft-design).
> Not affiliated with Botiverse.

[![CI](https://github.com/webees/raft-design-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/webees/raft-design-vue/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-141111)](./LICENSE)

A source-faithful Vue 3 implementation of Raft's design language: warm paper
surfaces, yellow frames, hard 1.5px ink lines, restrained radii, Space Grotesk
and mono metadata. The port keeps upstream recipes and tokens instead of
inventing a new visual language.

## Stack

- **Runtime**: Vue 3.5, TypeScript, Reka UI primitives
- **Styling**: Tailwind CSS v4, tailwind-variants, tailwind-merge
- **Build**: Bun workspaces + Rslib (Rsbuild library mode), Vue SFC
- **Docs**: Rsbuild + Vue, upstream Markdown rendered at build time
- **Quality**: Vitest, Vue Test Utils, ESLint, Prettier, Changesets, GitHub Actions

## Quick start

```bash
bun install
bun run dev          # docs at http://localhost:3000
bun run build        # tokens + library + docs
bun run verify       # parity + docs links + lint + types + tests + build
```

Requirements: Bun >= 1.4, Node >= 22.

## Packages

| Package | Purpose |
| --- | --- |
| `packages/ui` | `@webees/raft-design-vue`, Vue components, tokens and CSS |
| `apps/docs` | Documentation and live component gallery |
| `tooling/upstream` | Upstream sync, lockfile, drift report and parity checks |

## Using the library

```bash
bun add @webees/raft-design-vue
```

```ts
import { Button, Card, CardHeader, CardTitle } from "@webees/raft-design-vue";
import "@webees/raft-design-vue/styles.css";
```

```vue
<Button variant="primary" size="md">Create</Button>
```

Set the theme on the document root:

```html
<html class="light" data-theme="boring">
```

`light` / `dark` select the mode. `data-theme` selects one of the upstream
themes (`boring`, `bots`, `critters`, `space`, `desk`, `food`, `quest`,
`weather`, `plants`, `spooky`). Omit `data-theme` for the default frame.

## Upstream updates

The upstream commit is pinned in `tooling/upstream/upstream.lock.json`. Synced
inputs live in:

- `design/` — upstream design documentation (Markdown only)
- `packages/ui/src/tokens.json` — design tokens
- `packages/ui/src/themes.json` — theme definitions
- `packages/ui/src/upstream-styles.css` — upstream Tailwind theme and utilities
- `packages/ui/src/fonts/` — upstream font files

```bash
bun run sync:upstream     # fetch pinned/latest upstream and update synced inputs
bun run check:upstream    # detect drift from upstream main
bun run check:parity      # fail if upstream adds an untracked component
```

Sync never overwrites hand-written Vue components. It reports changed tokens,
themes, docs and newly added upstream components, then CI opens a pull request
with the generated diff. See [`docs/adr/0001-upstream-sync.md`](./docs/adr/0001-upstream-sync.md).

## Status

`0.1.0` is the first public alpha. `check:parity` is the source of truth for
coverage: every upstream component is either implemented, explicitly planned,
or marked not applicable. Visual parity for implemented components is enforced
by recipe tests and the docs gallery.

Ported (102 / 102):

- Actions: `Button`, `TextLink`
- Display: `Badge`, `Card`, `Avatar`, `Kbd`, `Status`, `Progress`, `Spinner`,
  `Skeleton`, `Separator`, `Text`, `InlineCode`
- Forms: `Input`, `Label`, `Field`, `Checkbox`, `Switch`, `RadioGroup`,
  `Textarea`, `FormSection`, `InputGroup`, `SegmentedControl`
- Content: `CodeBlock`, `CopyableCode`, `Banner`, `EmptyState`, `Timeline`
- Navigation: `Tabs`, `Steps`, `AppRail`
- Overlays: `Tooltip`, `Popover`, `DropdownMenu`, `Dialog`, `AlertDialog`
- Inputs: `Select`
- Data: `Table` (`TableScroll`, sortable heads), `DescriptionList`
- Layout: `Resizable` (`Group`, `Panel`, `Handle`), `ScrollArea`
- Lists: `ListRow` (`Group`, `Icon`, `Body`, `Top`, `Bottom`, `Title`,
  `Subtitle`, `Description`, `Meta`, `Value`, `Chevron`)
- Content: `Files` (`FilesPanel`, `FilesViewport`, `FilesList`, `FileRow`,
  `FileRowOpen`, `FileThumbnail`, `FileImage`, `FileName`, `FileMeta`)
- Layout: `Panel` (`PanelHeaderRoot`, `PanelHeader`, `PanelBody`, `PanelSection`,
  `PanelFooter`, actions, notices and scroll parts)
- Layout: `ConversationPanel`, `ProfilePanel`, `ThreadPanel`
- Tasks: `TasksPanel`, `TaskCard`, `TaskList` (`TaskSection`), `TaskBoard`
  (`TaskBoardColumn`), status chips and loading rows
- Message chrome: `MessageEmbed`, `SystemMessage`, `TextSelectionToolbar`
- Content: `Markdown` (`MarkdownHeading`, `MarkdownParagraph`, `MarkdownLink`,
  `MarkdownMark`, lists, blockquote, table parts, image, inline code, checkbox),
  `FilePreview` (`FilePreviewDocument`, `FilePreviewFile`, `FilePreviewCode`,
  `FilePreviewMedia`, `FilePreviewBadge`)
- Messages: `MessageReplies` (`Summary`, `Item`, sender, content, time),
  `MessageItemTranslation*` (original, label, status, progress, actions)
- Tasks: `TaskCompletionControl`
- Overlays: `AnnouncementDialog` (`Body`, `Header`, `Label`, `Title`,
  `Picture`, `Text`, `Footer`, `Action`, `SecondaryAction`)
- Hover: `PreviewCard` (`Trigger`, `Content`, `Popup`, `Portal`, `Header`,
  `Title`, `Description`, `Separator`, `Body`, `Eyebrow`, `Meta`, `Actions`,
  `Footer`, `Arrow`)
- Frame: `WebTopBar` (`WebTopBarStart`, `WebTopBarCenter`, `WebTopBarEnd`)
- System: `IconTile`, `SaveStatus`, `ToggleGroup`, `Meter`, `FilterChip`,
  `KbdButton`, `WorkspaceButton`, `PickerTriggerButton`
- Identity: `RaftLogo`, `RaftWordmark`, `RaftLogoLockup`
- Composer: `Composer` (`ComposerRoot`, `ComposerInput`, `ComposerToolbar`,
  `ComposerActions`, `ComposerMeta`, `ComposerSubmit`, `ComposerIconButton`,
  attachments, drop overlay and suggestion list)
- Comments: `CommentMargin`, `CommentMarginItem`, `CommentCard`,
  `CommentEntry`, `CommentMarker` and `useCommentMarginFits`
- Drag: `DragScope`, `Draggable`, `Droppable`, `DragLift`, `DropPlaceholder`,
  `DragLiveRegion`, `useDragLists`, `useDragSensors` and announcements
- Tasks: `TaskDndProvider`, `TaskDraggable`, `TaskDropZone`,
  `TaskDropPlaceholder`, `TaskDragOverlay`
- Overlays: `Lightbox` (`Trigger`, `Content`, `Header`, `Body`, `Stage`,
  `Media`, `Thumbnail`, `NavigationButton`, `Close`), `Toast` (`Provider`,
  `Viewport`, `Root`, actions, progress), `NotificationCenter`
- Navigation: `MobileNav` (`Root`, `Item`, `Label`, server popover and rows)
- Search: `SearchTrigger`, `SearchShellRoot`, `SearchShellViewport`, message
  and thread results
- Gestures: `PullToRefresh` (`Indicator`, `MaterialProgress`,
  `usePullToRefresh`)

`tooling/upstream/component-manifest.json` tracks every upstream component;
`check:parity` reports 102 / 102 ported. `bun run verify` fails if a local
component is not represented in the manifest or a recipe drifts.

Known differences from upstream, all intentional:

- Reka UI replaces Base UI as the headless layer.
- Lucide Vue Next replaces Lucide React for icons.
- Fonts are bundled locally instead of loaded from a CDN.
- Raft logo, Agent sprites and reaction artwork are not shipped.
- `Dialog` draws a phone sheet inside a Reka `DialogContent`, which has no
  `Portal` boundary of Base UI's `Popup.sheet`. Sheet positioning is done with
  `data-sheet` styles instead of a portal-level sheet box, so the popup's
  fixed-position children align with the card rather than the sheet frame.
- `DialogNav` maps upstream's `render` prop to `ScrollArea`'s `as`.
- Drag placeholders use `DropPlaceholder` (`SortableTabs`, `DraggedSlot`)
  instead of upstream's `PLACE_STYLE`, so animation start/end frames differ
  slightly from Base UI's placeholder.
- Reka portals expose `--reka-*` variables; `Popover`, `Tooltip`,
  `PreviewCard`, `Select` and `Combobox` alias them to upstream's
  `--available-width/-height`, `--anchor-width` and `--transform-origin`
  names, so the upstream recipes apply verbatim.
- Reka measures a `CollapsibleContent` height as
  `--reka-collapsible-content-height`; `MessageActionCard` aliases it to
  `--collapsible-panel-height` and keeps the upstream height transition, with
  keyframes covering the `starting-style`/`ending-style` attributes Reka does
  not emit.
- Base UI's `data-open`, `data-closed` and `data-panel-open` attributes become
  `data-state="open|closed"` under Reka; affected recipes keep the upstream
  selector for string parity and add the equivalent `data-[state=...]` rule.
- `SelectContent` opens its own portal (upstream does too), so wrapping it in
  `SelectPortal` remains valid but is not required.
- `ComboboxList` renders inside a scroll-area frame with absolute gutters, as
  upstream does; `ComboboxContent` aliases Reka's
  `--reka-combobox-content-*` variables to upstream's `--available-*` names.
- Frame popups use the same computed rect boundary as upstream; floating-ui
  accepts the rect at runtime, while Reka's prop type only names elements.
- Dialogs and alert dialogs reset the sheet scope for their own children, so a
  dialog opened from inside a sheet renders as a plain dialog, as upstream's
  `DialogSheetReset` does.

## License and attribution

MIT. Upstream Raft Design System is MIT licensed, copyright Botiverse.
Brand artwork, logos and Agent sprites are excluded. See `NOTICE.md`.
