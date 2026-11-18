import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const textLinkVariants = tv({
  base: [
    "rounded-[2px]",
    "decoration-[1.5px] underline-offset-[3px] not-disabled:hover:underline",
    "outline-none focus-visible:shadow-focus",
    "disabled:cursor-not-allowed disabled:text-foreground-disabled",
  ],
  variants: {
    variant: {
      muted: ["font-medium text-foreground-muted", "hover:text-foreground"],
      strong: ["font-semibold text-foreground"],
    },
    inline: {
      true: [
        "box-decoration-clone",
        "aria-disabled:cursor-not-allowed aria-disabled:text-foreground-disabled aria-disabled:hover:no-underline",
      ],
    },
  },
  defaultVariants: {
    variant: "muted",
  },
});

export type TextLinkVariant = NonNullable<VariantProps<typeof textLinkVariants>["variant"]>;
