import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

const textColorVariants = {
  default: "text-foreground",
  primary: "text-brand-strong",
  information: "text-info-strong",
  muted: "text-foreground-muted",
  placeholder: "text-foreground-hint",
  accent: "text-attention-700",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export const headingVariants = tv({
  base: "m-0 font-heading font-medium text-foreground",
  variants: {
    level: {
      1: "text-[56px] tracking-[-0.01em] leading-16",
      2: "text-5xl tracking-[-0.01em] leading-14",
      3: "text-[40px] tracking-[-0.01em] leading-12",
      4: "text-[32px] tracking-[-0.005em] leading-10",
      5: "text-2xl leading-8",
      6: "text-xl leading-7",
    },
    variant: textColorVariants,
  },
  defaultVariants: { level: 1 },
});

export const sansVariants = tv({
  base: "m-0 font-sans font-normal",
  variants: {
    size: {
      large: "text-lg leading-7 text-foreground",
      body: "text-base leading-6 text-foreground",
      small: "text-sm leading-5 text-foreground-muted",
      caption: "text-xs leading-4 text-foreground-muted",
      group: "text-footnote font-bold text-foreground-hint",
    },
    variant: textColorVariants,
  },
  defaultVariants: { size: "body" },
});

export const monoVariants = tv({
  base: "m-0 font-mono font-normal",
  variants: {
    size: {
      code: "text-sm leading-5 text-foreground",
      meta: "text-xs leading-4 text-foreground-muted",
      tabular: "text-sm tabular-nums leading-5 text-foreground",
    },
    variant: textColorVariants,
  },
  defaultVariants: { size: "code" },
});

export type HeadingLevel = NonNullable<VariantProps<typeof headingVariants>["level"]>;
export type TextVariant = NonNullable<VariantProps<typeof sansVariants>["variant"]>;
export type TextSansSize = NonNullable<VariantProps<typeof sansVariants>["size"]>;
export type TextMonoSize = NonNullable<VariantProps<typeof monoVariants>["size"]>;
