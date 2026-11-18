import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const labelVariants = tv({
  slots: {
    root: [
      "group/label inline-flex w-fit items-center gap-1",
      "cursor-pointer select-none",
      "text-sm leading-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:text-foreground-disabled",
      "font-sans font-semibold text-foreground-muted",
    ],
    asterisk: [
      "group-data-[disabled]/label:text-foreground-disabled",
      "text-foreground-hint",
    ],
    sub: [
      "normal-case",
      "group-data-[disabled]/label:text-foreground-disabled",
      "font-normal tracking-normal text-foreground-hint",
    ],
  },
  variants: {
    size: {
      sm: { root: ["text-caption font-semibold"] },
      md: { root: ["text-footnote font-semibold"] },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LabelSize = NonNullable<VariantProps<typeof labelVariants>["size"]>;
