import { tv } from "../../lib/tv";
import { chipRemoveBase } from "../../lib/chip-remove";

export const filterChip = tv({
  slots: {
    root: [
      "inline-flex h-8 md:pointer-fine:h-control min-w-0 shrink items-center",
      "gap-1.5 rounded-control bg-info-soft pr-1 pl-2.5",
      "font-sans text-control font-semibold text-foreground",
      "[&>svg]:pointer-events-none [&>svg]:shrink-0",
      "[&>svg:not([class*='size-'])]:size-3.5 [&>svg:not([class*='stroke-'])]:stroke-2",
    ],
    label: ["min-w-0 truncate"],
    remove: [
      ...chipRemoveBase,
      "relative size-6",
      "after:absolute after:content-['']",
      "pointer-coarse:after:-inset-y-2.5 pointer-coarse:after:-left-1.5 pointer-coarse:after:-right-3.5",
    ],
  },
});
