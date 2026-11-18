import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const iconTile = tv({
  slots: {
    root: ["inline-flex shrink-0 items-center justify-center", "rounded-sticker [&_svg]:shrink-0"],
  },
  variants: {
    variant: {
      default: { root: "bg-fill-muted text-foreground-muted" },
      warning: { root: "bg-warning-soft text-foreground" },
      information: { root: "bg-info-soft text-foreground" },
    },
    size: {
      xs: { root: "size-[19px] [&_svg:not([class*='size-'])]:size-[11px]" },
      sm: { root: "size-[27px] rounded-chip [&_svg:not([class*='size-'])]:size-3.5" },
      md: { root: "size-[35px] rounded-control [&_svg:not([class*='size-'])]:size-[18px]" },
      lg: { root: "size-[51px] rounded-container [&_svg:not([class*='size-'])]:size-[22px]" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type IconTileVariant = NonNullable<VariantProps<typeof iconTile>["variant"]>;
export type IconTileSize = NonNullable<VariantProps<typeof iconTile>["size"]>;
