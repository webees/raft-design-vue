import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const progress = tv({
  slots: {
    root: [
      "group/progress grid w-full min-w-0 gap-1.5",
      "[--progress-color:var(--foreground)]",
      "[--progress-indicator:var(--progress-color)]",
      "[--progress-track:var(--fill-muted)]",
      "font-sans",
      "data-[state=complete]:[--progress-indicator:var(--success)]",
    ],
    header: ["flex min-w-0 items-center justify-between gap-3"],
    label: ["min-w-0 truncate", "text-footnote font-semibold text-foreground"],
    value: ["shrink-0 tabular-nums", "font-mono text-mono-meta text-foreground-hint"],
    track: [
      "relative w-full overflow-hidden bg-(--progress-track)",
      "h-2 group-data-[size=sm]/progress:h-1.5 group-data-[size=lg]/progress:h-2.5",
      "rounded-sticker",
    ],
    indicator: [
      "block h-full bg-(--progress-indicator)",
      "transition-[width,background-color] duration-200 ease-out",
      "rounded-[inherit] inset-ring-[1.5px] inset-ring-sticker-ink",
      "data-indeterminate:absolute data-[indeterminate]:inset-y-0 data-indeterminate:w-1/2",
      "data-indeterminate:origin-left data-indeterminate:animate-[raft-progress-indeterminate_1.4s_ease-in-out_infinite]",
    ],
  },
  variants: {
    variant: {
      primary: { root: ["[--progress-color:var(--info)]"] },
      information: { root: ["[--progress-color:var(--info)]"] },
      accent: { root: ["[--progress-color:var(--info)]"] },
      success: { root: ["[--progress-color:var(--success)]"] },
      warning: { root: ["[--progress-color:var(--warning)]"] },
      danger: { root: ["[--progress-color:var(--danger)]"] },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ProgressVariant = NonNullable<VariantProps<typeof progress>["variant"]>;
export type ProgressSize = NonNullable<VariantProps<typeof progress>["size"]>;
