import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const popover = tv({
  slots: {
    trigger: ["select-none"],
    positioner: ["isolate z-popup outline-none"],
    content: [
      "max-h-(--available-height) min-w-[220px] overflow-hidden",
      "outline-none",
      "rounded-container bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
    header: ["flex items-center justify-between px-3", "min-h-11 gap-2 py-1.5 pr-1.5 pl-4"],
    body: ["flex min-w-0 flex-col gap-1.5", "px-4 pt-4 pb-3 last:pb-4"],
    actions: ["flex flex-wrap items-center justify-end gap-2", "px-4 pb-3 last:pb-4"],
    separator: ["border-t", "border-line-hairline"],
    title: ["m-0", "font-sans text-headline font-bold text-foreground"],
    description: ["m-0", "font-sans text-footnote text-foreground-muted"],
    close: [
      "inline-flex items-center justify-center",
      "outline-none transition-colors",
      "h-8 min-w-8 rounded-chip px-1.5",
      "font-sans text-footnote font-bold text-foreground",
      "hover:bg-fill-medium active:bg-fill-medium",
      "focus-visible:shadow-focus",
      "[&_svg]:size-4.5",
    ],
    arrow: [
      "pointer-events-none fill-layer-popover stroke-line-seam",
      "data-[side=bottom]:-top-1",
      "data-[side=top]:-bottom-1",
      "data-[side=left]:-right-1",
      "data-[side=right]:-left-1",
    ],
    backdrop: ["fixed inset-0", "bg-transparent"],
    viewport: ["block"],
  },
  variants: {
    size: {
      default: {},
      item: {
        content: ["w-[400px] max-w-[calc(100vw-32px)]", "p-3"],
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type PopoverSize = NonNullable<VariantProps<typeof popover>["size"]>;
