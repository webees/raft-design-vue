<script setup lang="ts">
import { ref } from "vue";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Banner,
  BannerAction,
  BannerClose,
  BannerDescription,
  BannerTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CodeBlock,
  CodeBlockAction,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockPre,
  CodeBlockTitle,
  CopyableCode,
  CopyableCodeAction,
  CopyableCodeRoot,
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogFooterActions,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FilterChip,
  FilterChipLabel,
  FilterChipRemove,
  FormSection,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupAddonText,
  InputGroupInput,
  InlineCode,
  IconTile,
  Kbd,
  KbdButton,
  KbdButtonPlaceholder,
  Label,
  ListRow,
  ListRowBody,
  ListRowChevron,
  ListRowDescription,
  ListRowGroup,
  ListRowIcon,
  ListRowMeta,
  ListRowTitle,
  ListRowTop,
  Meter,
  PickerTriggerButton,
  MeterHeader,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  OtterIndicator,
  Progress,
  Popover,
  PopoverActions,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  RaftLogo,
  RaftLogoLockup,
  RaftWordmark,
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
  ScrollArea,
  ScrollAreaTextarea,
  SaveStatus,
  SegmentedControl,
  SegmentedControlCount,
  SegmentedControlItem,
  SegmentedControlLabel,
  SaveStatusError,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Status,
  Step,
  Steps,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableScroll,
  TableSortableHead,
  TaskBoardColumn,
  TaskBoardColumnHeading,
  TaskBoardColumnItems,
  TaskBoardColumnPanel,
  TaskBoardColumnTrigger,
  TaskCard,
  TaskCardBody,
  TaskCardChannel,
  TaskCardMeta,
  TaskCardNumber,
  TaskCardRow,
  TaskCardStatus,
  TaskCardTitle,
  TaskChip,
  TaskListRoot,
  TaskLoadingList,
  TaskLoadingRow,
  TaskSection,
  TaskSectionCount,
  TaskSectionHeading,
  TaskSectionPanel,
  TaskSectionTrigger,
  TaskStatusBadge,
  TasksPanelRoot,
  TasksPanelToolbar,
  TasksPanelToolbarFilters,
  TasksPanelToolbarGroup,
  TasksPanelToolbarLabel,
  TasksPanelToolbarNewTask,
  TasksPanelToolbarView,
  TasksPanelViewport,
  MessageEmbed,
  MessageEmbedContent,
  MessageEmbedFooter,
  MessageEmbedHeader,
  MarkdownBlockquote,
  MarkdownCell,
  MarkdownCheckbox,
  MarkdownHeaderCell,
  MarkdownHeading,
  MarkdownInlineCode,
  MarkdownLink,
  MarkdownList,
  MarkdownListItem,
  MarkdownMark,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownRule,
  MarkdownTable,
  MarkdownTableRow,
  MarkdownTableScroll,
  PreviewCard,
  PreviewCardActions,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardFooter,
  PreviewCardHeader,
  PreviewCardMeta,
  PreviewCardTitle,
  PreviewCardTrigger,
  SystemMessage,
  SystemMessageContent,
  SystemMessageGroup,
  SystemMessageGroupChevron,
  SystemMessageGroupDisclosure,
  SystemMessageGroupHeader,
  SystemMessageGroupPanel,
  SystemMessageGroupSummary,
  SystemMessageTime,
  TextSelectionToolbar,
  TextSelectionToolbarButton,
  TextSelectionToolbarSeparator,
  Textarea,
  Text,
  TextLink,
  TextLinkExternalIcon,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToggleGroup,
  ToggleGroupItem,
  WorkspaceButton,
  WorkspaceButtonName,
  AppRailFooter,
  AppRailHeader,
  AppRailItem,
  AppRailItemBadge,
  AppRailItemIcon,
  AppRailNav,
  AppRailRoot,
  FileAction,
  FileActions,
  FileContent,
  FileImage,
  FileMeta,
  FileMetaItem,
  FileName,
  FileRow,
  FileRowOpen,
  FilesList,
  FilesPanel,
  FilesViewport,
  FileThumbnail,
  Panel,
  PanelAction,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderIcon,
  PanelHeading,
  PanelMeta,
  PanelScrollContent,
  PanelScrollViewport,
  PanelSection,
  PanelStatus,
  PanelTitle,
  ConversationPanelBody,
  ConversationPanelContent,
  ConversationPanelEmptyState,
  ConversationPanelEmptyStateBrand,
  ConversationPanelEmptyStateBrandMark,
  ConversationPanelFooter,
  ConversationPanelRoot,
  ConversationPanelTabs,
  ProfilePanel,
  ProfilePanelBody,
  ProfilePanelHeader,
  ProfilePanelHeaderContent,
  ProfilePanelSection,
  ThreadPanelBody,
  ThreadPanelContent,
  ThreadPanelFooter,
  ThreadPanelHeader,
  ThreadPanelOriginalMessage,
  ThreadPanelReplyCount,
  ThreadPanelReplySummary,
  ThreadPanelRoot,
  ThreadPanelTitle,
  ThreadPanelTitleMeta,
  Lightbox,
  LightboxBody,
  LightboxClose,
  LightboxContent,
  LightboxHeader,
  LightboxMedia,
  LightboxStage,
  LightboxTitle,
  LightboxTrigger,
  CommentCard,
  CommentCardMeta,
  CommentEntry,
  CommentEntryAuthor,
  CommentEntryBody,
  CommentEntryHeader,
  CommentMargin,
  CommentMarginItem,
  CommentMarker,
  Composer,
  ComposerInput,
  ComposerSubmit,
  ComposerToolbar,
  TaskDndProvider,
  TaskDraggable,
  TaskDropPlaceholder,
  TaskDropZone,
} from "@webees/raft-design-vue";

const checked = ref(true);
const indeterminate = ref<boolean | "indeterminate">("indeterminate");
const notify = ref(true);
const productUpdates = ref(true);
const plan = ref("pro");
const email = ref("");
const submitted = ref(false);
const emailInvalid = ref(false);
const showBanner = ref(true);
const layout = ref("grid");
const tab = ref("overview");
const model = ref("balanced");
const dialogOpen = ref(false);
const tableSort = ref<"ascending" | "descending">("ascending");
const destructiveOpen = ref(false);
const segmentedView = ref("grid");
const stepIndex = ref(2);

const buttonVariants = [
  "primary",
  "default",
  "outline",
  "ghost",
  "danger",
  "success",
  "warning",
  "information",
  "muted",
  "on-frame",
] as const;

function submit() {
  submitted.value = true;
  emailInvalid.value = email.value.trim().length === 0;
}
</script>

<template>
  <section class="docs-section">
    <h2 class="docs-section-title">Button <span>16 variants × 9 sizes</span></h2>
    <p class="docs-section-copy">
      贴纸按钮保留上游的 1.5px 墨线、硬阴影禁用态、加载态与
      <code class="docs-mono">on-frame</code> 高度覆盖。
    </p>
    <div class="docs-row">
      <Button
        v-for="variant in buttonVariants"
        :key="variant"
        :variant="variant"
        :size="variant === 'on-frame' ? 'md' : 'md'"
      >
        {{ variant }}
      </Button>
    </div>
    <div class="docs-row" style="margin-top: 14px">
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" size="xl">Extra large</Button>
      <Button variant="default" size="icon-md" aria-label="Add">+</Button>
      <Button variant="primary" loading>Saving</Button>
      <Button variant="default" disabled>Disabled</Button>
      <Button variant="danger-outline">Delete</Button>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Table <span>sortable · scrollable</span></h2>
    <p class="docs-section-copy">
      Native table semantics with hairline rows, hover feedback, and a keyboard-reachable
      horizontal scroll region.
    </p>
    <div class="docs-panel">
      <TableScroll>
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortableHead
                :sort="tableSort"
                class="w-1/2"
                @sort-change="tableSort = $event"
              >
                Member
              </TableSortableHead>
              <TableHead align="right">Seats</TableHead>
              <TableHead align="right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada Lovelace</TableCell>
              <TableCell align="right">12</TableCell>
              <TableCell align="right">Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grace Hopper</TableCell>
              <TableCell align="right">8</TableCell>
              <TableCell align="right">Invited</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableScroll>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Badge & Status <span>solid · soft · outline</span></h2>
    <div class="docs-row">
      <Badge variant="default">3</Badge>
      <Badge variant="primary">New</Badge>
      <Badge variant="accent">beta</Badge>
      <Badge variant="information">Info</Badge>
      <Badge variant="success">Done</Badge>
      <Badge variant="warning">Soon</Badge>
      <Badge variant="danger">Blocked</Badge>
      <Badge appearance="soft" variant="danger">soft danger</Badge>
      <Badge appearance="outline" variant="information">outline info</Badge>
      <Badge.Experimental />
    </div>
    <div class="docs-row" style="margin-top: 16px">
      <Status presence="online" />
      <Status presence="busy" />
      <Status presence="error" />
      <Status presence="offline" />
      <Status presence="external" />
      <Spinner />
      <Spinner size="md" />
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Card <span>default · option · inset</span></h2>
    <div class="docs-grid">
      <Card>
        <CardHeader>
          <CardTitle>Default card</CardTitle>
          <CardDescription>Header, content and footer slots.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text.Sans size="small">
            The card recipe is copied from upstream: hairline border, container radius,
            no shadow.
          </Text.Sans>
        </CardContent>
        <CardFooter>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span>Quick actions</span>
        </CardFooter>
      </Card>

      <Card variant="option">
        <CardHeader>
          <CardTitle>Option card</CardTitle>
          <CardDescription>Used in choice lists and pickers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress :model-value="62" variant="accent" />
        </CardContent>
      </Card>

      <Card variant="inset">
        <CardHeader>
          <CardTitle>Inset card</CardTitle>
          <CardDescription>Sections divided by hairlines.</CardDescription>
        </CardHeader>
        <CardContent>First section</CardContent>
        <CardFooter>Second section</CardFooter>
      </Card>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Avatar <span>7 sizes · 3 types</span></h2>
    <div class="docs-row">
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
        <AvatarBadge presence="busy" />
      </Avatar>
      <Avatar size="lg" type="human">
        <AvatarFallback>H</AvatarFallback>
        <AvatarBadge presence="online" />
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>A</AvatarFallback>
        <AvatarBadge presence="external" />
      </Avatar>
      <Avatar size="sm" type="server">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar size="xs"><AvatarFallback>1</AvatarFallback></Avatar>
        <Avatar size="xs"><AvatarFallback>2</AvatarFallback></Avatar>
        <Avatar size="xs"><AvatarFallback>3</AvatarFallback></Avatar>
        <AvatarGroupCount size="xs">+9</AvatarGroupCount>
      </AvatarGroup>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Form controls <span>Field wiring included</span></h2>
    <div class="docs-grid">
      <div class="docs-panel">
        <Field id="docs-email" :invalid="emailInvalid">
          <FieldLabel required>Email</FieldLabel>
          <FieldControl v-model="email" type="email" placeholder="you@example.com" />
          <FieldDescription>We use this only for sign-in.</FieldDescription>
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
        <Button style="margin-top: 14px" variant="primary" @click="submit">Submit</Button>
        <p v-if="submitted && !emailInvalid" class="docs-mono" style="margin-top: 8px">
          Submitted.
        </p>
      </div>

      <div class="docs-panel">
        <div class="docs-row" style="margin-bottom: 14px">
          <Checkbox v-model="checked" />
          <Label for="docs-checkbox">Checked checkbox</Label>
        </div>
        <div class="docs-row" style="margin-bottom: 14px">
          <Checkbox v-model="indeterminate" />
          <span class="docs-mono">Indeterminate</span>
        </div>
        <div class="docs-row" style="margin-bottom: 14px">
          <Switch v-model="notify" />
          <span class="docs-mono">Notifications {{ notify ? "on" : "off" }}</span>
        </div>
        <RadioGroup v-model="plan" orientation="horizontal">
          <Label><RadioGroupItem value="free" /> Free</Label>
          <Label><RadioGroupItem value="pro" /> Pro</Label>
          <Label><RadioGroupItem value="team" /> Team</Label>
        </RadioGroup>
      </div>

      <div class="docs-panel">
        <Label for="docs-input">Input</Label>
        <Input id="docs-input" placeholder="Project name" style="margin-top: 6px" />
        <Separator style="margin: 16px 0">or</Separator>
        <Textarea placeholder="Write a note…" :rows="4" />
        <div class="docs-row" style="margin-top: 12px">
          <Skeleton variant="line" style="width: 60%" />
          <Skeleton variant="circle" style="width: 32px; height: 32px" />
        </div>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Tiles, meters &amp; saved state <span>small system parts</span></h2>
    <div class="docs-grid">
      <div class="docs-panel">
        <div class="docs-row" style="align-items: flex-end; gap: 12px">
          <IconTile size="xs">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </IconTile>
          <IconTile size="sm" variant="information">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M8 7v4M8 5.2v.2" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </IconTile>
          <IconTile size="md" variant="warning">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2.5 14 13H2L8 2.5Z" stroke="currentColor" stroke-width="1.5" />
              <path d="M8 6v3.5M8 11.5v.2" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </IconTile>
          <IconTile size="lg">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </IconTile>
        </div>
        <p class="docs-section-copy">Decorative at four sizes; pass a role and label to announce one.</p>
        <div class="docs-row" style="margin-top: 12px">
          <FilterChip>
            <FilterChipLabel>Status: Open</FilterChipLabel>
            <FilterChipRemove label="Clear status filter" />
          </FilterChip>
          <FilterChip>
            <FilterChipLabel>Owner: me</FilterChipLabel>
            <FilterChipRemove label="Clear owner filter" />
          </FilterChip>
        </div>
      </div>

      <div class="docs-panel">
        <ToggleGroup v-model="layout" type="single" aria-label="Layout">
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="board">Board</ToggleGroupItem>
        </ToggleGroup>
        <p class="docs-mono" style="margin-top: 12px">layout = {{ layout }}</p>
        <div class="docs-row" style="margin-top: 12px; align-items: center">
          <KbdButton aria-label="Change the shortcut for Search">
            <Kbd>⌘</Kbd><Kbd>K</Kbd>
          </KbdButton>
          <KbdButton recording aria-label="Recording a shortcut">
            <KbdButtonPlaceholder>Press keys</KbdButtonPlaceholder>
          </KbdButton>
        </div>
      </div>

      <div class="docs-panel">
        <Meter :used="62" value-text="62% of monthly credits used">
          <MeterHeader>
            <MeterLabel>Monthly credits</MeterLabel>
            <MeterValue />
          </MeterHeader>
          <MeterTrack><MeterIndicator /></MeterTrack>
        </Meter>
        <Meter
          :used="86"
          value-text="86% of storage used"
          style="margin-top: 16px"
        >
          <MeterHeader>
            <MeterLabel>Storage</MeterLabel>
            <MeterValue />
          </MeterHeader>
          <MeterTrack><MeterIndicator /></MeterTrack>
        </Meter>
        <SaveStatus>
          <SaveStatusError>Could not save. Check your connection.</SaveStatusError>
        </SaveStatus>
      </div>

      <div class="docs-panel" style="grid-column: 1 / -1">
        <Tabs v-model="tab" aria-label="Project sections">
          <TabsList aria-label="Project sections">
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="activity">Activity</TabsTab>
            <TabsTab value="settings">Settings</TabsTab>
          </TabsList>
          <TabsPanel value="overview" style="padding-top: 12px">
            <Text.Sans size="small">The project is on track for Friday.</Text.Sans>
          </TabsPanel>
          <TabsPanel value="activity" style="padding-top: 12px">
            <Text.Sans size="small">Three agents edited this workspace today.</Text.Sans>
          </TabsPanel>
          <TabsPanel value="settings" style="padding-top: 12px">
            <Text.Sans size="small">Visibility, members and retention.</Text.Sans>
          </TabsPanel>
        </Tabs>
        <Tabs v-model="tab" variant="underline" style="margin-top: 18px">
          <TabsList aria-label="Underlined project sections">
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="activity">Activity</TabsTab>
            <TabsTab value="settings">Settings</TabsTab>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Overlays <span>tooltip · popover · menu</span></h2>
    <p class="docs-section-copy">
      三个 overlay 都走 Reka UI 的 portal、焦点管理与碰撞避让，表面配方与上游
      <code class="docs-mono">layer-popover</code> 一致。
    </p>
    <div class="docs-grid">
      <div class="docs-panel">
        <TooltipProvider :delay-duration="200">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="sm">Hover for shortcut</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Save changes <Kbd>⌘</Kbd><Kbd>S</Kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div class="docs-panel">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="primary" size="sm">Rename project</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Rename project</PopoverTitle>
              <PopoverClose aria-label="Close">×</PopoverClose>
            </PopoverHeader>
            <PopoverBody>
              <PopoverDescription>
                Names are visible to everyone in the workspace.
              </PopoverDescription>
              <Input model-value="Raft" aria-label="Project name" />
            </PopoverBody>
            <PopoverActions>
              <Button size="sm" variant="default">Cancel</Button>
              <Button size="sm" variant="primary">Save</Button>
            </PopoverActions>
          </PopoverContent>
        </Popover>
      </div>

      <div class="docs-panel">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">Message actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Message actions">
            <DropdownMenuItem>
              <DropdownMenuItemLabel>Copy link</DropdownMenuItemLabel>
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemLabel>Save message</DropdownMenuItemLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuItemLabel>Delete</DropdownMenuItemLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Dialog &amp; Select <span>modal · combobox</span></h2>
    <p class="docs-section-copy">
      Modal dialogs keep their actions in the footer; selects open a portalled listbox
      that inherits the trigger width.
    </p>
    <div class="docs-grid">
      <div class="docs-panel">
        <Dialog v-model:open="dialogOpen">
          <DialogTrigger as-child>
            <Button variant="primary" size="sm">Open dialog</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Create channel</DialogTitle>
              <DialogClose aria-label="Close" />
            </DialogHeader>
            <DialogBody>
              <DialogDescription>
                Channels are where a team talks, plans, and shares files.
              </DialogDescription>
              <Input class="mt-3" placeholder="Channel name" aria-label="Channel name" />
            </DialogBody>
            <DialogFooter>
              <DialogFooterActions>
                <DialogClose as-child>
                  <Button variant="ghost" size="sm">Cancel</Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button variant="primary" size="sm">Create</Button>
                </DialogClose>
              </DialogFooterActions>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div class="docs-panel">
        <Select v-model="model" aria-label="Model">
          <SelectTrigger aria-label="Model">
            <SelectValue placeholder="Choose a model" />
            <SelectIcon />
          </SelectTrigger>
          <SelectContent>
            <SelectList>
              <SelectItem value="fast">
                <SelectItemText>Fast</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="balanced">
                <SelectItemText>Balanced</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="deep">
                <SelectItemText>Deep reasoning</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectList>
          </SelectContent>
        </Select>
      </div>

      <div class="docs-panel">
        <Select chrome="field" default-value="medium" aria-label="Effort">
          <SelectTrigger aria-label="Effort">
            <SelectValue placeholder="Effort" />
            <SelectIcon />
          </SelectTrigger>
          <SelectContent>
            <SelectList>
              <SelectItem value="low"><SelectItemText>Low effort</SelectItemText></SelectItem>
              <SelectItem value="medium"><SelectItemText>Medium effort</SelectItemText></SelectItem>
              <SelectItem value="high"><SelectItemText>High effort</SelectItemText></SelectItem>
            </SelectList>
          </SelectContent>
        </Select>
      </div>

      <div class="docs-panel">
        <AlertDialog v-model:open="destructiveOpen">
          <AlertDialogTrigger as-child>
            <Button variant="danger" size="sm">Delete workspace</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogBody>
              <AlertDialogDescription>
                Every channel, file, and message will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="danger">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Text <span>heading · sans · mono</span></h2>
    <div class="docs-panel">
      <Text.Heading :level="3">Design tokens, copied not invented</Text.Heading>
      <Text.Sans size="large">Large sans text for introductions and empty states.</Text.Sans>
      <Text.Sans size="small" variant="muted">
        Small sans text for supporting copy.
      </Text.Sans>
      <Text.Mono size="meta" variant="muted">raft-design-vue@0.1.0 · upstream 624dd37</Text.Mono>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Text content <span>links · inline code · code blocks</span></h2>
    <div class="docs-grid">
      <div class="docs-panel">
        <TextLink variant="strong">Create a project</TextLink>
        <p style="margin-top: 12px">
          Install with <InlineCode>bun add @webees/raft-design-vue</InlineCode> and read the
          <TextLink :native-button="false" variant="muted">
            migration notes <TextLinkExternalIcon />
          </TextLink>.
        </p>
      </div>

      <div class="docs-panel">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>terminal</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockAction>⌘</CodeBlockAction>
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockBody>
        <CodeBlockPre><code>{{ "bun install\nbun run dev" }}</code></CodeBlockPre>
          </CodeBlockBody>
        </CodeBlock>
        <CopyableCodeRoot size="sm" style="margin-top: 12px">
          <CopyableCode>bun add @webees/raft-design-vue</CopyableCode>
          <CopyableCodeAction />
        </CopyableCodeRoot>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Banner &amp; EmptyState <span>feedback surfaces</span></h2>
    <div class="docs-grid">
      <div class="docs-panel">
        <Banner v-if="showBanner" status="warning" @close="showBanner = false">
          <BannerTitle>Upstream drift detected</BannerTitle>
          <BannerDescription>
            A newer Raft commit is available. Run <InlineCode>bun run sync:upstream</InlineCode>.
          </BannerDescription>
          <BannerAction>
            <Button size="sm" variant="outline" @click="showBanner = false">Review</Button>
          </BannerAction>
          <BannerClose label="Dismiss banner" @click="showBanner = false" />
        </Banner>
        <Button v-else size="sm" variant="outline" @click="showBanner = true">
          Show banner
        </Button>
      </div>

      <div class="docs-panel">
        <EmptyState>
          <EmptyStateContent>
            <EmptyStateIcon>◇</EmptyStateIcon>
            <EmptyStateTitle>No components selected</EmptyStateTitle>
            <EmptyStateDescription>
              Pick a component from the manifest to preview its API.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button size="sm" variant="primary">Browse components</Button>
            </EmptyStateActions>
          </EmptyStateContent>
        </EmptyState>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">
      FormSection, DescriptionList &amp; InputGroup <span>forms · details</span>
    </h2>
    <p class="docs-section-copy">
      Section scaffolding, label/value alignment with automatic stacking, and compound
      field groups that keep the upstream 1.5px field ring.
    </p>
    <div class="docs-grid">
      <div class="docs-panel">
        <FormSection title="Workspace" description="Used in dialogs and settings forms.">
          <template #status>
            <Badge appearance="soft" variant="muted">Required</Badge>
          </template>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupAddonText>https://</InputGroupAddonText>
            </InputGroupAddon>
            <InputGroupInput value="raft.build" aria-label="Workspace URL" />
          </InputGroup>
          <DescriptionList direction="horizontal" style="margin-top: 12px">
            <DescriptionItem>
              <DescriptionTerm>Owner</DescriptionTerm>
              <DescriptionDetails>Ada Lovelace</DescriptionDetails>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionTerm>Plan</DescriptionTerm>
              <DescriptionDetails>
                <Badge appearance="soft" variant="success">Team</Badge>
              </DescriptionDetails>
            </DescriptionItem>
          </DescriptionList>
        </FormSection>
      </div>

      <div class="docs-panel">
        <DescriptionList direction="inline">
          <DescriptionItem>
            <DescriptionTerm>Region</DescriptionTerm>
            <DescriptionDetails>eu-west-1</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Runtime</DescriptionTerm>
            <DescriptionDetails>Bun 1.4 · Rsbuild</DescriptionDetails>
          </DescriptionItem>
        </DescriptionList>
        <div class="docs-row" style="margin-top: 16px">
          <WorkspaceButton>
            <WorkspaceButtonName>Acme Studio</WorkspaceButtonName>
          </WorkspaceButton>
          <InputGroup size="md" style="max-width: 260px">
            <InputGroupInput placeholder="Search components" aria-label="Search components" />
          </InputGroup>
        </div>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Resizable <span>split panes</span></h2>
    <p class="docs-section-copy">
      Keyboard-accessible split panes powered by Reka UI Splitter, using the upstream
      hairline seam that strengthens on hover and drag.
    </p>
    <div class="docs-panel">
      <ResizableGroup orientation="horizontal" style="height: 180px">
        <ResizablePanel :default-size="30" :min-size="18">
          <div class="docs-resizable-pane">Sidebar</div>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize sidebar" />
        <ResizablePanel :default-size="70" :min-size="30">
          <div class="docs-resizable-pane">Canvas</div>
        </ResizablePanel>
      </ResizableGroup>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">ScrollArea <span>native scroll, styled rails</span></h2>
    <p class="docs-section-copy">
      Native scrolling with overlay gutters, fade edges, and a textarea variant that
      keeps the same rail geometry.
    </p>
    <div class="docs-panel">
      <div class="docs-row" style="align-items: stretch; gap: 1rem">
        <ScrollArea :fade="true" style="height: 180px; flex: 1">
          <div style="display: grid; gap: 8px; padding: 12px">
            <div v-for="row in 24" :key="row">Row {{ row }}</div>
          </div>
        </ScrollArea>
        <ScrollAreaTextarea
          :rows="6"
          placeholder="Type a longer note…"
          aria-label="Scrollable note"
          style="flex: 1"
        />
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Logo <span>brand marks</span></h2>
    <p class="docs-section-copy">
      The mark, wordmark, and lockup share the upstream geometry and invert in dark
      mode. Size them with utilities and keep the aspect ratio.
    </p>
    <div class="docs-panel">
      <div class="docs-row" style="align-items: center; gap: 2rem">
        <RaftLogo style="height: 40px; width: auto" aria-label="Raft" role="img" />
        <RaftWordmark style="height: 40px; width: auto" aria-label="Raft" role="img" />
        <RaftLogoLockup style="height: 40px; width: auto" aria-label="Raft" role="img" />
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">SegmentedControl <span>compact view switch</span></h2>
    <p class="docs-section-copy">
      A radio group with a sliding sticker selection, keyboard arrow navigation, and
      count labels that collapse cleanly on narrow tracks.
    </p>
    <div class="docs-panel">
      <SegmentedControl v-model="segmentedView" aria-label="Layout">
        <SegmentedControlItem value="grid">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" stroke="currentColor" />
          </svg>
          <SegmentedControlLabel>Grid</SegmentedControlLabel>
        </SegmentedControlItem>
        <SegmentedControlItem value="list">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" />
          </svg>
          <SegmentedControlLabel>List</SegmentedControlLabel>
          <SegmentedControlCount>12</SegmentedControlCount>
        </SegmentedControlItem>
        <SegmentedControlItem value="board">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2h3v12H2zM6.5 2h3v8h-3zM11 2h3v10h-3z" stroke="currentColor" />
          </svg>
          <SegmentedControlLabel>Board</SegmentedControlLabel>
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Steps <span>progress with a mascot</span></h2>
    <p class="docs-section-copy">
      Status is carried by the marker, the connector, and a visually hidden label.
      Click a step to make it current; the Ottie indicator animates only when visible.
    </p>
    <div class="docs-panel">
      <Steps :current="stepIndex" @update:current="stepIndex = $event">
        <Step title="Describe" description="Say what changed." />
        <Step title="Review" description="Read the diff." />
        <Step title="Ship" description="Deploy to production." />
      </Steps>
      <div class="docs-row" style="margin-top: 1.25rem; align-items: center">
        <OtterIndicator status="process" style="width: 64px; height: 64px" />
        <span style="font-size: 12px; color: var(--foreground-hint)">Ottie · process</span>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Timeline <span>status pixels on a hairline</span></h2>
    <p class="docs-section-copy">
      Events use task-status colours, hollow backlog markers, optional icons, and
      horizontal or right-aligned layouts.
    </p>
    <div class="docs-panel">
      <Timeline>
        <TimelineItem task-status="done">
          <TimelineTitle>Claimed by Bugen</TimelineTitle>
          <TimelineContent>moved to In progress</TimelineContent>
          <TimelineTime>2m</TimelineTime>
        </TimelineItem>
        <TimelineItem task-status="in-review">
          <TimelineTitle>Opened a pull request</TimelineTitle>
          <TimelineContent>#14149 · 4 files changed</TimelineContent>
          <TimelineTime>1m</TimelineTime>
        </TimelineItem>
        <TimelineItem variant="warning" line-type="dashed">
          <TimelineTitle>CI needs a rerun</TimelineTitle>
          <TimelineContent>flaky test in main</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">AppRail <span>the application frame</span></h2>
    <p class="docs-section-copy">
      The narrow rail shares the shell recipe with upstream: frame tokens, a scroll-safe
      nav, attention badges, and a quiet footer.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <AppRailRoot style="height: 320px">
        <AppRailHeader>
          <AppRailItem selected aria-label="Home">R</AppRailItem>
        </AppRailHeader>
        <AppRailNav>
          <AppRailItem selected aria-label="Tasks">
            <AppRailItemIcon>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 5h12M4 10h12M4 15h7" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </AppRailItemIcon>
            <AppRailItemBadge>3</AppRailItemBadge>
          </AppRailItem>
          <AppRailItem aria-label="Inbox">
            <AppRailItemIcon>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3.5 5.5h13v9h-13zM3.5 6l6.5 5 6.5-5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </AppRailItemIcon>
          </AppRailItem>
        </AppRailNav>
        <AppRailFooter>
          <AppRailItem aria-label="Settings">⚙</AppRailItem>
        </AppRailFooter>
      </AppRailRoot>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Files <span>shared file list</span></h2>
    <p class="docs-section-copy">
      Rows keep the preview target and actions as separate buttons, with the upstream
      hairline card, thumbnail geometry, and compact metadata scale.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <FilesPanel aria-label="Files" style="height: 280px">
        <FilesViewport>
          <FilesList>
            <FileRow>
              <FileRowOpen aria-label="Open launch-plan.pdf">
                <FileThumbnail aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 2.5h6l3 3v12H6zM12 2.5v3h3"
                      stroke="currentColor"
                      stroke-width="1.4"
                    />
                  </svg>
                </FileThumbnail>
                <FileContent>
                  <FileName>launch-plan.pdf</FileName>
                  <FileMeta>
                    <FileMetaItem>184 KB</FileMetaItem>
                    <FileMetaItem>Yesterday, 4:18 PM</FileMetaItem>
                  </FileMeta>
                </FileContent>
              </FileRowOpen>
              <FileActions>
                <FileAction aria-label="Jump to original message">↗</FileAction>
                <FileAction aria-label="Download file">↓</FileAction>
              </FileActions>
            </FileRow>
            <FileRow>
              <FileRowOpen aria-label="Open prototype.png">
                <FileThumbnail>
                  <FileImage
                    src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=96&h=96&fit=crop"
                    alt=""
                    fit="cover"
                  />
                </FileThumbnail>
                <FileContent>
                  <FileName>prototype.png</FileName>
                  <FileMeta>
                    <FileMetaItem>2.4 MB</FileMetaItem>
                    <FileMetaItem>Monday, 9:12 AM</FileMetaItem>
                  </FileMeta>
                </FileContent>
              </FileRowOpen>
              <FileActions>
                <FileAction aria-label="Download file">↓</FileAction>
              </FileActions>
            </FileRow>
          </FilesList>
        </FilesViewport>
      </FilesPanel>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Panel <span>the framed workspace surface</span></h2>
    <p class="docs-section-copy">
      The panel primitive matches upstream geometry: a compact frame header, section
      rhythm, action slots, notices and a footer that stays outside the scroll region.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <Panel edge="attached" style="height: 360px">
        <PanelHeader>
          <PanelHeaderIcon>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 5.5h12v9H4zM7 8.5h6M7 11.5h4"
                stroke="currentColor"
                stroke-width="1.4"
              />
            </svg>
          </PanelHeaderIcon>
          <PanelHeaderContent>
            <PanelHeading>
              <PanelTitle>Project Atlas</PanelTitle>
              <PanelStatus>Live</PanelStatus>
            </PanelHeading>
            <PanelMeta size="sm">Edited 4 minutes ago</PanelMeta>
          </PanelHeaderContent>
          <PanelActions>
            <PanelAction aria-label="Search project">⌕</PanelAction>
            <PanelAction aria-label="Panel options">⋯</PanelAction>
          </PanelActions>
        </PanelHeader>
        <PanelBody>
          <PanelScrollViewport>
            <PanelScrollContent>
              <PanelSection>
                <h3 class="text-sm font-medium">Launch checklist</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  Review the release notes before the Friday cutoff.
                </p>
              </PanelSection>
              <PanelSection>
                <h3 class="text-sm font-medium">Recent activity</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  Mina updated the rollout plan and added two reviewers.
                </p>
              </PanelSection>
            </PanelScrollContent>
          </PanelScrollViewport>
        </PanelBody>
        <PanelFooter>
          <span class="text-xs text-muted-foreground">3 collaborators</span>
          <Button size="sm" variant="outline">Open project</Button>
        </PanelFooter>
      </Panel>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">ConversationPanel <span>a full-height thread column</span></h2>
    <p class="docs-section-copy">
      Tabs sit above the scrollable body, while the composer footer keeps the upstream
      frame edge and quiet empty state.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <ConversationPanelRoot style="height: 360px">
        <ConversationPanelTabs>
          <div class="docs-row">
            <Badge appearance="soft">Conversation</Badge>
            <Badge appearance="outline">Files</Badge>
          </div>
        </ConversationPanelTabs>
        <ConversationPanelContent>
          <ConversationPanelBody>
            <div class="space-y-3">
              <div class="rounded-lg border p-3 text-sm">
                The release copy is ready for review.
              </div>
              <div class="rounded-lg border p-3 text-sm">
                I added the customer impact notes to the brief.
              </div>
            </div>
          </ConversationPanelBody>
          <ConversationPanelFooter>
            <Input placeholder="Reply to the team…" />
          </ConversationPanelFooter>
        </ConversationPanelContent>
      </ConversationPanelRoot>
    </div>
    <div class="docs-panel mt-4" style="padding: 0; overflow: hidden">
      <ConversationPanelEmptyState style="min-height: 220px">
        <ConversationPanelEmptyStateBrand>
          <ConversationPanelEmptyStateBrandMark>R</ConversationPanelEmptyStateBrandMark>
        </ConversationPanelEmptyStateBrand>
        <span class="text-sm font-medium">Pick a conversation</span>
        <span class="text-xs text-muted-foreground">
          Start from the inbox or create a new thread.
        </span>
      </ConversationPanelEmptyState>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">ProfilePanel <span>profile and preferences</span></h2>
    <p class="docs-section-copy">
      A framed profile surface with header, body and section slots for account details
      and workspace settings.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <ProfilePanel style="height: 320px">
        <ProfilePanelHeader>
          <ProfilePanelHeaderContent>
            <Avatar>
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div>
              <h3 class="text-sm font-semibold">Mina Chen</h3>
              <p class="text-xs text-muted-foreground">mina@example.com</p>
            </div>
          </ProfilePanelHeaderContent>
        </ProfilePanelHeader>
        <ProfilePanelBody>
          <ProfilePanelSection>
            <h4 class="text-sm font-medium">Account</h4>
            <p class="mt-1 text-sm text-muted-foreground">
              Personal workspace · Member since 2024
            </p>
          </ProfilePanelSection>
          <ProfilePanelSection>
            <h4 class="text-sm font-medium">Notifications</h4>
            <label class="mt-2 flex items-center gap-2 text-sm">
              <Switch v-model="productUpdates" />
              Product updates
            </label>
          </ProfilePanelSection>
        </ProfilePanelBody>
      </ProfilePanel>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">ThreadPanel <span>focused reply view</span></h2>
    <p class="docs-section-copy">
      The thread panel keeps the original message, reply summary and reply count in a
      narrow, scroll-safe column.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <ThreadPanelRoot style="height: 360px">
        <ThreadPanelHeader>
          <ThreadPanelTitle>Launch checklist</ThreadPanelTitle>
          <ThreadPanelTitleMeta>#launch-week</ThreadPanelTitleMeta>
        </ThreadPanelHeader>
        <ThreadPanelBody>
          <ThreadPanelContent>
            <ThreadPanelOriginalMessage>
              Can we lock the final rollout plan before Friday?
            </ThreadPanelOriginalMessage>
            <ThreadPanelReplySummary>
              <ThreadPanelReplyCount>2 replies</ThreadPanelReplyCount>
              Mina and Theo responded in this thread.
            </ThreadPanelReplySummary>
          </ThreadPanelContent>
        </ThreadPanelBody>
        <ThreadPanelFooter>
          <Input placeholder="Reply in thread…" />
        </ThreadPanelFooter>
      </ThreadPanelRoot>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">ListRow <span>lists and settings</span></h2>
    <p class="docs-section-copy">
      The whole row is the target, with hairline separators, attached rows, and quiet
      unread emphasis.
    </p>
    <div class="docs-panel">
      <ListRowGroup>
        <ListRow tone="unread">
          <ListRowIcon><span aria-hidden="true">●</span></ListRowIcon>
          <ListRowBody>
            <ListRowTop>
              <ListRowTitle>Product review</ListRowTitle>
              <ListRowMeta>2m</ListRowMeta>
            </ListRowTop>
            <ListRowDescription>Maya shared the launch checklist</ListRowDescription>
          </ListRowBody>
          <ListRowChevron />
        </ListRow>
        <ListRow>
          <ListRowBody>
            <ListRowTop>
              <ListRowTitle>Notifications</ListRowTitle>
              <ListRowMeta>On</ListRowMeta>
            </ListRowTop>
            <ListRowDescription>Mentions, replies, and assigned work</ListRowDescription>
          </ListRowBody>
          <ListRowChevron />
        </ListRow>
        <ListRow variant="plain" :interactive="false">
          <ListRowBody>
            <ListRowTitle>Workspace plan</ListRowTitle>
            <ListRowDescription>Team · renews Jan 12</ListRowDescription>
          </ListRowBody>
        </ListRow>
      </ListRowGroup>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">PickerTriggerButton <span>filters</span></h2>
    <p class="docs-section-copy">
      A compact filter trigger: outlined until applied, filled once a value is chosen.
    </p>
    <div class="docs-panel">
      <div class="docs-row">
        <PickerTriggerButton>Channel</PickerTriggerButton>
        <PickerTriggerButton :has-value="true">#launch-week</PickerTriggerButton>
        <PickerTriggerButton :invalid="true">Assignee</PickerTriggerButton>
        <PickerTriggerButton :disabled="true">Status</PickerTriggerButton>
      </div>
    </div>
  </section>

  <section class="docs-section" id="tasks">
    <h2 class="docs-section-title">Tasks <span>panel, card, list and board</span></h2>
    <p class="docs-section-copy">
      Task surfaces share the status pixels, soft status chips and the panel rhythm used by
      the upstream issue views. Sections and board columns collapse independently.
    </p>
    <div class="docs-panel" style="padding: 0; overflow: hidden">
      <TasksPanelRoot style="height: 360px">
        <TasksPanelToolbar>
          <TasksPanelToolbarLabel>Launch week</TasksPanelToolbarLabel>
          <TasksPanelToolbarGroup>
            <TasksPanelToolbarFilters>Filter</TasksPanelToolbarFilters>
            <TasksPanelToolbarView>Board</TasksPanelToolbarView>
            <TasksPanelToolbarNewTask>New task</TasksPanelToolbarNewTask>
          </TasksPanelToolbarGroup>
        </TasksPanelToolbar>
        <TasksPanelViewport>
          <TaskListRoot>
            <TaskSection :default-open="true">
              <TaskSectionTrigger>
                <TaskStatusBadge status="in-progress">In progress</TaskStatusBadge>
                <TaskSectionHeading>Release checklist</TaskSectionHeading>
                <TaskSectionCount>2</TaskSectionCount>
              </TaskSectionTrigger>
              <TaskSectionPanel>
                <TaskCard status="in-progress">
                  <TaskCardRow>
                    <TaskCardStatus status="in-progress" />
                    <TaskCardBody>
                      <TaskCardTitle>Port the scroll area primitive</TaskCardTitle>
                      <TaskCardMeta>
                        <TaskCardChannel>#design-system</TaskCardChannel>
                        <TaskCardNumber>RF-128</TaskCardNumber>
                      </TaskCardMeta>
                    </TaskCardBody>
                  </TaskCardRow>
                </TaskCard>
                <TaskCard status="todo">
                  <TaskCardRow>
                    <TaskCardStatus status="todo" />
                    <TaskCardBody>
                      <TaskCardTitle>Write migration notes for the panel API</TaskCardTitle>
                      <TaskCardMeta>
                        <TaskCardChannel>#docs</TaskCardChannel>
                        <TaskCardNumber>RF-131</TaskCardNumber>
                      </TaskCardMeta>
                    </TaskCardBody>
                  </TaskCardRow>
                </TaskCard>
              </TaskSectionPanel>
            </TaskSection>
          </TaskListRoot>
        </TasksPanelViewport>
      </TasksPanelRoot>
    </div>
    <div class="docs-panel mt-4">
      <div class="docs-row">
        <TaskStatusBadge status="backlog">Backlog</TaskStatusBadge>
        <TaskStatusBadge status="todo">Todo</TaskStatusBadge>
        <TaskStatusBadge status="in-progress">In progress</TaskStatusBadge>
        <TaskStatusBadge status="in-review">In review</TaskStatusBadge>
        <TaskStatusBadge status="done">Done</TaskStatusBadge>
        <TaskStatusBadge status="closed">Closed</TaskStatusBadge>
      </div>
      <div class="docs-row mt-4">
        <TaskChip status="in-progress">RF-142</TaskChip>
        <TaskChip status="done" variant="inline">auth-refresh</TaskChip>
        <TaskChip status="backlog" loading>Syncing</TaskChip>
      </div>
      <TaskLoadingList class="mt-4">
        <TaskLoadingRow />
        <TaskLoadingRow />
        <TaskLoadingRow />
      </TaskLoadingList>
    </div>
    <div class="docs-panel mt-4" style="padding: 0; overflow: hidden">
      <TaskBoardRoot>
        <TaskBoardColumn :default-open="true">
          <TaskBoardColumnTrigger>
            <TaskStatusBadge status="todo">Todo</TaskStatusBadge>
            <TaskBoardColumnHeading>Ready</TaskBoardColumnHeading>
          </TaskBoardColumnTrigger>
          <TaskBoardColumnPanel>
            <TaskBoardColumnItems>
              <TaskCard status="todo">
                <TaskCardRow>
                  <TaskCardStatus status="todo" />
                  <TaskCardBody>
                    <TaskCardTitle>Audit focus rings</TaskCardTitle>
                  </TaskCardBody>
                </TaskCardRow>
              </TaskCard>
            </TaskBoardColumnItems>
          </TaskBoardColumnPanel>
        </TaskBoardColumn>
        <TaskBoardColumn :default-open="true">
          <TaskBoardColumnTrigger>
            <TaskStatusBadge status="in-review">In review</TaskStatusBadge>
            <TaskBoardColumnHeading>Review</TaskBoardColumnHeading>
          </TaskBoardColumnTrigger>
          <TaskBoardColumnPanel>
            <TaskBoardColumnItems>
              <TaskCard status="in-review">
                <TaskCardRow>
                  <TaskCardStatus status="in-review" />
                  <TaskCardBody>
                    <TaskCardTitle>Panel header geometry</TaskCardTitle>
                  </TaskCardBody>
                </TaskCardRow>
              </TaskCard>
            </TaskBoardColumnItems>
          </TaskBoardColumnPanel>
        </TaskBoardColumn>
      </TaskBoardRoot>
    </div>
  </section>

  <section class="docs-section" id="message-chrome">
    <h2 class="docs-section-title">Message chrome <span>embeds and system notes</span></h2>
    <p class="docs-section-copy">
      Cards in messages share one frame; system notes sit between messages as their own
      turn. The selection toolbar floats above a highlight.
    </p>
    <div class="docs-panel">
      <MessageEmbed size="item" interactive>
        <MessageEmbedHeader>
          <span class="text-footnote font-bold">raft.build</span>
        </MessageEmbedHeader>
        <MessageEmbedContent>
          <div class="border-y border-line-hairline bg-fill-subtle p-6 text-center">
            <span class="text-title-3 font-bold">Raft Design</span>
          </div>
        </MessageEmbedContent>
        <MessageEmbedFooter>
          <span class="text-footnote text-foreground-hint">A design system for agent interfaces</span>
        </MessageEmbedFooter>
      </MessageEmbed>
    </div>
    <div class="docs-panel mt-4">
      <SystemMessage>
        <SystemMessageTime>09:41</SystemMessageTime>
        <SystemMessageContent>Channel renamed to #launch</SystemMessageContent>
      </SystemMessage>
      <SystemMessageGroup :default-open="true" class="mt-2">
        <SystemMessageGroupHeader>
          <SystemMessageGroupDisclosure>
            <SystemMessageGroupChevron />
            <SystemMessageGroupSummary>3 earlier system messages</SystemMessageGroupSummary>
          </SystemMessageGroupDisclosure>
        </SystemMessageGroupHeader>
        <SystemMessageGroupPanel>
          <SystemMessage>
            <SystemMessageTime>08:12</SystemMessageTime>
            <SystemMessageContent>Alice joined the channel</SystemMessageContent>
          </SystemMessage>
          <SystemMessage>
            <SystemMessageTime>08:14</SystemMessageTime>
            <SystemMessageContent>Bob was added by Alice</SystemMessageContent>
          </SystemMessage>
        </SystemMessageGroupPanel>
      </SystemMessageGroup>
    </div>
    <div class="docs-panel mt-4 flex justify-center">
      <TextSelectionToolbar>
        <TextSelectionToolbarButton>Quote</TextSelectionToolbarButton>
        <TextSelectionToolbarSeparator />
        <TextSelectionToolbarButton>Copy</TextSelectionToolbarButton>
        <TextSelectionToolbarButton>Comment</TextSelectionToolbarButton>
      </TextSelectionToolbar>
    </div>
  </section>

  <section class="docs-section" id="markdown">
    <h2 class="docs-section-title">Markdown <span>rendered message content</span></h2>
    <p class="docs-section-copy">
      Presentational parts for rendered markdown: headings, lists, quotes, tables, images and
      read-only task checkboxes inherit the surrounding text scale.
    </p>
    <div class="docs-panel max-w-2xl">
      <MarkdownHeading :level="2">Release notes</MarkdownHeading>
      <MarkdownParagraph>
        Raft exports <MarkdownMark>design tokens</MarkdownMark> and a
        <MarkdownLink href="https://raft.build">component library</MarkdownLink>.
        Inline code such as <MarkdownInlineCode>bun run verify</MarkdownInlineCode> stays in
        the text flow.
      </MarkdownParagraph>
      <MarkdownList>
        <MarkdownListItem>
          <MarkdownCheckbox :checked="true" /> Tokens and themes
        </MarkdownListItem>
        <MarkdownListItem>
          <MarkdownCheckbox :default-checked="false" /> Component parity
        </MarkdownListItem>
      </MarkdownList>
      <MarkdownOrderedList>
        <MarkdownListItem>Install the package</MarkdownListItem>
        <MarkdownListItem>Import the stylesheet</MarkdownListItem>
      </MarkdownOrderedList>
      <MarkdownBlockquote>Source-faithful, with upstream sync built in.</MarkdownBlockquote>
      <MarkdownRule />
      <MarkdownTableScroll>
        <MarkdownTable>
          <MarkdownTableRow>
            <MarkdownHeaderCell>Layer</MarkdownHeaderCell>
            <MarkdownHeaderCell>Owner</MarkdownHeaderCell>
          </MarkdownTableRow>
          <MarkdownTableRow>
            <MarkdownCell>Tokens</MarkdownCell>
            <MarkdownCell>Design</MarkdownCell>
          </MarkdownTableRow>
        </MarkdownTable>
      </MarkdownTableScroll>
    </div>
  </section>

  <section class="docs-section" id="preview-card">
    <h2 class="docs-section-title">Preview card <span>hover disclosure</span></h2>
    <p class="docs-section-copy">
      A 300px profile card that opens on hover or focus, reusing the message card recipe when
      size is <code>item</code>.
    </p>
    <PreviewCard>
      <PreviewCardTrigger as-child>
        <Button variant="default">Hover {{ "@webees" }}</Button>
      </PreviewCardTrigger>
      <PreviewCardContent>
        <PreviewCardHeader>
          <Avatar>
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <div class="min-w-0">
            <PreviewCardTitle>Webees</PreviewCardTitle>
            <PreviewCardDescription>Vue port of Raft Design</PreviewCardDescription>
          </div>
        </PreviewCardHeader>
        <PreviewCardBody>
          <PreviewCardMeta>71 of 102 components ported</PreviewCardMeta>
          <PreviewCardActions>
            <Button size="sm" variant="on-frame">Follow</Button>
          </PreviewCardActions>
        </PreviewCardBody>
        <PreviewCardFooter>raft.build</PreviewCardFooter>
      </PreviewCardContent>
    </PreviewCard>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Lightbox <span>full-screen viewer</span></h2>
    <p class="docs-section-copy">
      Dialog over the scrim, with a header and one close button. The body scrolls inside the
      dialog, so the frame stays still while the media moves.
    </p>
    <Lightbox>
      <LightboxTrigger as-child>
        <button class="docs-button" type="button">Open lightbox</button>
      </LightboxTrigger>
      <LightboxContent>
        <LightboxHeader>
          <LightboxTitle>Attachment preview</LightboxTitle>
          <LightboxClose aria-label="Close" />
        </LightboxHeader>
        <LightboxBody>
          <LightboxStage>
            <LightboxMedia>
              <div class="grid h-64 w-[26rem] place-items-center rounded-container bg-layer-muted">
                Preview
              </div>
            </LightboxMedia>
          </LightboxStage>
        </LightboxBody>
      </LightboxContent>
    </Lightbox>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Comment <span>margin and marker</span></h2>
    <p class="docs-section-copy">
      Cards sit in a margin level with the passage they are about; the marker carries the count
      inline.
    </p>
    <div class="flex gap-4">
      <CommentMargin class="w-56">
        <CommentMarginItem :top="0" active>
          <CommentCard>
            <CommentCardMeta>Ada · now</CommentCardMeta>
            <CommentEntry>
              <CommentEntryHeader>
                <CommentEntryAuthor>Ada</CommentEntryAuthor>
              </CommentEntryHeader>
              <CommentEntryBody>Can we pin this to the release?</CommentEntryBody>
            </CommentEntry>
          </CommentCard>
        </CommentMarginItem>
      </CommentMargin>
      <div class="flex-1">
        <CommentMarker>2</CommentMarker>
        <p class="mt-2 text-body">The paragraph the comments are about.</p>
      </div>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Composer <span>message input</span></h2>
    <p class="docs-section-copy">The field grows with its content and keeps its toolbar in flow.</p>
    <Composer>
      <ComposerInput placeholder="Write a message" />
      <ComposerToolbar>
        <span />
        <ComposerSubmit>Send</ComposerSubmit>
      </ComposerToolbar>
    </Composer>
  </section>

  <section class="docs-section">
    <h2 class="docs-section-title">Task DnD <span>pointer and keyboard</span></h2>
    <p class="docs-section-copy">
      Cards lift with Space, move with the arrow keys, drop with Space and cancel with Escape.
    </p>
    <TaskDndProvider>
      <TaskDropZone id="todo" class="flex w-64 flex-col gap-2">
        <TaskDropPlaceholder id="todo" placement="before" />
        <TaskDraggable id="draft" drop-id="draft">Draft the changelog</TaskDraggable>
        <TaskDropPlaceholder id="todo" placement="after" />
      </TaskDropZone>
    </TaskDndProvider>
  </section>
</template>
