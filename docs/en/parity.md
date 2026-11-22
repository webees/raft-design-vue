# Parity baseline

**English** | [简体中文](../zh/parity.md)

What this port is measured against, how it is audited, and the floor a change
must not drop below. This file merges the former baseline and per-component
audit notes.

## Upstream

|               |                                            |
| ------------- | ------------------------------------------ |
| Repository    | `botiverse/raft-design`                    |
| Commit        | `c7045d63f72c5c7cac06685415323948e5a32f15` |
| Synced inputs | 194 files (`tooling/upstream/upstream.lock.json`) |

## Covered surface

| Check                                   | Result                                    |
| --------------------------------------- | ----------------------------------------- |
| Upstream component directories ported   | 102 / 102                                 |
| Upstream public types exported          | 960 / 960                                 |
| Ported `index.ts` entry points          | 102 / 102                                 |
| Untracked local component folders       | 0                                         |
| Recipe slots missing vs upstream        | 0                                         |
| Recipe class tokens missing vs upstream | 0 (multiset audit, per component)         |
| Local-only (Reka-equivalent) selectors  | documented in [Upstream sync](./upstream-sync.md) |

## Verification

```bash
bun run verify
```

Order: `check:parity → check:audit → check:docs-links → lint → typecheck →
check:api → check:props → test → build → check:consumer-types`.

Measured on 2026-11-22 with Bun 1.4.4 / Node 22:

|             |                                      |
| ----------- | ------------------------------------ |
| Test files  | 106                                  |
| Tests       | 395                                  |
| Type check  | clean (`vue-tsc --noEmit`)           |
| API surface | 960 / 960                            |
| Library     | 1928.6 kB raw, 294.0 kB gzip         |
| Docs bundle | 4152.1 kB total, 1603.8 kB gzip      |

### Source baseline

Source size and duplication floor for `packages/ui/src` (`.ts` + `.vue`, tests
excluded), measured on 2026-11-22:

| Metric                                          | Value             |
| ----------------------------------------------- | ----------------- |
| Source lines                                    | 46,819            |
| `components/` lines                             | 42,608            |
| `lib/` lines                                    | 4,027             |
| Copy-paste clones (jscpd, 10 lines / 70 tokens) | 0                 |
| Copy-paste clones (jscpd, 6 lines / 40 tokens)  | 0                 |
| Duplicated lines / tokens (6/40)                | 0.00% / 0.00%     |
| Unused locals and parameters (`vue-tsc`)        | 0                 |
| Component files with no importer                | 0                 |

Re-measure with:

```bash
find packages/ui/src \( -name '*.ts' -o -name '*.vue' \) \
  ! -name '*.test.ts' ! -name '*.generated.ts' ! -name 'auto-imports.d.ts' \
  ! -path '*/test/*' | xargs wc -l
bunx jscpd packages/ui/src --min-lines 6 --min-tokens 40 \
  --ignore '**/*.test.ts' --ignore '**/*.generated.ts' \
  --ignore '**/*.css' --ignore '**/*.json'
cd packages/ui && ./node_modules/.bin/vue-tsc --noEmit \
  -p tsconfig.json --noUnusedLocals --noUnusedParameters
```

## Audit method

Every component under `packages/ui/src/components` is checked on four axes:

```bash
bun run tooling/upstream/src/audit.ts          # exports, data-slots, literal classes
bun run tooling/upstream/src/audit-recipes.ts  # recipe class-string multisets
bun run check:parity                           # 102/102 directories present
bun run check:api                              # upstream types resolvable
```

`audit.ts` reports `missingSlots`, `missingExports`, `missingClasses` and
`missingProps`; `--json` prints the machine-readable form. Only three kinds of
divergence are accepted:

1. **Headless attribute names** — Reka exposes `data-state` where Base UI uses
   `data-open` / `data-checked` / `data-pressed`. Recipes keep the upstream
   selector and add the Reka equivalent.
2. **CSS variables** — Reka's `--reka-*` variables are aliased to upstream
   names at the component boundary.
3. **Composition helpers** — where Reka merges positioner and popup, the
   positioner class goes on the outer element and the popup class on the inner
   `data-slot` element.

Anything else is a defect: a missing export, a missing `data-slot`, a utility
the theme never generated, or a drifted recipe string.

## Static audit

These checks are cheap and must stay clean:

- every `v-for` has a `:key`
- no `as any`, `as never`, `@ts-ignore`, `TODO`, `FIXME`
- no `v-html`, `JSON.parse`, `localStorage` or `Math.random` in components
- every per-component `addEventListener` has a matching removal path
- no prop is mutated; no props destructured out of reactivity
- caller `class` reaches a component root exactly once
- caller `data-slot` wins over a component default
- every `defineEmits` entry is emitted, every declared prop is read
- every Markdown link resolves to an existing file and heading
  (`check:docs-links`)
- every tracked file is Biome-formatted (`bun run lint`)

## Component inventory

| Group          | Families                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| Actions        | `Button`, `TextLink`, `KbdButton`, `IconTile`, `ToggleGroup`             |
| Display        | `Badge`, `Card`, `Avatar`, `Kbd`, `Status`, `Progress`, `Spinner`, `Skeleton`, `Separator`, `Text`, `InlineCode`, `Meter`, `FilterChip`, `SaveStatus` |
| Forms          | `Input`, `Label`, `Field`, `Checkbox`, `Switch`, `RadioGroup`, `Textarea`, `FormSection`, `InputGroup`, `SegmentedControl`, `Select`, `ChoiceList` |
| Content        | `CodeBlock`, `CopyableCode`, `Banner`, `EmptyState`, `Timeline`, `Markdown`, `FilePreview`, `Files` |
| Navigation     | `Tabs`, `Steps`, `AppRail`, `MobileNav`, `SearchTrigger`, `SearchShell`  |
| Overlays       | `Tooltip`, `Popover`, `DropdownMenu`, `ContextMenu`, `Dialog`, `AlertDialog`, `Drawer`, `Lightbox`, `Toast`, `NotificationCenter`, `AnnouncementDialog`, `PreviewCard`, `CoachMark`, `SelectionToolbar` |
| Data           | `Table`, `DescriptionList`, `ListRow`                                    |
| Layout         | `Resizable`, `ScrollArea`, `Panel`, `ConversationPanel`, `ProfilePanel`, `ThreadPanel`, `AppShell`, `WebTopBar` |
| Tasks          | `TasksPanel`, `TaskCard`, `TaskList`, `TaskBoard`, `TaskDnd*`, `TaskCompletionControl`, `TaskDrag*` |
| Messages       | `MessageItem`, `MessageList`, `MessageReplies`, `MessageEmbed`, `SystemMessage`, `MessageActionCard`, `MessageForwardedBundle`, `ActivityInbox`, `InboxItem`, `Composer` |
| Collaboration  | `CommentMargin`, `CommentCard`, `CommentEntry`, `CommentMarker`, `DragScope`, `Draggable`, `Droppable`, `DragLift`, `DropPlaceholder`, `PullToRefresh` |
| Identity       | `RaftLogo`, `RaftWordmark`, `RaftLogoLockup`                             |

The machine-readable list is `tooling/upstream/component-manifest.json`.
