import { tv } from "../../lib/tv";

export const descriptionList = tv({
  slots: {
    root: ["m-0"],
    item: ["", "[&+&]:pt-2"],
    label: [
      "m-0 flex items-center gap-1.5",
      "font-sans text-footnote font-medium text-foreground-hint",
      "[&>*[data-slot=button]]:-ml-[5px]",
    ],
    value: [
      "m-0 flex min-h-7 min-w-0 flex-wrap items-center gap-1.5",
      "font-sans text-callout text-foreground",
    ],
  },
  variants: {
    direction: {
      vertical: {},
      horizontal: {
        root: [
          "grid w-full items-baseline",
          "grid-cols-[minmax(88px,max-content)_minmax(0,1fr)] gap-x-4 gap-y-0.5",
          "[&>*[data-slot=description-item]]:contents",
          "[&[data-stacked]>[data-slot=description-item]>*]:col-span-full",
          "[&[data-stacked]>[data-slot=description-item]>[data-slot=description-details]]:min-h-0",
          "[&[data-stacked]>[data-slot=description-item]+[data-slot=description-item]>[data-slot=description-term]]:mt-2",
          "[&>[data-slot=description-item]>[data-slot=description-term]]:mb-0",
          "[&>[data-slot=description-item]>[data-slot=description-term]]:max-w-40",
          "[&>[data-slot=description-item]>[data-slot=description-term]]:min-w-0",
          "[&>[data-slot=description-item]>[data-slot=description-term]]:wrap-break-word",
          "[&>[data-slot=description-item]>[data-slot=description-details]]:min-h-8",
          "[&>[data-slot=description-item]>[data-slot=description-details]]:min-w-0",
          "[&>[data-slot=description-item]>[data-slot=description-details]]:wrap-break-word",
        ],
      },
      inline: {
        root: [
          "flex flex-wrap items-baseline gap-x-6 gap-y-2",
          "[&>*[data-slot=description-item]]:flex [&>*[data-slot=description-item]]:min-w-0",
          "[&>*[data-slot=description-item]]:items-baseline [&>*[data-slot=description-item]]:gap-3",
          "[&>*[data-slot=description-item]]:max-w-[min(100%,24rem)]",
          "[&>[data-slot=description-item]>[data-slot=description-details]]:min-w-0",
          "[&>[data-slot=description-item]+[data-slot=description-item]]:pt-0",
          "[&>[data-slot=description-item]>[data-slot=description-term]]:shrink-0",
          "[&>[data-slot=description-item]>[data-slot=description-details]>[data-slot=badge]:first-child]:-ml-1.5",
          "[&>[data-slot=description-item]>[data-slot=description-details]>[data-slot=badge]:first-child]:max-w-[calc(100%+6px)]",
          "[&>[data-slot=description-item]>[data-slot=description-details]>:is([data-slot=task-chip],[data-slot=task-status-badge]):first-child]:-ml-[7px]",
          "[&>[data-slot=description-item]>[data-slot=description-details]>:is([data-slot=task-chip],[data-slot=task-status-badge]):first-child]:max-w-[calc(100%+7px)]",
          "[&>[data-slot=description-item]>[data-slot=description-details]>[data-slot=button]:first-child]:-ml-[7.5px]",
          "[&>[data-slot=description-item]>[data-slot=description-details]>[data-slot=button]:first-child]:px-1.5",
        ],
      },
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

export type DescriptionListDirection = "vertical" | "horizontal" | "inline";
