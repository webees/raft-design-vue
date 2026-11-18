import { tv } from "../../lib/tv";

export const messageList = tv({
  slots: {
    root: ["relative h-full min-h-0"],
    viewport: ["size-full min-h-0 min-w-0 overscroll-none"],
    content: ["flex min-h-full w-full min-w-0 flex-col"],
    dateDividerRoot: [
      "flex select-none items-center",
      "gap-2 px-4",
      "pt-[calc(var(--spacing-timeline-section)-var(--spacing-timeline-row)-var(--text-mono-meta--line-height)/2)]",
      "pb-[calc(var(--spacing-timeline-section)-var(--spacing-timeline-lead)-var(--text-mono-meta--line-height)/2)]",
    ],
    dateDividerRule: ["flex-1", "min-w-3 border-t border-line-hairline"],
    dateDividerChip: [
      "inline-flex items-center",
      "font-mono text-mono-meta whitespace-nowrap text-foreground-hint",
    ],
    endFade: [
      "pointer-events-none absolute inset-x-0 bottom-0 z-raised",
      "h-timeline-section",
      "bg-linear-to-t from-layer-canvas to-transparent",
    ],
    notice: ["text-center", "pt-timeline-lead pb-timeline-row font-mono text-mono-meta"],
    historyLimited: [
      "inline-flex items-center",
      "h-[22px] gap-1 rounded-chip px-1.5",
      "font-mono text-mono-meta text-foreground-muted",
      "inset-ring inset-ring-line-hairline",
      "[&_svg]:size-3",
    ],
  },
  variants: {
    tone: {
      faint: {
        notice: ["text-foreground-hint"],
      },
      muted: {
        notice: ["text-foreground-muted"],
      },
    },
  },
  defaultVariants: {
    tone: "faint",
  },
});

export const messageListJump = tv({
  slots: {
    controls: [
      "absolute inset-x-0 z-float mx-auto",
      "flex w-fit max-w-[calc(100%-1.5rem)] flex-wrap items-center justify-center gap-x-2 gap-y-3",
    ],
    group: [
      "inline-flex shrink-0 items-stretch",
      "*:data-[slot=message-list-jump-pill]:rounded-e-none",
    ],
    dismiss: [
      "rounded-s-none border-s-0",
      "text-foreground-muted hover:text-foreground",
      "[&_svg:not([class*='size-'])]:size-4",
      "after:-inset-y-[calc(--spacing(1.5)+1.5px)] after:right-[calc(-0.75rem-1.5px)] after:left-0",
      "md:pointer-fine:after:-inset-y-[calc(var(--control-hit-inset)+1.5px)]",
      "md:pointer-fine:after:right-[calc(-2*var(--control-hit-inset)-1.5px)] md:pointer-fine:after:left-0",
    ],
  },
  variants: {
    side: {
      bottom: {
        controls: [
          "bottom-[calc(--spacing(3)+var(--message-list-bottom-inset,0px))]",
          "flex-wrap-reverse",
        ],
      },
      top: { controls: ["top-3"] },
    },
  },
  defaultVariants: {
    side: "bottom",
  },
});
