import { tv } from "../../lib/tv";

export const conversationPanel = tv({
  slots: {
    root: [
      "flex h-full min-h-0 min-w-0 flex-1 flex-col",
      "bg-layer-canvas font-sans text-foreground",
    ],
    content: ["flex min-h-0 min-w-0 flex-1 flex-col", "bg-layer-canvas"],
    tabs: [
      "shrink-0",
      "border-b border-line-seam bg-layer-canvas",
      "*:data-[slot=tabs-list]:w-full *:data-[slot=tabs-list]:px-5 max-md:*:data-[slot=tabs-list]:px-4 md:pointer-fine:*:data-[slot=tabs-list]:px-(--page-inset)",
      "*:data-[slot=tabs-list]:data-[variant=default]:py-2",
      "md:pointer-fine:*:data-[slot=tabs-list]:data-[variant=default]:py-[calc((var(--header-height)-1px-var(--control-height))/2)]",
    ],
    footer: ["pt-0", "bg-layer-canvas"],
  },
});

export const conversationPanelEmptyState = tv({
  slots: {
    root: [
      "flex h-full min-h-0 min-w-0 flex-1 flex-col items-center justify-center",
      "text-center",
      "gap-2 px-(--surface-inset) py-6",
      "font-sans text-headline font-bold normal-case text-foreground-muted",
    ],
    brand: ["shrink-0", "mb-1 inline-flex rounded-none p-0 text-foreground-hint"],
    brandMark: [
      "relative flex items-center justify-center",
      "[&>svg]:relative [&>svg]:z-raised",
      "size-9 overflow-visible rounded-none",
      "[&>svg]:size-9 [&>svg]:stroke-2",
    ],
  },
});
