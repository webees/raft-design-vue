import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const skeletonVariants = tv({
  slots: {
    root: [
      "animate-pulse motion-reduce:animate-none pointer-events-none",
      "data-[variant=line]:rounded-sticker data-[variant=line]:bg-fill-muted",
      "data-[variant=block]:rounded-sticker data-[variant=block]:bg-fill-muted",
    ],
  },
  variants: {
    variant: {
      line: { root: "h-3" },
      block: { root: "" },
      circle: { root: "rounded-sticker bg-fill-muted" },
    },
  },
  defaultVariants: {
    variant: "block",
  },
});

export type SkeletonVariant = NonNullable<VariantProps<typeof skeletonVariants>["variant"]>;
