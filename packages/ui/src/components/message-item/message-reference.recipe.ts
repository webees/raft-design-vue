import { inlineChip } from "../../lib/inline-chip";
import { tv } from "../../lib/tv";

export type MessageReferenceChipVariant = "accent" | "muted" | "info" | "link";
export type MessageReferenceTextVariant = "primary" | "secondary";

const chip = (fill: string) => [
  ...inlineChip,
  "[--message-reference-em:1em]",
  "[&_svg]:size-3.5 [&_svg]:text-foreground-muted",
  fill,
];
const linkChip = (fill: string) => [
  ...chip(fill),
  "text-foreground cursor-pointer hover:overlay-medium active:overlay-medium",
];

// Both centring options stay in the source so switching this one line matches
// upstream (`x-height` today).
const SUFFIX_CENTRE: "x-height" | "icon" = "x-height";
const SUFFIX_LIFT = {
  "x-height": "top-[calc((1em-var(--message-reference-em))/4)]",
  icon: "top-[calc(0.25em-var(--message-reference-em)*0.35)]",
}[SUFFIX_CENTRE];

const INDICATOR = [
  "pointer-events-none absolute -right-2.5 top-0 inline-flex size-2 shrink-0 items-center justify-center",
  "*:data-[slot=status]:size-full",
];

export const messageReference = tv({
  slots: {
    root: [
      "inline-flex items-baseline gap-1",
      "py-0 align-baseline",
      "[font-size:inherit] leading-[1.2em]",
      "max-w-full truncate select-text no-underline",
      "outline-none focus-visible:shadow-focus",
      "[&_svg]:size-[0.857em] [&_svg]:shrink-0 [&_svg]:self-center",
      "*:data-[slot=spinner]:self-center",
      "has-[>[data-slot=message-reference-indicator],>[data-slot=message-reference-read-mark]]:relative",
      "has-[>[data-slot=message-reference-indicator],>[data-slot=message-reference-read-mark]]:mr-2.5",
      "has-[>[data-slot=message-reference-indicator],>[data-slot=message-reference-read-mark]]:inline-block",
      "has-[>[data-slot=message-reference-indicator],>[data-slot=message-reference-read-mark]]:overflow-visible",
    ],
    chipLabel: "min-w-0 truncate",
    suffix: [
      "relative shrink-0",
      SUFFIX_LIFT,
      "font-mono text-label leading-none font-normal text-foreground-hint",
    ],
    icon: [
      "inline-flex size-3.5 shrink-0 items-center justify-center self-center",
      "*:size-full *:shrink-0 [&>img]:rounded-[2px] [&>img]:object-cover",
    ],
    indicator: INDICATOR,
    readMark: [
      "pointer-events-none absolute -right-3 top-0 inline-flex size-2.5 shrink-0 items-center justify-center",
      "[&>svg]:size-2.5! [&>svg]:text-read-mark",
    ],
  },
  variants: {
    variant: {
      primary: {
        root: [
          "inline-flex cursor-pointer",
          ...inlineChip,
          "[--message-reference-em:1em]",
          "text-sticker-ink no-underline",
          "bg-you inset-ring-[1.5px] inset-ring-sticker-ink",
          "hover:overlay-sticker-medium active:overlay-sticker-medium",
        ],
      },
      secondary: {
        root: [
          "inline cursor-pointer font-bold text-foreground",
          "decoration-foreground decoration-[1.5px] underline-offset-[3px] hover:underline",
        ],
      },
      accent: { root: linkChip("bg-attention-soft") },
      muted: { root: linkChip("bg-inactive-soft") },
      info: { root: linkChip("bg-info-soft") },
      link: { root: linkChip("bg-info-soft") },
      pending: { root: chip("cursor-wait bg-inactive-soft text-foreground-muted") },
      unavailable: { root: chip("cursor-default bg-inactive-soft text-foreground-hint") },
    },
    capped: {
      true: { root: "max-w-[min(100%,24em)]" },
    },
  },
  defaultVariants: {
    variant: "muted",
  },
});
