import { popupArrowClasses } from "../../lib/popup-arrow";
import { tv } from "../../lib/tv";
import { messageCard } from "../message-embed/message-embed.variants";

export const previewCard = tv({
  slots: {
    trigger: [],
    positioner: ["isolate z-popup outline-none"],
    popup: [
      "max-h-(--available-height) min-w-[220px] overflow-hidden",
      "outline-none",
      "origin-(--transform-origin) transform-gpu opacity-100 will-change-[transform,opacity]",
      "transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "starting:scale-[0.97] starting:opacity-0",
      "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-[0.99] data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
      "data-[instant]:transition-none",
      "data-[state=closed]:scale-[0.99] data-[state=closed]:opacity-0 data-[state=closed]:duration-150",
      "motion-reduce:transition-none",
      "rounded-container bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
    header: ["flex items-start gap-3", "px-4 pt-4 pb-3 last:pb-4"],
    separator: ["border-t", "border-line-hairline"],
    title: ["m-0 truncate", "font-sans text-headline font-bold text-foreground"],
    description: [
      "m-0 truncate",
      "px-4 py-3 last:pb-4 font-sans text-callout text-foreground-muted",
    ],
    arrow: popupArrowClasses,
  },
  variants: {
    size: {
      profile: { popup: "w-[300px]" },
      item: { popup: messageCard().popover() },
    },
  },
  defaultVariants: { size: "profile" },
});
