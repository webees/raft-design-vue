import { tv } from "../../lib/tv";

export const taskCompletionControl = tv({
  slots: {
    root: [
      "relative inline-flex size-5 shrink-0 touch-manipulation items-center justify-center outline-none",
      "cursor-pointer rounded-full data-disabled:cursor-not-allowed",
      "after:absolute after:-inset-2 after:content-[''] pointer-coarse:after:-inset-3",
      "focus-visible:shadow-focus",
    ],
    indicator: "pointer-events-none",
  },
  variants: {
    preview: {
      true: {
        root: "hover:*:data-[slot=checkbox-indicator-graphic]:text-foreground/20",
        indicator: "group-hover:text-transparent",
      },
      false: {},
    },
  },
});
