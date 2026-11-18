import { cn } from "../../lib/cn";

export type SegmentedControlVariant = "default" | "on-frame";
export type SegmentedControlIconsOnlyPreset = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const presetClasses: Record<SegmentedControlIconsOnlyPreset, string[]> = {
  xs: [
    "@max-xs:[&_[data-slot=segmented-control-item]]:relative @max-xs:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-xs:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-xs:[&_[data-slot=segmented-control-label]]:sr-only @max-xs:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
  sm: [
    "@max-sm:[&_[data-slot=segmented-control-item]]:relative @max-sm:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-sm:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-sm:[&_[data-slot=segmented-control-label]]:sr-only @max-sm:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
  md: [
    "@max-md:[&_[data-slot=segmented-control-item]]:relative @max-md:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-md:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-md:[&_[data-slot=segmented-control-label]]:sr-only @max-md:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
  lg: [
    "@max-lg:[&_[data-slot=segmented-control-item]]:relative @max-lg:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-lg:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-lg:[&_[data-slot=segmented-control-label]]:sr-only @max-lg:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
  xl: [
    "@max-xl:[&_[data-slot=segmented-control-item]]:relative @max-xl:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-xl:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-xl:[&_[data-slot=segmented-control-label]]:sr-only @max-xl:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
  "2xl": [
    "@max-2xl:[&_[data-slot=segmented-control-item]]:relative @max-2xl:[&_[data-slot=segmented-control-item]]:w-(--segment-size) @max-2xl:[&_[data-slot=segmented-control-item]]:px-0",
    "@max-2xl:[&_[data-slot=segmented-control-label]]:sr-only @max-2xl:[&_[data-slot=segmented-control-count]]:sr-only",
  ],
};

export function segmentedControlRoot(options: {
  variant: SegmentedControlVariant;
  preset?: SegmentedControlIconsOnlyPreset;
  measured?: boolean;
  inFitToolbar?: boolean;
  class?: string;
}) {
  return cn(
    "inline-flex min-w-0 w-fit max-w-full flex-nowrap items-center gap-[3px] rounded-[11px] bg-fill-muted p-[3px]",
    "[--segment-size:2rem] md:pointer-fine:[--segment-size:var(--control-height)]",
    "data-overflowing:overflow-x-auto data-overflowing:overflow-y-hidden data-overflowing:overscroll-x-contain data-overflowing:scrollbar-none",
    options.preset && presetClasses[options.preset],
    options.measured && [
      "data-[icons-only]:[&_[data-slot=segmented-control-item]]:relative data-[icons-only]:[&_[data-slot=segmented-control-item]]:w-(--segment-size) data-[icons-only]:[&_[data-slot=segmented-control-item]]:px-0",
      "data-[icons-only]:[&_[data-slot=segmented-control-label]]:sr-only data-[icons-only]:[&_[data-slot=segmented-control-count]]:sr-only",
      "data-fit-label:[&_[data-slot=segmented-control-item]]:relative data-fit-label:[&_[data-slot=segmented-control-item]]:w-(--segment-size) data-fit-label:[&_[data-slot=segmented-control-item]]:px-0",
      "data-fit-label:[&_[data-slot=segmented-control-label]]:sr-only data-fit-label:[&_[data-slot=segmented-control-count]]:sr-only",
    ],
    options.inFitToolbar && "shrink-0",
    options.variant === "on-frame" && [
      "bg-fill-frame-medium",
      "[&_[data-slot=segmented-control-item]]:text-foreground-on-frame-muted [&_[data-slot=segmented-control-item]]:hover:text-foreground-on-frame",
      "[&_[data-slot=segmented-control-item]]:hover:bg-transparent [&_[data-slot=segmented-control-item]]:hover:overlay-frame-medium",
      "[&_[data-slot=segmented-control-item]]:active:bg-transparent [&_[data-slot=segmented-control-item]]:active:overlay-frame-medium",
      "[&_[data-slot=segmented-control-item]]:data-checked:border-line-frame-active [&_[data-slot=segmented-control-item]]:data-checked:bg-layer-frame-active",
      "[&_[data-slot=segmented-control-item]]:data-checked:text-foreground-on-frame-active",
      "[&_[data-slot=segmented-control-item]]:data-checked:hover:bg-layer-frame-active [&_[data-slot=segmented-control-item]]:data-checked:hover:bg-none",
      "[&_[data-slot=segmented-control-item]]:data-checked:active:bg-layer-frame-active",
      "[&_[data-slot=segmented-control-item][data-state=checked]]:border-line-frame-active [&_[data-slot=segmented-control-item][data-state=checked]]:bg-layer-frame-active",
      "[&_[data-slot=segmented-control-item][data-state=checked]]:text-foreground-on-frame-active",
      "[&_[data-slot=segmented-control-item][data-state=checked]]:hover:bg-layer-frame-active",
      "[&_[data-slot=segmented-control-item][data-state=checked]]:active:bg-layer-frame-active",
    ],
    options.class,
  );
}

export function segmentedControlItem(classValue?: string) {
  return cn(
    "group/segmented-control-item relative inline-flex h-(--segment-size) min-w-0 shrink-0 touch-manipulation items-center justify-center gap-1.5",
    "rounded-control border-[1.5px] border-transparent bg-transparent px-3",
    "font-sans text-callout font-semibold text-foreground-muted outline-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "hover:bg-fill-medium active:bg-fill-medium",
    "data-[state=checked]:border-sticker-ink data-[state=checked]:bg-selected data-[state=checked]:font-bold data-[state=checked]:text-sticker-ink data-[state=checked]:ring-[1.5px] data-[state=checked]:ring-sticker-edge",
    "data-[state=checked]:hover:bg-selected data-[state=checked]:active:bg-selected",
    "data-checked:border-sticker-ink data-checked:bg-selected data-checked:font-bold data-checked:text-sticker-ink data-checked:ring-[1.5px] data-checked:ring-sticker-edge",
    "data-checked:hover:bg-selected data-checked:active:bg-selected data-checked:active:overlay-sticker-medium",
    "focus-visible:shadow-focus",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-foreground-disabled disabled:hover:bg-transparent",
    "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-foreground-disabled data-disabled:hover:bg-transparent",
    "after:absolute after:-inset-y-[calc(--spacing(1.5)+1.5px)] after:inset-x-0 after:content-[''] md:pointer-fine:after:hidden",
    classValue,
  );
}

export const segmentedControlLabel = (classValue?: string) => cn("truncate", classValue);
export const segmentedControlCount = (classValue?: string) =>
  cn("font-mono text-mono-meta font-normal", classValue);
