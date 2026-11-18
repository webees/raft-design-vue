# @webees/raft-design-vue

Unofficial Vue 3 port of the [Raft Design System](https://github.com/botiverse/raft-design).
Not affiliated with Botiverse.

## Install

```bash
bun add @webees/raft-design-vue
```

```ts
import { Button, Card, Input } from "@webees/raft-design-vue";
import "@webees/raft-design-vue/styles.css";
```

Requires Vue 3.5+ and Tailwind CSS 4 if you extend the theme.

## Status

This package is pre-1.0. The component manifest in the repository tracks which
upstream components have been ported and verified. APIs may change between
minor releases until 1.0.

## Components

- Actions: `Button`, `TextLink`
- Display: `Badge`, `Card`, `Avatar`, `Kbd`, `Status`, `Progress`, `Spinner`,
  `Skeleton`, `Separator`, `Text`, `InlineCode`
- Forms: `Input`, `Label`, `Field`, `Checkbox`, `Switch`, `RadioGroup`,
  `Textarea`, `FormSection`, `InputGroup`, `SegmentedControl`
- Content: `CodeBlock`, `CopyableCode`, `Banner`, `EmptyState`, `Timeline`,
  `FilesPanel`
- Navigation: `Tabs`, `Steps`, `AppRail`
- Overlays: `Tooltip`, `Popover`, `DropdownMenu`, `Dialog`, `AlertDialog`
- Inputs: `Select`
- Data: `Table` (`TableScroll`, `TableSortableHead`), `DescriptionList`
- Layout: `Resizable` (`ResizableGroup`, `ResizablePanel`, `ResizableHandle`)
- Layout: `Panel` (`PanelHeader`, `PanelBody`, `PanelSection`, `PanelFooter`,
  panel actions, notices and scroll parts), `ConversationPanel`, `ProfilePanel`,
  `ThreadPanel`
- Tasks: `TasksPanel`, `TaskCard`, `TaskList` (`TaskSection`), `TaskBoard`
  (`TaskBoardColumn`), `TaskStatusBadge`, `TaskChip`, `TaskStatusIcon`,
  `TaskLoadingList`
- Message chrome: `MessageEmbed` (`MessageEmbedHeader`, `MessageEmbedContent`,
  `MessageEmbedFooter`), `SystemMessage` (`SystemMessageGroup`),
  `MessageReplies` (`MessageRepliesSummary`, `MessageRepliesItem`,
  `MessageRepliesItemSender`, `MessageRepliesItemContent`,
  `MessageRepliesItemTime`), `MessageItemTranslation*`,
  `TextSelectionToolbar`
- Markdown: `MarkdownHeading`, `MarkdownParagraph`, `MarkdownLink`,
  `MarkdownMark`, `MarkdownList`, `MarkdownOrderedList`, `MarkdownListItem`,
  `MarkdownBlockquote`, `MarkdownRule`, `MarkdownTableScroll`,
  `MarkdownTable`, `MarkdownTableRow`, `MarkdownHeaderCell`, `MarkdownCell`,
  `MarkdownImage`, `MarkdownInlineCode`, `MarkdownCheckbox`
- Files: `FilePreview`, `FilePreviewDocument`, `FilePreviewFile`,
  `FilePreviewCode`, `FilePreviewMedia`, `FilePreviewBadge`
- Overlays: `AnnouncementDialog` (content, body, header, label, title, picture,
  text, footer, action and secondary action)
- Hover: `PreviewCard` (`PreviewCardTrigger`, `PreviewCardContent`,
  `PreviewCardPopup`, `PreviewCardPortal`, `PreviewCardHeader`,
  `PreviewCardTitle`, `PreviewCardDescription`, `PreviewCardSeparator`,
  `PreviewCardBody`, `PreviewCardEyebrow`, `PreviewCardMeta`,
  `PreviewCardActions`, `PreviewCardFooter`, `PreviewCardArrow`)
- Tasks: `TaskCompletionControl`
- Frame: `WebTopBar` (`WebTopBarStart`, `WebTopBarCenter`, `WebTopBarEnd`)
- Lists: `ListRow` (`ListRowGroup`, `ListRowTitle`, `ListRowDescription`, ...)
- System: `IconTile`, `SaveStatus`, `ToggleGroup`, `Meter`, `FilterChip`,
  `KbdButton`, `WorkspaceButton`, `PickerTriggerButton`
- Identity: `RaftLogo`, `RaftWordmark`, `RaftLogoLockup`

### Overlays

```vue
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button variant="outline">Save</Button>
    </TooltipTrigger>
    <TooltipContent>Save changes <Kbd>⌘</Kbd><Kbd>S</Kbd></TooltipContent>
  </Tooltip>
</TooltipProvider>

<Popover>
  <PopoverTrigger as-child>
    <Button>Rename</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Rename project</PopoverTitle>
      <PopoverClose aria-label="Close">×</PopoverClose>
    </PopoverHeader>
    <PopoverBody>
      <PopoverDescription>Visible to everyone in the workspace.</PopoverDescription>
      <Input model-value="Raft" aria-label="Project name" />
    </PopoverBody>
    <PopoverActions>
      <Button variant="primary">Save</Button>
    </PopoverActions>
  </PopoverContent>
</Popover>

<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Copy link</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Overlay components are portalled and rely on Reka UI for focus management,
keyboard navigation and collision-aware positioning. The visual recipe still
comes from Raft's `layer-popover` / `layer-hud` surface tokens.

## License

MIT. See `LICENSE` and `NOTICE.md`. Raft brand assets are not included.
