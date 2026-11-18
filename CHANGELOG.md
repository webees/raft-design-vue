# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Completed the upstream component surface: `Lightbox`, `Comment*`, `Drag*`,
  `TaskDnd*`, `Composer*`, `Toast*`, `Search*`, `NotificationCenter`,
  `MobileNav*` and `PullToRefresh*`.
- Native Vue drag engine with pointer, touch-hold and keyboard sensors,
  cross-list moves, announcements, lift and drop placeholders (no React
  `@dnd-kit` dependency).
- Parity now reports 102 / 102 upstream components ported.
- Bun workspace, Vue 3 + Rsbuild/Rslib toolchain and MIT licensing.
- Ported design-token and theme generation from the pinned upstream commit.
- 71 Vue components: Button, TextLink, Spinner, Badge, Card, Avatar, Input,
  Field, Label, Separator, Skeleton, Text, Checkbox, Switch, RadioGroup,
  Textarea, Kbd, Status, Progress, InlineCode, CodeBlock, CopyableCode,
  Banner, EmptyState, IconTile, SaveStatus, ToggleGroup, Meter, FilterChip,
  KbdButton, Tabs, Tooltip, Popover, DropdownMenu, Dialog, AlertDialog, Select,
  Table, FormSection, DescriptionList, InputGroup, WorkspaceButton, Resizable,
  ScrollArea,
  ListRow, PickerTriggerButton, RaftLogo, RaftWordmark, RaftLogoLockup,
  SegmentedControl, Steps, Timeline, AppRail, Files, Panel, ConversationPanel,
  ProfilePanel, ThreadPanel, TasksPanel, TaskCard, TaskList, TaskBoard,
  MessageEmbed, SystemMessage, TextSelectionToolbar, WebTopBar, Markdown,
  FilePreview, MessageReplies, MessageItemTranslation, TaskCompletionControl,
  AnnouncementDialog, PreviewCard.
- `d.ts` declarations generated with `vue-tsc`, normalized for strict consumers,
  and shipped with the package.
- Rsbuild documentation site with component gallery, token browser, ten
  themes, light/dark modes and a 183-document upstream design browser.
- Tailwind CSS v4 is compiled into the docs bundle through
  `@tailwindcss/postcss`, so the gallery and the published package share the
  same utility output.
- Upstream sync, drift detection and component parity tooling.
