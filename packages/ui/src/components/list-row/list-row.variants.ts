import { listCell, listCellFocus, listCellStates } from "../../lib/list-cell";
import { tv } from "../../lib/tv";

const hairlineLine = [
  "before:pointer-events-none before:absolute before:top-0 before:right-0 before:hidden",
  "before:left-(--list-row-rule-start) before:border-t before:border-line-hairline",
];
const hairline = [
  ...hairlineLine,
  "[[data-slot=list-row]+&]:before:block [li+li>&]:before:block",
];
const attachedAfterTarget = [
  ...hairlineLine,
  "[[data-slot=list-row][data-interactive]:not([data-attached])+&]:before:block",
];

export const listRow = tv({
  slots: {
    group: [
      "flex min-w-0 flex-col overflow-hidden",
      "rounded-container border border-line-hairline bg-layer-card text-foreground",
    ],
    root: [
      "group/list-row flex w-full min-w-0 items-center gap-3 py-3 text-left",
      "font-sans no-underline",
      "[--list-row-ink:var(--foreground)] [--list-row-ink-2:var(--foreground-muted)] [--list-row-ink-3:var(--foreground-hint)]",
      "text-(--list-row-ink)",
      "[--list-row-risk-ink:initial]",
      "not-disabled:not-aria-disabled:data-[tone=unread]:[--list-row-ink-2:var(--foreground)]",
      "not-disabled:not-aria-disabled:data-[tone=muted]:[--list-row-ink:var(--foreground-muted)]",
      "not-disabled:not-aria-disabled:data-[tone=away]:[--list-row-ink:var(--foreground-hint)]",
      "not-disabled:not-aria-disabled:data-[tone=away]:[--list-row-ink-2:var(--foreground-hint)]",
      "disabled:cursor-not-allowed disabled:[--list-row-ink:var(--foreground-disabled)]",
      "disabled:[--list-row-ink-2:var(--foreground-disabled)] disabled:[--list-row-ink-3:var(--foreground-disabled)]",
      "aria-disabled:cursor-not-allowed aria-disabled:[--list-row-ink:var(--foreground-disabled)]",
      "aria-disabled:[--list-row-ink-2:var(--foreground-disabled)] aria-disabled:[--list-row-ink-3:var(--foreground-disabled)]",
    ],
    icon: [
      "flex shrink-0 items-center justify-center",
      "text-(--list-row-risk-ink,var(--list-row-ink-3)) [&>svg]:size-5 [&>svg]:shrink-0",
      "group-data-interactive/list-row:group-data-[tone=warning]/list-row:[&>svg]:size-4.5",
      "group-data-interactive/list-row:group-data-[tone=danger]/list-row:[&>svg]:size-4.5",
    ],
    body: ["flex min-w-0 flex-1 flex-col gap-0.5"],
    line: ["flex min-w-0 items-center gap-2"],
    title: [
      "min-w-0 flex-1 truncate",
      "text-body font-semibold",
      "group-data-[tone=unread]/list-row:font-bold",
      "text-(--list-row-risk-ink)",
    ],
    subtitle: [
      "min-w-0 flex-1 truncate",
      "text-footnote font-normal text-(--list-row-ink)",
    ],
    description: ["min-w-0 flex-1 truncate", "text-callout text-(--list-row-ink-2)"],
    meta: [
      "min-w-0 truncate",
      "font-mono text-mono-meta font-normal tabular-nums text-(--list-row-ink-3)",
    ],
    value: ["max-w-[45%] shrink-0 truncate", "text-subhead text-(--list-row-ink-3)"],
    chevron: [
      "flex shrink-0 items-center justify-center",
      "text-(--list-row-ink-3) [&>svg]:size-5 [&>svg]:shrink-0",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "min-h-16 pointer-coarse:min-h-14 pointer-coarse:py-2 [--list-row-rule-start:63px]",
      },
      plain: {
        root: ["py-(--settings-row-inset)", "[--list-row-rule-start:16px]"],
      },
      entry: { root: "" },
    },
    interactive: {
      true: {},
      false: {},
    },
    attached: {
      true: {},
      false: {},
    },
    cell: {
      false: {
        root: [
          "relative px-4",
          "transition-colors duration-100",
          "outline-none focus-visible:keyboard:inset-ring-2 focus-visible:keyboard:inset-ring-foreground",
          "data-selected:bg-info-soft",
        ],
      },
      true: {
        root: [...listCell, ...listCellFocus, "data-selected:before:bg-fill-cell-selected"],
      },
    },
    wrap: {
      true: { description: "whitespace-normal text-pretty" },
      false: {},
    },
  },
  compoundVariants: [
    {
      cell: false,
      attached: false,
      variant: ["default", "plain"],
      class: { root: hairline },
    },
    { variant: "plain", attached: true, class: { root: "pt-0" } },
    {
      cell: false,
      attached: true,
      interactive: false,
      variant: ["default", "plain"],
      class: { root: attachedAfterTarget },
    },
    {
      variant: "plain",
      attached: true,
      interactive: false,
      class: {
        root: "[[data-slot=list-row][data-interactive]:not([data-attached])+&]:pt-(--settings-row-inset)",
      },
    },
    { variant: "plain", attached: true, interactive: true, class: { root: "min-h-control" } },
    {
      cell: false,
      interactive: true,
      class: {
        root: [
          "not-disabled:not-aria-disabled:not-data-selected:hover:overlay-subtle",
          "not-disabled:not-aria-disabled:not-data-selected:active:overlay-medium",
          "not-data-selected:data-popup-open:overlay-subtle",
        ],
      },
    },
    { cell: true, interactive: true, class: { root: listCellStates } },
    {
      interactive: true,
      class: {
        root: [
          "not-disabled:not-aria-disabled:data-[tone=warning]:[--list-row-risk-ink:var(--warning-strong)]",
          "not-disabled:not-aria-disabled:data-[tone=danger]:[--list-row-risk-ink:var(--danger-strong)]",
        ],
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    interactive: true,
    attached: false,
    cell: false,
    wrap: false,
  },
});

export type ListRowVariant = "default" | "plain" | "entry";
export type ListRowTone = "default" | "unread" | "muted" | "away" | "warning" | "danger";
