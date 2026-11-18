import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const select = tv({
  slots: {
    trigger: [
      "inline-flex select-none items-center justify-between",
      "h-control w-full gap-2 rounded-(--control-radius) border-[1.5px] border-line-field",
      "bg-layer-card pr-3 pl-3.5 text-subhead font-semibold text-foreground",
      "outline-none transition-colors hover:bg-none",
      "data-placeholder:font-medium data-placeholder:text-foreground-hint",
      "data-disabled:pointer-events-none data-disabled:border-line-hairline data-disabled:bg-fill-muted",
      "data-disabled:data-placeholder:text-foreground-disabled",
      "data-disabled:**:data-[slot=select-icon]:text-foreground-disabled",
      "data-invalid:border-danger-strong data-invalid:hover:border-danger-strong",
      "data-invalid:focus-visible:border-danger-strong",
      "data-invalid:focus-visible:ring-0 data-invalid:focus-visible:ring-[color-mix(in_oklch,var(--danger)_60%,transparent)]",
      "focus-visible:shadow-focus",
      "**:data-[slot=button-content]:w-full **:data-[slot=button-content]:justify-between",
      "[&>span[data-slot=select-trigger-content]]:min-w-0",
      "[&>span[data-slot=select-trigger-content]]:flex-1",
      "[&_[data-slot=select-trigger-content]_svg]:shrink-0",
      "[&_[data-slot=select-trigger-content]_svg:not([class*=size-])]:size-4",
      "[&_[data-slot=select-trigger-content]_svg:not([class*=stroke-])]:stroke-2",
      "[&>svg:not([class*=size-])]:size-4",
      "[&>svg:not([class*=stroke-])]:stroke-2",
    ],
    triggerContent: ["flex min-w-0 flex-1 items-center gap-1.5", "[&_svg]:shrink-0"],
    icon: [
      "ml-auto flex shrink-0 items-center justify-center transition-transform",
      "[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:stroke-2 [&>svg_*]:stroke-2",
      "text-foreground-hint opacity-100",
    ],
    value: ["block min-w-0 flex-1 truncate text-left"],
    fitFrame: ["grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)]"],
    sizer: [
      "col-start-1 row-start-1 flex h-0 flex-col overflow-hidden",
      "pointer-events-none invisible select-none",
    ],
    sizerLabel: ["whitespace-nowrap font-semibold"],
    sizerPlaceholder: ["whitespace-nowrap font-medium"],
    content: [
      "relative isolate z-popup max-h-(--available-height)",
      "min-w-[max(var(--anchor-width),220px)]",
      "max-w-[min(var(--available-width),max(var(--anchor-width),24rem))]",
      "overflow-hidden rounded-container bg-layer-popover p-1 text-foreground",
      "shadow-float ring-1 ring-line-seam outline-none",
    ],
    list: ["max-h-64 min-h-0 overflow-y-auto scroll-py-6", "flex flex-col px-1"],
    listFrame: ["-mx-1 min-h-0"],
    item: [
      "flex w-full shrink-0 cursor-default select-none items-center justify-between overflow-hidden",
      "min-h-option flex-wrap gap-x-2.5 gap-y-0.5 rounded-chip px-2.5 py-option-inset",
      "text-left text-callout font-medium text-foreground outline-none transition-colors",
      "bg-transparent hover:bg-brand-soft data-highlighted:bg-brand-soft",
      "data-selected:font-bold data-[state=checked]:font-bold",
      "data-[selected]:**:data-[slot=select-item-text]:font-bold",
      "data-disabled:pointer-events-none data-disabled:text-foreground-disabled",
      "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:text-foreground-muted",
      "[&>svg:not([class*=size-])]:size-4 [&>svg:not([class*=stroke-])]:stroke-2",
    ],
    actionItem: [
      "flex w-full shrink-0 cursor-default select-none items-center gap-2.5 overflow-hidden",
      "text-left outline-none transition-colors",
      "min-h-option rounded-chip px-2.5 py-option-inset",
      "text-callout font-medium text-foreground-muted",
      "bg-transparent hover:bg-brand-soft data-highlighted:bg-brand-soft",
      "data-disabled:pointer-events-none data-disabled:text-foreground-disabled",
      "[&>svg]:pointer-events-none [&>svg]:shrink-0",
      "[&>svg:not([class*=size-])]:size-4",
      "[&>svg:not([class*=stroke-])]:stroke-2",
    ],
    itemLeading: [
      "flex shrink-0 items-center justify-center",
      "size-4 text-foreground-muted",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "[&>svg:not([class*=size-])]:size-4 [&>svg:not([class*=stroke-])]:stroke-2",
    ],
    itemIndicator: [
      "pointer-events-none ml-auto flex shrink-0 items-center justify-center",
      "text-foreground [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:stroke-2 [&>svg_*]:stroke-2",
    ],
    itemText: ["min-w-0 flex-1 line-clamp-2 wrap-anywhere"],
    itemDescription: [
      "order-last min-w-0 basis-full wrap-anywhere",
      "[[data-slot=select-item-leading]~&]:ps-[calc(--spacing(4)+(--spacing(2.5)))]",
      "font-sans text-caption font-normal text-foreground-hint",
    ],
    label: ["m-0", "font-sans text-footnote font-semibold text-foreground-muted"],
    group: ["flex flex-col"],
    groupLabel: ["px-2.5 pt-2 pb-1", "text-caption font-bold text-foreground-hint"],
    separator: ["-mx-1 my-1 h-px shrink-0 border-0 bg-line-hairline"],
    scrollArrow: [
      "absolute inset-x-0 z-raised flex h-6 w-full cursor-default items-center justify-center",
      "bg-layer-popover text-foreground-hint outline-none transition-colors",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "data-[direction=up]:top-0 data-[direction=down]:bottom-0",
    ],
    empty: ["px-2.5 py-2 text-left text-callout text-foreground-hint"],
  },
  variants: {
    chrome: {
      default: {},
      field: {
        trigger: [
          "px-3 text-field font-field",
          "**:data-[slot=button-content]:font-field **:data-[slot=select-value]:font-field",
          "h-control rounded-(--control-radius) py-0",
          "data-placeholder:font-field",
        ],
        item: ["text-field font-field", "**:data-[slot=select-item-text]:font-field"],
        actionItem: ["text-field font-field"],
        sizerLabel: ["font-field"],
        sizerPlaceholder: ["font-field"],
      },
    },
    fit: {
      true: { trigger: ["w-auto min-w-44 max-w-80"] },
    },
  },
  defaultVariants: {
    chrome: "default",
    fit: false,
  },
});

export type SelectVariants = VariantProps<typeof select>;
export type SelectChrome = NonNullable<SelectVariants["chrome"]>;
