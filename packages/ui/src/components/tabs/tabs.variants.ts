import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const tabs = tv({
  slots: {
    root: ["w-full"],
    list: [
      "relative isolate flex w-max max-w-full",
      "overscroll-contain whitespace-nowrap",
      "scrollbar-none [&::-webkit-scrollbar]:hidden",
      "mask-fade-x",
      "data-[sorting=true]:overflow-x-hidden data-[sorting=true]:overflow-y-hidden",
    ],
    tab: [
      "relative isolate flex shrink-0 cursor-pointer touch-manipulation select-none [-webkit-touch-callout:none] items-center gap-1.5 whitespace-nowrap outline-none",
      "font-sans text-callout font-semibold text-foreground-muted",
      "transition-[background-color,box-shadow,color] duration-100 ease-out",
      "after:absolute after:content-['']",
      "focus-visible:shadow-focus",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-2 [&_svg:not([class*='size-'])]:size-4",
      "data-disabled:pointer-events-none data-disabled:text-foreground-disabled",
      "data-[reorderable=true]:cursor-pointer data-[dragging-source=true]:cursor-grabbing",
    ],
    content: ["relative z-raised inline-flex items-center gap-[inherit]"],
    label: [""],
    indicator: ["hidden"],
    panel: ["outline-none"],
  },
  variants: {
    variant: {
      default: {
        list: ["gap-0.5"],
        tab: [
          "h-8 md:pointer-fine:h-control justify-center gap-1.5 rounded-control border-[1.5px] border-transparent px-3",
          "after:inset-x-0 after:-inset-y-1.5",
          "hover:bg-fill-medium active:bg-fill-medium",
          "data-active:border-sticker-ink data-active:bg-selected data-active:font-bold data-active:text-sticker-ink data-active:ring-[1.5px] data-active:ring-sticker-edge",
          "data-active:active:overlay-sticker-medium",
          "data-disabled:bg-transparent",
        ],
      },
      underline: {
        list: ["gap-5"],
        tab: [
          "h-11 justify-center rounded-none border-0 bg-transparent px-0",
          "after:inset-y-0 after:-inset-x-2.5",
          "hover:text-foreground active:text-foreground",
          "data-active:text-foreground",
        ],
      },
    },
    placement: {
      top: {
        list: ["items-center overflow-x-auto overflow-y-hidden"],
      },
      bottom: {
        root: "flex flex-col",
        list: ["order-last", "items-center overflow-x-auto overflow-y-hidden"],
      },
      left: {
        root: "flex items-start",
        panel: "min-w-0 flex-1",
        list: ["flex-col items-stretch overflow-x-hidden overflow-y-auto"],
        tab: ["justify-start"],
      },
      right: {
        root: "flex items-start",
        list: ["order-last", "flex-col items-stretch overflow-x-hidden overflow-y-auto"],
        panel: "min-w-0 flex-1",
        tab: ["justify-start"],
      },
    },
  },
  defaultVariants: {
    variant: "default",
    placement: "top",
  },
  compoundVariants: [
    {
      variant: "underline",
      placement: "top",
      class: { tab: "data-active:shadow-[inset_0_-2px_0_var(--foreground)]" },
    },
    {
      variant: "underline",
      placement: "bottom",
      class: { tab: "data-active:shadow-[inset_0_2px_0_var(--foreground)]" },
    },
    {
      variant: "underline",
      placement: "left",
      class: {
        list: "gap-0 border-r border-line-seam",
        tab: "h-9 px-4 data-active:shadow-[inset_-2px_0_0_var(--foreground)]",
      },
    },
    {
      variant: "underline",
      placement: "right",
      class: {
        list: "gap-0 border-l border-line-seam",
        tab: "h-9 px-4 data-active:shadow-[inset_2px_0_0_var(--foreground)]",
      },
    },
  ],
});

export type TabsPlacement = NonNullable<VariantProps<typeof tabs>["placement"]>;
export type TabsVariant = NonNullable<VariantProps<typeof tabs>["variant"]>;
