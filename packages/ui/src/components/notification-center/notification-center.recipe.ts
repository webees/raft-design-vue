import { headEdgePull } from "../../lib/head-edges";
import { tv } from "../../lib/tv";

export const notificationCenter = tv({
  slots: {
    trigger: [
      "relative inline-flex size-10 items-center justify-center overflow-visible p-0",
      "rounded-control border-[1.5px] border-transparent bg-transparent text-foreground-on-frame",
      "select-none outline-none",
      "hover:bg-fill-frame-medium active:bg-fill-frame-medium data-popup-open:bg-fill-frame-medium",
      "focus-visible:shadow-focus",
      "[&_svg]:size-5 [&_svg]:shrink-0",
    ],
    triggerIcon: ["relative inline-flex size-5 items-center justify-center"],
    triggerBell: ["size-5 shrink-0 text-current"],
    triggerDot: ["pointer-events-none absolute top-1.5 right-1.5"],
    popup: [
      "flex flex-col overflow-hidden",
      "rounded-container bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
    header: [
      "flex items-center px-4",
      "min-h-13 gap-2 border-b border-line-seam py-0",
      headEdgePull,
    ],
    title: ["font-sans text-headline text-foreground"],
    count: ["ml-auto", "font-mono text-mono-meta text-foreground-hint"],
    scroller: ["min-h-0 flex-1"],
    list: [],
    item: [
      "group/notification-center-item relative px-4 py-3",
      "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-4 before:hidden before:border-t before:border-line-hairline",
      "not-first:before:block has-data-[slot=notification-center-item-icon]:before:left-[63px]",
    ],
    itemRow: ["flex items-start", "gap-3"],
    itemIcon: [
      "flex shrink-0 items-center justify-center",
      "mt-0 size-[35px] rounded-control bg-fill-muted text-foreground-muted",
      "[&_svg]:size-[18px]",
    ],
    itemContent: ["min-w-0 flex-1"],
    itemTitle: [
      "wrap-break-word",
      "font-sans text-subhead font-bold text-foreground",
      "group-data-read/notification-center-item:font-semibold group-data-read/notification-center-item:text-foreground-muted",
    ],
    itemBody: [
      "mt-0.5 wrap-break-word",
      "line-clamp-2 font-sans text-callout text-foreground-muted",
    ],
    itemActions: ["flex items-center", "mt-2 ml-0 flex-wrap justify-start gap-2"],
    actionButton: [],
  },
  variants: {
    viewport: {
      desktop: { popup: "w-[380px]" },
      mobile: { popup: "w-[min(var(--available-width,calc(100vw-16px)),480px)]" },
    },
    size: {
      sm: { popup: "h-56" },
      md: { popup: "h-72" },
      lg: { popup: "h-96" },
    },
    read: {
      true: { item: ["opacity-100"] },
      false: {
        item: [
          "pr-[37px]",
          "after:pointer-events-none after:absolute after:top-[calc(--spacing(3)+(var(--text-subhead--line-height)-10px)/2)] after:right-4 after:size-2.5",
          "after:rounded-[2px] after:border-[1.5px] after:border-sticker-ink after:bg-attention-400",
        ],
      },
    },
    status: {
      error: { itemIcon: ["bg-warning-soft text-foreground"] },
      warning: { itemIcon: ["bg-warning-soft text-foreground"] },
      info: { itemIcon: ["bg-info-soft text-foreground"] },
      success: {},
    },
  },
  defaultVariants: {
    viewport: "desktop",
    size: "md",
    read: false,
    status: "info",
  },
});

export type NotificationCenterVariants = NonNullable<
  Parameters<typeof notificationCenter>[0]
>;
