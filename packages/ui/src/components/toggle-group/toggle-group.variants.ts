import { tv } from "../../lib/tv";

export const toggleGroup = tv({
  slots: {
    root: [
      "inline-flex max-w-full items-center",
      "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "gap-[3px] rounded-[11px] bg-fill-muted p-[3px]",
    ],
    item: [
      "inline-flex h-8 md:pointer-fine:h-control min-w-0 shrink-0 items-center justify-center gap-1.5",
      "whitespace-nowrap",
      "outline-2 outline-offset-2 outline-transparent transition-[background-color,color,box-shadow,transform] duration-100",
      "disabled:pointer-events-none data-[disabled]:cursor-not-allowed",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "rounded-control border-[1.5px] border-transparent bg-transparent px-3",
      "font-sans text-callout font-semibold text-foreground-muted",
      "[&_svg:not([class*='size-'])]:size-4",
      "hover:bg-fill-medium active:bg-fill-medium",
      "data-[state=on]:border-sticker-ink data-[state=on]:bg-selected data-[state=on]:font-bold data-[state=on]:text-sticker-ink data-[state=on]:ring-[1.5px] data-[state=on]:ring-sticker-edge",
      "data-[state=on]:hover:bg-selected data-[state=on]:active:bg-selected data-[state=on]:active:overlay-sticker-medium",
      "focus-visible:shadow-focus",
      "data-[disabled]:opacity-100 data-[disabled]:text-foreground-disabled data-[disabled]:hover:bg-transparent",
    ],
    label: ["truncate"],
  },
});
