import { tv } from "../../lib/tv";

export const pickerTriggerButton = tv({
  base: [
    "relative inline-flex h-8 md:pointer-fine:h-control shrink-0 items-center justify-center",
    "after:absolute after:inset-x-0 after:-inset-y-1.5 md:pointer-fine:after:hidden",
    "whitespace-nowrap select-none",
    "outline-[1px] outline-offset-2 outline-transparent transition-colors duration-100 focus-visible:outline-transparent",
    "disabled:pointer-events-none disabled:transform-none",
    "has-data-[icon=inline-start]:pl-2.5 has-data-[icon=inline-end]:pr-2.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 **:data-icon:size-[1em]",
    "gap-1.5 rounded-control border-0 bg-transparent px-2.5 py-0",
    "font-sans text-control font-semibold text-foreground-muted",
    "inset-ring inset-ring-line-seam",
    "hover:bg-fill-medium active:bg-fill-medium",
    "data-has-value:bg-info-soft data-has-value:text-foreground data-has-value:inset-ring-0",
    "data-has-value:hover:bg-info-soft data-has-value:hover:overlay-medium data-has-value:active:overlay-medium",
    "data-invalid:inset-ring data-invalid:inset-ring-danger-strong",
    "focus-visible:shadow-focus",
    "disabled:bg-fill-muted disabled:text-foreground-disabled disabled:opacity-100 disabled:inset-ring-0",
    "[&_svg:not([class*='size-'])]:size-3.5 [&_svg:not([class*='stroke-'])]:stroke-2",
    "**:data-picker-trigger-indicator:text-foreground-hint **:data-picker-trigger-indicator:opacity-100",
    "disabled:**:data-picker-trigger-indicator:text-foreground-disabled data-disabled:**:data-picker-trigger-indicator:text-foreground-disabled",
    "[&_[data-picker-trigger-indicator]>svg]:size-3.5 [&_[data-picker-trigger-indicator]>svg]:stroke-2 [&_[data-picker-trigger-indicator]>svg_*]:stroke-2",
  ],
});
