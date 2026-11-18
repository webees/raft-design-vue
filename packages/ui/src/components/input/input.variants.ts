import { tv } from "../../lib/tv";

export const inputVariants = tv({
  slots: {
    root: [
      "h-control w-full px-3 py-0 font-heading text-field font-field outline-none",
      "rounded-(--control-radius) border-[1.5px] border-line-field bg-layer-card",
      "text-foreground placeholder:text-foreground-hint",
      "shadow-none transition-shadow duration-90 ease-out focus-visible:shadow-focus",
      "data-[invalid]:border-danger-strong",
      "disabled:cursor-not-allowed disabled:border-line-hairline disabled:bg-fill-muted disabled:text-foreground-disabled disabled:placeholder:text-foreground-disabled",
    ],
  },
});
