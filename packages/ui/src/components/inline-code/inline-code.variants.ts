import { tv } from "../../lib/tv";

export const inlineCode = tv({
  slots: {
    root: [
      "rounded-sticker px-1 py-px",
      "font-mono text-[0.875em] font-normal text-foreground wrap-anywhere",
      "bg-fill-muted",
    ],
  },
  variants: {
    appearance: {
      default: {},
      message: {
        root: [
          "inline border-0 px-1 align-baseline",
          "[font-size:0.875em] leading-[1.3em] font-normal",
          "wrap-anywhere",
          "rounded-sticker bg-fill-muted pt-[calc(1px-0.0275em)] pb-[calc(1px+0.0275em)] text-foreground",
        ],
      },
    },
  },
  defaultVariants: {
    appearance: "default",
  },
});
