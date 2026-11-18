import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const spinnerVariants = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 items-center justify-center",
      "leading-none text-current",
      "[--spinner-pixel:5px] [--spinner-gap:2px]",
    ],
    ring: [
      "shrink-0",
      "grid size-auto grid-cols-[repeat(2,var(--spinner-pixel))] gap-(--spinner-gap)",
    ],
    pixel: ["block size-(--spinner-pixel) rounded-[1px] bg-current opacity-20"],
  },
  variants: {
    size: {
      xs: { root: ["[--spinner-pixel:4px] [--spinner-gap:1.5px]"] },
      sm: {},
      md: { root: ["[--spinner-pixel:6px] [--spinner-gap:2px]"] },
      lg: { root: ["[--spinner-pixel:8px] [--spinner-gap:3px]"] },
    },
    variant: {
      default: {},
      inverse: { root: ["text-foreground-inverse"] },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>["size"]>;
export type SpinnerVariant = NonNullable<VariantProps<typeof spinnerVariants>["variant"]>;
