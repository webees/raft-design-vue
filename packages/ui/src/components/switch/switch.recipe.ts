import { tv } from "../../lib/tv";

export const switchRecipe = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 touch-manipulation items-center outline-none",
      "transition-[background-color,box-shadow,transform] ease-out",
      "motion-reduce:transition-none",
      "not-data-disabled:cursor-pointer",
      "data-disabled:cursor-not-allowed",
      "after:absolute after:-inset-x-3 after:-inset-y-[calc((44px-var(--switch-height))/2+1.5px)] after:content-['']",
      "focus-visible:ring-line-strong focus-visible:ring-offset-layer-sidebar",
      "h-(--switch-height) w-(--switch-width) rounded-full border-[1.5px] border-line-strong bg-fill-muted p-[2.5px]",
      "duration-150",
      "data-[state=checked]:border-sticker-ink data-[state=checked]:bg-selected data-[state=checked]:ring-[1.5px] data-[state=checked]:ring-sticker-edge",
      "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-focus",
      "data-disabled:border-foreground-disabled data-disabled:bg-fill-muted",
      "data-[state=checked]:data-disabled:border-foreground-disabled data-[state=checked]:data-disabled:bg-fill-muted",
    ],
    thumb: [
      "pointer-events-none block",
      "transition-transform ease-out",
      "motion-reduce:transition-none",
      "size-[calc(var(--switch-height)-8px)] rounded-full bg-layer-card shadow-[0_0_0_1.5px_var(--line-strong)] data-[state=checked]:translate-x-[calc(var(--switch-width)-var(--switch-height))]",
      "duration-220 ease-slide",
      "data-[state=checked]:bg-sticker-paper data-[state=checked]:shadow-[0_0_0_1.5px_var(--sticker-ink)]",
      "data-disabled:bg-fill-muted data-disabled:shadow-[0_0_0_1.5px_var(--foreground-disabled)]",
      "data-[state=checked]:data-disabled:bg-fill-muted data-[state=checked]:data-disabled:shadow-[0_0_0_1.5px_var(--foreground-disabled)]",
    ],
  },
});
