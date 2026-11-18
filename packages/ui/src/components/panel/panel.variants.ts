import { barButtonHit, barIconInset, headEdges } from "../../lib/head-edges";
import { tv } from "../../lib/tv";

export const panel = tv({
  slots: {
    root: ["[--panel-footer-clearance:10rem]", "bg-layer-canvas text-foreground"],
    header: ["[@media(max-height:600px)]:h-(--header-height-short)"],
    body: ["relative min-h-0 flex-1 overflow-hidden"],
    scrollViewport: ["h-full min-h-0", "[overflow-anchor:auto]"],
    nativeScrollViewport: [
      "h-full min-h-0 overflow-y-auto overscroll-contain",
      "[overflow-anchor:auto] [-webkit-overflow-scrolling:touch]",
    ],
    scrollContent: ["min-h-full"],
    section: ["border-t px-(--surface-inset) py-4", "border-line-hairline"],
    footer: [
      "relative flex shrink-0 items-center pt-3",
      "bg-layer-canvas",
      "px-(--column-margin)",
      "pb-[calc(env(safe-area-inset-bottom)+1rem)] max-md:pb-[calc(env(safe-area-inset-bottom)+0.5rem)]",
    ],
  },
  variants: {
    edge: {
      inset: { root: "group/panel-frame" },
      attached: {
        root: ["group/panel-frame", "border-l border-line-seam max-md:border-l-0"],
      },
    },
  },
});

const headBar = [
  "flex h-(--shell-header-height,var(--header-height)) shrink-0 items-center gap-3 max-md:gap-2",
  headEdges,
  "border-b border-line-seam bg-layer-canvas text-foreground",
  "max-md:sticky max-md:top-0 max-md:z-chrome",
];

export const panelHeadEdges = headEdges;

export const panelHeadActions = [
  "flex shrink-0 items-center gap-0.5 md:pointer-fine:gap-1",
  barIconInset,
];

export const panelHeader = tv({
  slots: {
    header: headBar,
    sectionHeader: [
      ...headBar,
      "max-md:bg-layer-frame max-md:text-foreground-on-frame",
      "max-md:*:data-[slot=panel-header-icon]:hidden",
      "max-md:**:data-[slot=panel-title]:text-foreground-on-frame",
      "max-md:**:data-[slot=panel-title-trigger]:text-foreground-on-frame",
      "max-md:**:data-[slot=panel-title-trigger]:[&>svg]:text-foreground-on-frame-muted",
      "max-md:**:data-[slot=panel-title-trigger]:hover:bg-fill-frame-medium max-md:**:data-[slot=panel-title-trigger]:active:bg-fill-frame-medium max-md:**:data-[slot=panel-title-trigger]:data-popup-open:bg-fill-frame-medium",
      "max-md:**:data-[slot=panel-meta]:text-foreground-on-frame-muted",
      "max-md:**:data-[slot=panel-action]:text-foreground-on-frame",
      "max-md:**:data-[slot=panel-action]:hover:bg-fill-frame-medium max-md:**:data-[slot=panel-action]:active:bg-fill-frame-medium",
    ],
    headerIcon: [
      "flex size-[27px] shrink-0 items-center justify-center",
      "md:pointer-fine:size-(--bar-button-size) md:pointer-fine:rounded-(--bar-button-radius)",
      "rounded-sticker border-[1.5px] border-sticker-ink bg-brand text-sticker-ink ring-[1.5px] ring-sticker-edge",
      "not-data-[icon-kind=avatar]:[&_svg]:size-3.5 not-data-[icon-kind=avatar]:[&_svg]:stroke-2",
      "data-[icon-kind=avatar]:size-auto data-[icon-kind=avatar]:border-transparent data-[icon-kind=avatar]:bg-transparent",
    ],
    headerContent: [
      "flex min-w-0 flex-1 flex-col justify-center",
      "md:flex-row md:items-baseline md:justify-start md:gap-2",
    ],
    heading: "flex min-w-0 items-center gap-2",
    title: "truncate font-sans text-headline font-bold text-foreground",
    meta: [
      "min-w-0 truncate font-sans text-caption text-foreground-hint",
      "md:flex-1 md:shrink-1000",
    ],
    status: [
      "inline-flex shrink-0 items-center gap-1 border-0 bg-transparent p-0",
      "font-sans text-caption font-medium normal-case text-foreground-hint",
      "[&_svg]:size-3.5 [&_svg]:shrink-0",
    ],
    activity: [
      "inline-flex shrink-0 items-center gap-1.5",
      "font-sans text-caption text-foreground-hint",
      "[&_svg]:size-3.5 [&_svg]:shrink-0",
      "*:data-[slot=status]:lead-dot",
    ],
    actions: ["flex shrink-0 items-center gap-0.5 md:pointer-fine:gap-1", barIconInset],
  },
  variants: {
    size: {
      sm: {},
      md: { meta: ["text-footnote"] },
    },
  },
  defaultVariants: { size: "sm" },
});

const panelActionBase = [
  "relative inline-flex w-auto shrink-0 items-center justify-center",
  "overflow-visible font-sans leading-none tabular-nums select-none outline-none",
  "transition-all duration-100",
  "[&>svg]:pointer-events-none [&>svg]:shrink-0",
  "h-(--bar-button-size) min-w-(--bar-button-size) rounded-(--bar-button-radius) border-[1.5px] border-transparent bg-transparent py-0",
  "px-2 md:pointer-fine:px-[calc((var(--bar-button-size)-var(--control-icon-size)-3px)/2)]",
  barButtonHit,
  "text-foreground",
  "hover:bg-fill-medium active:bg-fill-medium",
  "focus-visible:shadow-focus",
  "[&>svg]:size-control-icon",
  barIconInset,
];

export const panelAction = tv({
  base: [
    ...panelActionBase,
    "whitespace-nowrap",
    "disabled:pointer-events-none disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "disabled:bg-transparent disabled:text-foreground-disabled disabled:opacity-100",
    "aria-pressed:border-sticker-ink aria-pressed:bg-selected aria-pressed:text-sticker-ink aria-pressed:ring-[1.5px] aria-pressed:ring-sticker-edge",
    "aria-pressed:active:overlay-sticker-medium",
  ],
});

export const panelToggleAction = tv({
  base: [
    ...panelActionBase,
    "data-disabled:pointer-events-none data-disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "data-disabled:bg-transparent data-disabled:text-foreground-disabled data-disabled:opacity-100",
    "data-pressed:border-sticker-ink data-pressed:bg-selected data-pressed:text-sticker-ink data-pressed:ring-[1.5px] data-pressed:ring-sticker-edge",
    "data-pressed:active:overlay-sticker-medium",
  ],
});

export const panelSplitAction = tv({
  base: [
    "group/split-action relative inline-flex shrink-0 items-center",
    "rounded-control pointer-events-none",
    "has-[>[data-popup-open]]:[--split-action-main-tint:var(--fill-subtle)]",
  ],
});

const splitActionMainParts = [
  "pointer-events-auto rounded-e-none",
  "after:end-0",
  "focus-visible:z-raised aria-pressed:z-raised data-pressed:z-raised",
  "bg-(--split-action-main-tint,transparent)",
  "group-hover/split-action:bg-fill-subtle",
  "hover:bg-fill-medium active:bg-fill-medium",
];

export const panelSplitActionMain = tv({
  base: [
    ...panelActionBase,
    ...splitActionMainParts,
    "whitespace-nowrap",
    "disabled:pointer-events-none disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "disabled:bg-transparent disabled:text-foreground-disabled disabled:opacity-100",
    "aria-pressed:border-sticker-ink aria-pressed:bg-selected aria-pressed:text-sticker-ink aria-pressed:ring-[1.5px] aria-pressed:ring-sticker-edge",
    "aria-pressed:active:overlay-sticker-medium",
  ],
});

export const panelSplitActionToggle = tv({
  base: [
    ...panelActionBase,
    ...splitActionMainParts,
    "data-disabled:pointer-events-none data-disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "data-disabled:bg-transparent data-disabled:text-foreground-disabled data-disabled:opacity-100",
    "data-pressed:border-sticker-ink data-pressed:bg-selected data-pressed:text-sticker-ink data-pressed:ring-[1.5px] data-pressed:ring-sticker-edge",
    "data-pressed:active:overlay-sticker-medium",
  ],
});

export const panelSplitActionMenu = tv({
  base: [
    ...panelActionBase,
    "whitespace-nowrap",
    "disabled:pointer-events-none disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "disabled:bg-transparent disabled:text-foreground-disabled disabled:opacity-100",
    "pointer-events-auto min-w-0 rounded-s-none px-0",
    "w-6 me-5 md:pointer-fine:w-5 md:pointer-fine:me-0",
    "after:start-0 after:inset-e-[-21.5px] md:pointer-fine:after:-end-[calc(var(--spacing-control-hit)+1.5px)]",
    "focus-visible:z-raised",
    "[[data-split-action-main][data-pressed]~&]:[--split-action-menu-tint:var(--fill-subtle)]",
    "[[data-split-action-main][aria-pressed=true]~&]:[--split-action-menu-tint:var(--fill-subtle)]",
    "bg-(--split-action-menu-tint,transparent)",
    "group-hover/split-action:bg-fill-subtle",
    "hover:bg-fill-medium active:bg-fill-medium data-popup-open:bg-fill-medium",
    "[&>svg]:size-4",
  ],
});

export const panelTitleTrigger = tv({
  base: [
    ...panelActionBase,
    "whitespace-nowrap",
    "disabled:pointer-events-none disabled:transform-none",
    "gap-1.5 text-control font-bold",
    "disabled:bg-transparent disabled:text-foreground-disabled disabled:opacity-100",
    "aria-pressed:border-sticker-ink aria-pressed:bg-selected aria-pressed:text-sticker-ink aria-pressed:ring-[1.5px] aria-pressed:ring-sticker-edge",
    "max-w-full min-w-0 shrink justify-start gap-1",
    "text-headline",
    "[--title-trigger-inset:calc(--spacing(2)+1.5px)] md:pointer-fine:[--title-trigger-inset:var(--icon-inset)]",
    "border-0 px-(--title-trigger-inset) md:pointer-fine:px-(--title-trigger-inset) -ms-(--title-trigger-inset)",
    "max-md:h-auto",
    "max-md:after:inset-x-0 max-md:after:-inset-y-[calc((var(--control-height)+2*var(--control-hit-inset)-1lh)/2)]",
    "data-popup-open:bg-fill-medium",
    "[&>svg]:size-3.5 [&>svg]:text-foreground-muted",
  ],
});

export const panelTitleTriggerLabel = "min-w-0 truncate";

export const panelNotice = tv({
  slots: {
    root: [
      "flex shrink-0 items-start",
      "min-h-10 gap-2.5 border-b border-line-seam px-(--column-margin) py-2.5",
      "font-sans text-callout font-semibold text-foreground",
      "[&>svg]:lead-icon",
      "*:data-[slot=spinner]:lead-icon *:data-[slot=spinner]:w-4 *:data-[slot=spinner]:leading-[inherit]",
    ],
    content: ["min-w-0 flex-1"],
    actions: ["flex shrink-0 items-center", "-my-1.5 gap-3"],
  },
  variants: {
    status: {
      default: { root: ["bg-fill-muted"] },
      warning: { root: ["bg-warning-soft"] },
      destructive: { root: ["bg-danger-soft"] },
      info: { root: ["bg-info-soft"] },
      success: { root: ["bg-success-soft"] },
    },
  },
  defaultVariants: { status: "warning" },
});

export type PanelNoticeStatus = "default" | "warning" | "destructive" | "info" | "success";

export const PANEL_TITLE_TRIGGER_EXTRA_WIDTH = 23;
