import { tv } from "../../lib/tv";

export const mobileNav = tv({
  slots: {
    root: [
      "grid w-full flex-none grid-flow-col auto-cols-fr items-start gap-0",
      "border-t border-line-seam bg-layer-card px-2 pt-1.5 text-foreground-hint",
      "pb-[max(8px,min(env(safe-area-inset-bottom,0px),34px))]",
    ],
    item: [
      "relative inline-flex shrink-0 items-center outline-none",
      "disabled:pointer-events-none disabled:opacity-45",
      "[&_svg]:shrink-0",
      "isolate min-w-0 flex-col justify-start gap-[7px] border-0 px-0 pt-1 pb-0",
      "font-sans text-[10px]/3 font-semibold text-foreground-hint",
      "*:relative *:z-raised [&_svg]:size-[22px] [&_svg]:stroke-2",
      "before:pointer-events-none before:absolute before:top-0 before:left-1/2 before:z-base before:-translate-x-1/2",
      "before:h-[30px] before:w-14 before:rounded-control before:border-[1.5px] before:border-transparent before:content-['']",
      "active:before:bg-fill-medium",
      "data-[selected=true]:font-bold data-[selected=true]:text-foreground",
      "data-[selected=true]:[&_svg]:text-sticker-ink",
      "data-[selected=true]:before:border-sticker-ink data-[selected=true]:before:bg-selected data-[selected=true]:before:ring-[1.5px] data-[selected=true]:before:ring-sticker-edge",
      "data-[selected=true]:active:before:overlay-sticker-medium",
      "rounded-control focus-visible:shadow-focus",
    ],
    itemLabel: ["min-w-0 truncate", "max-w-full"],
  },
});
