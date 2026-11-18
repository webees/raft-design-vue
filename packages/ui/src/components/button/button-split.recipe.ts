import { tv } from "../../lib/tv";

/** The Button variants a split button takes: the filled ones and the bordered one. */
export type ButtonSplitVariant = "primary" | "default" | "warning" | "danger";

/** The Button sizes a split button takes. */
export type ButtonSplitSize = "md" | "lg";

/** A Button with its menu, one shape in two parts. */
export const buttonSplit = tv({
  base: [
    "relative isolate inline-flex shrink-0 items-stretch",
    "rounded-control ring-sticker-edge",
    "data-sticker-edge:ring-[1.5px]",
    "data-[size=lg]:rounded-(--control-radius)",
  ],
});

export const buttonSplitMain = tv({
  base: ["rounded-e-none border-e-0", "ring-0 focus-visible:z-raised"],
});

export const buttonSplitMenu = tv({
  base: ["min-w-0 rounded-s-none px-0", "ring-0 focus-visible:z-raised", "after:inset-s-0"],
  variants: {
    variant: {
      primary: "data-popup-open:overlay-sticker-medium",
      warning: "data-popup-open:overlay-sticker-medium",
      danger: "data-popup-open:overlay-sticker-medium",
      default: "data-popup-open:overlay-medium",
    },
    size: {
      md: ["w-7", "after:-inset-e-[calc(--spacing(4)+1.5px)]"],
      lg: [
        "w-9 md:pointer-fine:w-7",
        "after:-inset-e-[calc(--spacing(2)+1.5px)] md:pointer-fine:after:-inset-e-[calc(--spacing(4)+1.5px)]",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
