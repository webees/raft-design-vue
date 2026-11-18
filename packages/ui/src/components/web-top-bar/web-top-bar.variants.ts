import { tv } from "../../lib/tv";

export const webTopBar = tv({
  slots: {
    root: [
      "grid grid-cols-[1fr_auto_1fr] items-center",
      "h-[calc(var(--frame-item-height)+2*var(--header-air))] shrink-0",
      "border-b border-line-seam",
      "bg-layer-frame text-foreground-on-frame frame-decor-top",
    ],
    start: [
      "flex items-center justify-start pe-2",
      "ps-[calc(var(--raft-frame-inset-start,0px)+(var(--rail-width)-1px-var(--rail-item))/2)]",
      "[@media(max-height:600px)]:ps-[calc(var(--raft-frame-inset-start,0px)+(var(--rail-width-short)-1px-var(--rail-item-short))/2)]",
    ],
    center: ["flex min-w-40 items-center justify-center"],
    end: [
      "flex items-center justify-end ps-2",
      "pe-[calc(var(--raft-frame-inset-end,0px)+var(--column-margin))]",
      "[&>[data-icon-inset]:nth-last-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-me-icon-inset",
    ],
  },
});
