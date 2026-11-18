import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

const hudTextAction = [
  "font-sans text-callout font-bold text-foreground-on-hud",
  "decoration-[1.5px] underline-offset-[3px] not-disabled:hover:underline",
  "after:absolute after:-inset-x-2 after:-inset-y-3 after:rounded-control after:content-['']",
  "active:after:bg-foreground-on-hud/15",
  "focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-foreground-on-hud",
];

export const toast = tv({
  slots: {
    viewport: [
      "pointer-events-none isolate z-toast w-[min(24rem,calc(100vw-2rem))]",
      "outline-none",
    ],
    positioner: ["isolate z-[calc(var(--z-index-toast)-var(--toast-index))] outline-none"],
    root: [
      "group/toast pointer-events-auto",
      "select-text",
      "outline-1 outline-offset-2 outline-transparent",
      "[--toast-scale:calc(max(0.84,1-(var(--toast-index)*0.04)))]",
      "[--toast-peek:0.5rem]",
      "[--toast-gap:0.5rem]",
      "[--toast-stack-height:var(--toast-frontmost-height,var(--toast-height))]",
      "[--toast-y:calc((var(--toast-offset-y)*-1)-(var(--toast-index)*var(--toast-gap))+var(--toast-swipe-movement-y))]",
      "transition-[transform,opacity,height] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-limited:opacity-0",
      "data-starting-style:opacity-0",
      "data-ending-style:opacity-0",
      "motion-reduce:transition-none",
      "rounded-container bg-layer-hud text-foreground-on-hud",
      "shadow-float",
      "focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-foreground",
    ],
    content: [
      "relative grid grid-cols-[minmax(0,1fr)] items-center overflow-hidden",
      "[&[data-has-description]_[data-slot=toast-body]]:self-start [&[data-has-description]_[data-slot=toast-icon]]:self-start",
      "[&:not([data-has-icon]):not([data-has-actions]):not([data-has-description])]:min-h-(--toast-title-only-min-h,2.25rem)",
      "[&:not([data-has-icon]):not([data-has-actions]):not([data-has-description])]:min-w-(--toast-title-only-min-w,7rem)",
      "[&:not([data-has-icon]):not([data-has-actions]):not([data-has-description])]:px-(--toast-title-only-px,0.75rem)",
      "[&:not([data-has-icon]):not([data-has-actions]):not([data-has-description])]:py-(--toast-title-only-py,0.5rem)",
      "[&:not([data-has-description])>[data-slot=toast-body]:only-child]:justify-self-center [&:not([data-has-description])>[data-slot=toast-body]:only-child]:text-center",
      "transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "motion-reduce:transition-none",
      "gap-x-3 gap-y-2 px-4 py-3 font-sans text-callout",
      "[--toast-title-only-min-h:2.75rem] [--toast-title-only-px:1rem] [--toast-title-only-py:0.75rem]",
      "data-has-icon:grid-cols-[auto_minmax(0,1fr)]",
      "data-has-actions:grid-cols-[minmax(0,1fr)_auto]",
      "[&[data-has-icon][data-has-actions]]:grid-cols-[auto_minmax(0,1fr)_auto]",
    ],
    icon: [
      "flex h-lh w-5 shrink-0 items-center justify-center",
      "[&_svg]:shrink-0",
      "[&_svg]:size-4",
    ],
    body: ["min-w-0"],
    title: ["m-0 truncate text-callout", "font-normal text-foreground-on-hud"],
    description: ["m-0 text-callout", "text-foreground-on-hud/70"],
    actions: ["flex items-center justify-end", "gap-4"],
    progress: [
      "pointer-events-none absolute h-[3px] origin-left",
      "animate-[raft-toast-timeout-progress_var(--toast-progress-duration)_linear_forwards]",
      "group-hover/toast:[animation-play-state:paused] group-focus-within/toast:[animation-play-state:paused]",
      "motion-reduce:animate-none motion-reduce:scale-x-100",
      "inset-x-4 bottom-1.5 rounded-[2px] bg-foreground-on-hud/40",
    ],
    close: [
      "inline-flex items-center justify-center",
      "outline-1 outline-offset-2 outline-transparent",
      "transition-[background-color,color,border-color,box-shadow,transform] duration-150",
      "disabled:pointer-events-none disabled:opacity-40",
      "relative inset-auto order-1 size-auto shrink-0 whitespace-nowrap",
      "border-0 bg-transparent p-0 shadow-none",
      "font-sans text-callout font-bold text-foreground-on-hud",
      "decoration-[1.5px] underline-offset-[3px] not-disabled:hover:underline",
      "after:absolute after:-inset-x-2 after:-inset-y-3 after:rounded-control after:content-['']",
      "active:after:bg-foreground-on-hud/15",
      "focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-foreground-on-hud",
      "[&_svg]:size-4",
    ],
    arrow: [
      "pointer-events-none flex",
      "data-[side=top]:bottom-[-5px]",
      "data-[side=bottom]:top-[-5px] data-[side=bottom]:rotate-180",
      "data-[side=left]:right-[-7px] data-[side=left]:-rotate-90",
      "data-[side=right]:left-[-7px] data-[side=right]:rotate-90",
      "data-[side=inline-start]:right-[-7px] data-[side=inline-start]:-rotate-90",
      "data-[side=inline-end]:left-[-7px] data-[side=inline-end]:rotate-90",
    ],
  },
  variants: {
    placement: {
      "bottom-center": {
        viewport: [
          "bottom-[calc(max(var(--toast-viewport-bottom,0px),env(safe-area-inset-bottom))+1rem)]",
          "left-1/2 -translate-x-1/2",
        ],
      },
      "bottom-right": {
        viewport: [
          "bottom-[calc(max(var(--toast-viewport-bottom,0px),env(safe-area-inset-bottom))+1rem)]",
          "right-4",
        ],
      },
      "top-center": {
        viewport: [
          "top-[calc(max(var(--toast-viewport-top,0px),env(safe-area-inset-top))+1rem)]",
          "left-1/2 -translate-x-1/2",
        ],
      },
      "top-right": {
        viewport: [
          "top-[calc(max(var(--toast-viewport-top,0px),env(safe-area-inset-top))+1rem)]",
          "right-4",
        ],
      },
      none: {
        viewport: "contents",
      },
    },
    strategy: {
      fixed: {
        viewport: "fixed",
      },
      absolute: {
        viewport: "absolute",
      },
    },
    layout: {
      stacked: {
        root: [
          "absolute inset-x-0 bottom-0 mx-auto h-(--toast-stack-height) origin-bottom",
          "z-[calc(var(--z-index-toast)-var(--toast-index))]",
          "before:pointer-events-auto before:absolute before:inset-x-0 before:top-full before:h-[calc(var(--toast-gap)+3px)] before:content-['']",
          "[--toast-peek-dir:-1]",
          "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek)*var(--toast-peek-dir))))_scale(var(--toast-scale))]",
          "data-expanded:h-(--toast-height)",
          "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-y))_scale(1)]",
          "data-starting-style:transform-[translateY(120%)_scale(0.98)]",
          "[&[data-ending-style]:not([data-swipe-direction])]:transform-[translateY(120%)_scale(0.98)]",
          "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+120%))_translateY(var(--toast-y))]",
          "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-120%))_translateY(var(--toast-y))]",
          "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+120%))]",
          "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-120%))]",
          "[&_[data-slot=toast-content][data-behind]]:opacity-0 [&_[data-slot=toast-content][data-expanded]]:opacity-100",
          "in-data-[toast-placement$=right]:left-auto in-data-[toast-placement$=right]:mx-0",
          "in-data-[toast-placement^=top]:top-0 in-data-[toast-placement^=top]:bottom-auto in-data-[toast-placement^=top]:origin-top",
          "in-data-[toast-placement^=top]:before:top-auto in-data-[toast-placement^=top]:before:bottom-full",
          "in-data-[toast-placement^=top]:[--toast-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--toast-gap))+var(--toast-swipe-movement-y))]",
          "in-data-[toast-placement^=top]:[--toast-peek-dir:1]",
          "[[data-toast-placement^=top]_&[data-starting-style]]:transform-[translateY(-120%)_scale(0.98)]",
          "[[data-toast-placement^=top]_&[data-ending-style]:not([data-swipe-direction])]:transform-[translateY(-120%)_scale(0.98)]",
          "w-max max-w-full",
        ],
      },
      inline: {
        root: [
          "relative mx-auto w-max max-w-[min(24rem,var(--available-width,calc(100vw-2rem)))] overflow-visible",
          "origin-(--transform-origin)",
          "data-starting-style:transform-[scale(0.97)]",
          "data-ending-style:transform-[scale(0.99)]",
          "**:data-[slot=toast-content]:opacity-100",
        ],
      },
    },
  },
  defaultVariants: {
    placement: "bottom-center",
    layout: "stacked",
    strategy: "fixed",
  },
});

export const toastAction = tv({
  slots: {
    root: [
      "relative order-2 inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none",
      "border-0 bg-transparent p-0",
      ...hudTextAction,
      "disabled:pointer-events-none disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:opacity-40",
      "data-[loading=true]:cursor-wait data-[loading=true]:opacity-100",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 **:data-icon:size-[1em] [&_svg:not([class*='size-'])]:size-3",
    ],
    content:
      "relative z-raised inline-flex items-center justify-center gap-[inherit] data-[loading=true]:invisible",
    loadingIndicator:
      "pointer-events-none absolute inset-0 z-raised flex items-center justify-center",
  },
});

export type ToastVariants = VariantProps<typeof toast>;
