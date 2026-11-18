import { tv } from "../../lib/tv";

export const messageForwardedBundle = tv({
  slots: {
    root: ["mt-1"],
    header: ["flex flex-wrap items-center justify-between", "gap-2"],
    headerContent: ["flex min-w-0 items-center", "gap-2"],
    headerLabel: [
      "inline-flex shrink-0 items-center",
      "gap-1 text-footnote font-bold text-foreground-muted [&_svg]:size-3.5",
    ],
    headerCount: ["shrink-0", "font-mono text-mono-meta text-foreground-hint"],
    source: [
      "min-w-0 truncate",
      "inline-flex items-center gap-1 rounded-[2px] text-caption font-semibold text-foreground-hint",
      "decoration-[1.5px] underline-offset-[3px] hover:text-foreground hover:underline",
      "outline-none focus-visible:shadow-focus",
      "[&_svg]:size-3.5",
    ],
    sourceLabel: [
      "min-w-0 truncate",
      "inline-flex items-center gap-1 text-caption text-foreground-hint [&_svg]:size-3.5",
    ],
    items: ["relative", ""],
    footerAction: [
      "inline-flex items-center gap-1 rounded-[2px] text-footnote font-semibold text-foreground",
      "decoration-[1.5px] underline-offset-[3px] hover:underline",
      "outline-none focus-visible:shadow-focus",
    ],
  },
  variants: {
    fullWidth: {
      true: { root: "w-full max-w-none" },
    },
    collapsed: {
      true: {
        items: ["max-h-40 overflow-clip", "mask-fade-b data-tight-fold:mask-fade-b-edge"],
      },
    },
  },
});

export const messageForwardedBundleItem = tv({
  slots: {
    root: ["px-3 py-2.5 text-body text-foreground"],
    meta: [
      "flex min-w-0 flex-wrap items-center",
      "mb-0.5 gap-1.5 font-mono text-mono-meta tabular-nums text-foreground-hint",
    ],
    author: ["font-sans text-footnote font-bold text-foreground"],
    itemContent: ["min-w-0 max-w-full wrap-break-word"],
    attachments: ["flex flex-wrap", "mt-1.5 gap-1.5"],
    attachment: [
      "inline-flex max-w-full items-center",
      "h-[22px] gap-1 rounded-chip bg-fill-muted pr-[6.5px] pl-[5.5px]",
      "text-caption font-semibold text-foreground [&_svg]:size-3.5",
    ],
    attachmentName: ["min-w-0 truncate"],
    attachmentMeta: ["shrink-0", "font-mono font-normal text-foreground-hint"],
  },
  variants: {
    action: {
      static: {},
      interactive: {
        attachment: [
          "cursor-pointer focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-offset-2 focus-visible:keyboard:outline-line-strong",
          "hover:overlay-medium active:overlay-medium",
          "focus-visible:outline-none focus-visible:shadow-focus",
        ],
      },
    },
  },
  defaultVariants: { action: "static" },
});

export const messageForwardedBundleGallery = tv({
  slots: {
    root: ["@container/bundle w-full min-w-0"],
    row: ["grid gap-2"],
    tile: ["[&_img]:block [&_img]:size-full [&_img]:object-cover"],
  },
  variants: {
    count: {
      1: { row: "grid-cols-1 auto-rows-32 @min-[360px]/bundle:auto-rows-36" },
      2: { row: "grid-cols-2 auto-rows-32 @min-[360px]/bundle:auto-rows-36" },
      3: { row: "grid-cols-3 auto-rows-28 @min-[360px]/bundle:auto-rows-32" },
    },
  },
});
