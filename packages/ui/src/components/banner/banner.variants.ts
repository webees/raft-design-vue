import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const banner = tv({
  slots: {
    root: [
      "group/banner @container grid gap-y-0",
      "[&>svg]:col-start-1 [&>svg]:shrink-0",
      "*:data-[slot=spinner]:col-start-1 *:data-[slot=spinner]:row-start-1",
      "w-full grid-cols-[minmax(0,1fr)] items-start gap-x-2.5 rounded-container border-0",
      "font-sans text-callout text-foreground ring-1 ring-line-hairline ring-inset",
      "has-[>svg]:grid-cols-[20px_minmax(0,1fr)]",
      "has-[>[data-slot=spinner]]:grid-cols-[20px_minmax(0,1fr)]",
      "[&>svg]:row-start-1 [&>svg]:size-5 [&>svg]:text-foreground",
      "[&>svg]:mt-[calc((1lh-20px)/2)]",
      "*:data-[slot=spinner]:h-lh *:data-[slot=spinner]:leading-[inherit] *:data-[slot=spinner]:self-start *:data-[slot=spinner]:justify-self-center",
      "has-[>svg]:[--banner-text-col:2]",
      "has-[>[data-slot=spinner]]:[--banner-text-col:2]",
      "has-[>[data-slot=banner-title]]:[--banner-desc-row:2]",
      "has-[>[data-slot=banner-description]]:[--banner-last-row:var(--banner-desc-row,1)]",
      "has-[>[data-banner-close]]:[--banner-action-end:span_2]",
    ],
    title: [
      "min-w-0 wrap-break-word text-foreground",
      "row-start-1 font-bold",
      "col-start-(--banner-text-col,1)",
      "@min-[452px]:has-[~[data-slot=banner-description]~[data-slot=banner-action]:not([data-wrap])]:col-end-[span_2]",
    ],
    description: [
      "min-w-0 wrap-break-word font-normal",
      "text-foreground",
      "col-start-(--banner-text-col,1)",
      "row-start-(--banner-desc-row,1)",
    ],
    action: [
      "mt-2 flex shrink-0 flex-wrap items-center justify-end gap-2 self-start",
      "col-start-(--banner-text-col,1) col-end-(--banner-action-end,-1)",
      "@min-[452px]:not-data-wrap:col-start-[calc(var(--banner-text-col,1)+1)] @min-[452px]:not-data-wrap:col-end-auto",
      "@min-[452px]:not-data-wrap:row-start-(--banner-last-row,1)",
      "@min-[452px]:not-data-wrap:mt-0 @min-[452px]:not-data-wrap:h-lh @min-[452px]:not-data-wrap:flex-nowrap @min-[452px]:not-data-wrap:self-end",
    ],
    close: [
      "col-start-[calc(var(--banner-text-col,1)+1)] row-start-1 self-start",
      "-my-[calc((--spacing(8)-1lh)/2)] -me-icon-inset",
    ],
  },
  variants: {
    status: {
      default: { root: ["bg-fill-muted"] },
      destructive: { root: ["bg-danger-soft"] },
      warning: { root: ["bg-warning-soft"] },
      info: { root: ["bg-info-soft"] },
      success: { root: ["bg-success-soft"] },
    },
    size: {
      sm: {
        root: [
          "gap-x-2 px-3 py-2",
          "has-[>svg]:grid-cols-[16px_minmax(0,1fr)] has-[>[data-slot=spinner]]:grid-cols-[16px_minmax(0,1fr)]",
          "[&>svg]:mt-[calc((1lh-16px)/2)] [&>svg]:size-4",
        ],
      },
      md: { root: ["px-3.5 py-3"] },
      lg: { root: ["px-4 py-3.5"] },
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      size: "sm",
      class: {
        root: [
          "[--banner-button:--spacing(8)] md:pointer-fine:[--banner-button:var(--control-height)]",
          "has-[>[data-slot=banner-action],>[data-banner-close]]:py-[calc((var(--banner-button)-1lh)/2+(--spacing(1)))]",
        ],
      },
    },
  ],
});

export type BannerStatus = NonNullable<
  VariantProps<typeof banner>["status"]
>;
export type BannerSize = NonNullable<VariantProps<typeof banner>["size"]>;
