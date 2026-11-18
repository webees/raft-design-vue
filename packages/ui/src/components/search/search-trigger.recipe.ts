import { tv } from "../../lib/tv";

export const searchTrigger = tv({
  slots: {
    root: [
      "relative inline-flex h-(--frame-item-height) w-[clamp(360px,32vw,520px)] max-w-full min-w-0 shrink-0 items-center gap-2 px-3",
      "rounded-control border-[1.5px] border-line-field bg-layer-card",
      "text-left font-sans text-body font-normal text-foreground-hint",
      "select-none outline-none transition-colors duration-100",
      "active:overlay-medium focus-visible:shadow-focus",
      "disabled:cursor-not-allowed disabled:border-line-hairline disabled:bg-fill-muted disabled:bg-none disabled:text-foreground-disabled",
      "aria-disabled:cursor-not-allowed aria-disabled:border-line-hairline aria-disabled:bg-fill-muted aria-disabled:bg-none aria-disabled:text-foreground-disabled",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-[18px]",
    ],
    label: ["min-w-0 flex-1 truncate"],
    shortcut: ["ml-auto shrink-0"],
  },
});
