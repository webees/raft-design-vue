import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

import { stackedActions } from "../../lib/use-stacked-actions";

export const dialog = tv({
  slots: {
    overlay: ["fixed inset-0 z-dialog bg-layer-backdrop"],
    portal: [],
    content: [
      "fixed top-1/2 left-1/2 z-dialog flex w-[calc(100%-2rem)] -translate-1/2 flex-col",
      "max-h-[calc(100dvh-2rem)] outline-none",
      "overflow-clip rounded-dialog bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
    header: [
      "grid shrink-0 grid-cols-[minmax(0,1fr)_max-content] items-center min-w-0",
      "gap-2 px-(--surface-inset) pt-(--surface-inset)",
    ],
    body: [
      "min-w-0 flex-1 overflow-y-auto",
      "px-(--surface-inset) pt-1.5 pb-(--surface-inset) first:pt-(--surface-inset)",
      "font-sans text-subhead text-foreground-muted",
    ],
    // DialogBody with `unstable_scrollArea`: a ScrollArea with absolute
    // gutters. The frame is the dialog's flex child and holds the scrollbars;
    // the body inside it scrolls and stays the caller's to lay out.
    bodyFrame: [
      "min-h-0 min-w-0 flex-1",
      "[--dialog-body-top:--spacing(1.5)] first:[--dialog-body-top:var(--surface-inset)]",
    ],
    bodyScroll: [
      "min-h-0 min-w-0 flex-1",
      "px-(--surface-inset) pt-(--dialog-body-top) pb-(--surface-inset)",
      "font-sans text-subhead text-foreground-muted",
    ],
    footer: [
      "flex shrink-0 items-center justify-end",
      ...stackedActions,
      "gap-2 px-(--surface-inset) pb-(--surface-inset) first:pt-(--surface-inset) [[data-slot=dialog-header]+&]:pt-(--surface-inset)",
      "*:data-[slot=text-link]:text-footnote",
    ],
    footerNote: [
      "m-0 md:me-2 md:flex-1",
      "text-start font-sans text-footnote text-pretty text-foreground-muted md:whitespace-nowrap",
    ],
    footerActions: [
      "ms-auto flex shrink-0 items-center justify-end gap-2",
      ...stackedActions,
      "data-stacked:ms-0 data-stacked:w-full",
    ],
    title: ["m-0 min-w-0 text-foreground", "font-sans text-headline font-bold"],
    description: ["m-0", "font-sans text-subhead text-foreground-muted"],
    close: ["-my-1.5"],
  },
  variants: {
    size: {
      sm: { content: ["max-w-100"] },
      md: { content: ["max-w-md"] },
      lg: { content: ["max-w-160"] },
      wide: { content: ["max-w-4xl h-[min(760px,calc(100dvh-2rem))]"] },
    },
    placement: {
      center: {},
      top: {
        content: [
          "md:top-(--dialog-top,8vh) md:translate-y-0",
          "md:max-h-[calc(100dvh-var(--dialog-top,8vh)-16px)]",
        ],
      },
    },
    // A phone's centred card while the on-screen keyboard is open.
    keyboard: {
      false: {},
      true: {
        content: [
          "data-soft-keyboard:top-[calc(var(--dialog-visible-top)+env(safe-area-inset-top,0px)+var(--header-height))] data-soft-keyboard:translate-y-0",
          "data-soft-keyboard:max-h-[calc(var(--dialog-visible-height)-env(safe-area-inset-top,0px)-var(--header-height)-16px)]",
        ],
      },
    },
    bar: {
      false: {},
      true: {
        header: [
          "flex h-(--header-height) shrink-0 items-center gap-2 border-b px-(--surface-inset) py-0",
          "border-line-seam pt-0 *:data-[slot=dialog-close]:my-0",
        ],
        body: ["flex min-h-0 flex-1 overflow-hidden p-0", "first:pt-0 text-foreground"],
        footer: [
          "shrink-0 border-t px-(--surface-inset) py-3",
          "border-line-seam py-3 first:pt-3 [[data-slot=dialog-header]+&]:pt-3",
        ],
      },
    },
    layer: {
      0: {},
      1: { overlay: ["z-dialog-layer"] },
    },
    lifted: {
      false: {},
      true: { portal: ["relative isolate z-dialog-layer"] },
    },
    nested: {
      false: {},
      true: { overlay: ["bg-layer-backdrop-nested"] },
    },
    start: {
      false: {},
      true: { footer: ["flex-wrap justify-between"] },
    },
  },
  defaultVariants: {
    size: "md",
    placement: "center",
    keyboard: false,
    bar: false,
    layer: 0,
    lifted: false,
    nested: false,
    start: false,
  },
});

export type DialogVariants = VariantProps<typeof dialog>;
