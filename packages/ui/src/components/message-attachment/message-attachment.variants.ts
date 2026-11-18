import { tv } from "../../lib/tv";

export const messageAttachment = tv({
  slots: {
    group: "flex max-w-[360px] flex-wrap items-start gap-2",
    card: [
      "group/attachment relative inline-flex h-20 w-44 min-w-44 max-w-44 shrink-0 flex-col overflow-hidden",
      "text-left",
      "rounded-container border border-line-hairline bg-layer-card py-2 pr-[calc(var(--control-embedded-inset)-1px)] pl-2.5 text-foreground",
      "outline-none hover:overlay-subtle active:overlay-medium focus-visible:shadow-focus",
      "[&_[data-slot=message-attachment-action]_svg]:size-4",
    ],
    title: [
      "block w-full max-w-full shrink-0 truncate",
      "pr-1 font-sans text-callout font-semibold text-foreground",
    ],
    meta: [
      "mt-auto flex w-full min-w-0 max-w-full items-center justify-between",
      "gap-2 font-mono text-mono-meta text-foreground-hint",
    ],
    metaStart: "min-w-0 flex-1 truncate",
    metaEnd: [
      "ml-auto inline-flex shrink-0 items-center gap-1 self-stretch",
      "[&_svg]:size-[10px] [&_svg]:shrink-0",
    ],
    summary: [
      "mt-0.5 inline-flex shrink-0 items-center whitespace-nowrap",
      "[&_svg]:shrink-0",
      "pr-1 font-mono text-mono-meta text-foreground-hint [&_svg]:size-3.5",
    ],
    commentSummary: "gap-[2.5px]",
    diffSummary: "gap-1.5",
    diffAddition: ["text-success-strong"],
    diffDeletion: ["text-danger-strong"],
    action: [
      "relative flex items-center justify-center",
      "before:absolute before:-inset-1 before:content-['']",
      "[&_svg]:shrink-0",
      "-mt-1 mb-[calc(var(--control-embedded-inset)-9px)] size-6 self-end rounded-chip text-foreground",
      "outline-none hover:bg-fill-medium active:bg-fill-medium",
      "focus-visible:shadow-focus",
      "[&_svg]:size-4",
    ],
  },
});

export const messageImageGallery = tv({
  slots: {
    root: ["@container/gallery w-full max-w-[min(360px,100%)] stack-y-1"],
    row: ["grid", "gap-1"],
    item: [
      "group/img relative overflow-hidden text-left",
      "rounded-control border border-line-hairline bg-fill-muted",
    ],
    media: "block size-full ",
    overlay: "absolute inset-0 flex items-center justify-center bg-layer-veil",
    preview: [
      "absolute inset-0",
      "transition-colors duration-75 hover:bg-ink-8",
      "outline-none focus-visible:keyboard:inset-ring-2 focus-visible:keyboard:inset-ring-foreground",
    ],
    action: [
      "absolute z-raised hidden items-center justify-center",
      "focus:flex",
      "group-hover/img:flex",
      "right-[calc(var(--control-embedded-inset)-1px)] bottom-[calc(var(--control-embedded-inset)-1px)] size-8 rounded-chip border-[1.5px] border-line-strong",
      "bg-layer-card text-foreground hover:overlay-medium active:overlay-medium",
      "outline-none focus-visible:shadow-focus",
      "[&_svg]:size-4",
    ],
  },
  defaultVariants: {
    single: false,
  },
  compoundVariants: [
    {
      count: 1,
      single: false,
      class: { row: "auto-rows-[8rem] @min-[360px]/gallery:auto-rows-[9rem]" },
    },
    {
      count: 2,
      single: false,
      class: { row: "auto-rows-[8rem] @min-[360px]/gallery:auto-rows-[9rem]" },
    },
    {
      count: 3,
      single: false,
      class: { row: "auto-rows-[7rem] @min-[360px]/gallery:auto-rows-[8rem]" },
    },
  ],
  variants: {
    count: {
      1: { row: "grid-cols-1" },
      2: { row: "grid-cols-2" },
      3: { row: "grid-cols-3" },
    },
    single: {
      true: { item: ["inline-block w-fit max-w-[26rem] justify-self-start", "rounded-container"] },
    },
    laidOut: {
      true: { item: "[&_img]:block [&_img]:size-full" },
    },
    fit: {
      cover: { item: "[&_img]:object-cover" },
      contain: { item: ["[&_img]:object-contain", "[&_img]:bg-transparent"] },
    },
  },
});

export const messageVideoPreview = tv({
  slots: {
    root: [
      "group/video relative aspect-video w-full overflow-hidden",
      "bg-black text-left",
      "max-w-[min(360px,100%)] rounded-container border border-line-hairline bg-clip-padding",
    ],
    media: "block size-full  bg-black object-contain",
    fallback: "flex size-full  items-center justify-center bg-black text-white",
    failureContent: [
      "flex max-w-[256px] flex-col items-center px-4 text-center",
      "gap-2 font-sans text-caption font-semibold",
    ],
    failureIcon: ["[&_svg]:size-6 [&_svg]:stroke-2"],
    failureTitle: [],
    failureAction: [
      "inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-white/75 [font:inherit]",
      "decoration-[1.5px] underline-offset-[3px] hover:text-white hover:underline",
      "outline-1 outline-offset-2 outline-transparent focus-visible:keyboard:outline-white",
      "[&_svg]:size-[13px]",
    ],
    action: [
      "absolute flex items-center justify-center",
      "transition-colors duration-150",
      "outline-[1px] outline-offset-2 outline-transparent focus-visible:keyboard:outline-foreground",
      "disabled:cursor-default [&_svg]:shrink-0",
      "top-[calc(var(--control-embedded-inset)-1px)] right-[calc(var(--control-embedded-inset)-1px)] size-8 rounded-chip border-[1.5px] border-line-strong",
      "bg-layer-card text-foreground hover:overlay-medium active:overlay-medium",
      "outline-none focus-visible:shadow-focus",
      "disabled:border-line-hairline disabled:bg-fill-muted disabled:bg-none disabled:text-foreground-disabled",
      "[&_svg]:size-4",
    ],
  },
});
