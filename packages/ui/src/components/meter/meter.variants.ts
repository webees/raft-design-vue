import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const meter = tv({
  slots: {
    root: [
      "group/meter grid w-full min-w-0 gap-1.5",
      "[--meter-indicator:var(--info)]",
      "[--meter-value:var(--foreground-muted)]",
      "font-sans",
    ],
    header: ["flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"],
    label: ["min-w-0 truncate", "text-footnote font-semibold text-foreground"],
    value: ["shrink-0 text-right tabular-nums", "text-footnote text-(--meter-value)"],
    track: [
      "relative w-full overflow-hidden bg-(--fill-muted)",
      "h-2 group-data-[size=sm]/meter:h-1.5",
      "rounded-sticker",
    ],
    indicator: [
      "block h-full bg-(--meter-indicator)",
      "transition-[width,background-color] duration-200 ease-out",
      "rounded-[inherit] inset-ring-[1.5px] inset-ring-sticker-ink",
    ],
  },
  variants: {
    warning: {
      true: {
        root: ["[--meter-indicator:var(--warning)]", "[--meter-value:var(--warning-strong)]"],
      },
    },
    size: {
      sm: {},
      md: {},
    },
  },
  defaultVariants: {
    warning: false,
    size: "md",
  },
});

export type MeterSize = NonNullable<VariantProps<typeof meter>["size"]>;
export type MeterLevel = "normal" | "high" | "full";
