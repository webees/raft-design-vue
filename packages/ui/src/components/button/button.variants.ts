import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

const sticker = (fill: string) => [
  `border-sticker-ink ${fill} text-sticker-ink ring-[1.5px] ring-sticker-edge`,
  "hover:overlay-sticker-medium active:overlay-sticker-medium",
];

const outline = (ink: string) => [
  `border-line-strong bg-layer-card ${ink}`,
  "hover:overlay-medium active:overlay-medium",
];

const textMd = [
  "h-8 md:pointer-fine:h-control gap-2 rounded-control px-3 py-0 text-control",
  "has-data-[icon=inline-start]:pl-2.5 has-data-[icon=inline-end]:pr-2.5",
  "[&_svg:not([class*='size-'])]:size-4 [&_[data-icon]:not(svg):not([class*='size-'])]:size-4",
  "after:absolute after:inset-x-0 after:-inset-y-[calc(--spacing(1.5)+1.5px)]",
  "md:pointer-fine:after:-inset-y-[calc(var(--control-hit-inset)+1.5px)]",
];

const iconMd = [
  "size-8 md:pointer-fine:size-control rounded-control p-0 [&_svg:not([class*='size-'])]:size-[18px]",
  "after:absolute after:-inset-[calc(--spacing(1.5)+1.5px)]",
  "md:pointer-fine:after:-inset-[calc(var(--control-hit-inset)+1.5px)]",
];

export const buttonVariants = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 items-center justify-center",
      "whitespace-nowrap select-none",
      "rounded-none border-[1.5px] font-sans font-bold shadow-none",
      "transition-colors duration-100",
      "outline-[1px] outline-offset-2 outline-transparent focus-visible:outline-transparent",
      "focus-visible:shadow-focus",
      "data-[loading=true]:cursor-wait data-[loading=true]:opacity-100",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      "disabled:pointer-events-none aria-disabled:cursor-not-allowed",
      "disabled:transform-none aria-disabled:transform-none",
      "aria-disabled:hover:translate-none",
      "aria-disabled:active:translate-none aria-disabled:active:scale-none",
      "disabled:opacity-100 aria-disabled:opacity-100",
      "disabled:border-line-hairline disabled:bg-fill-muted disabled:bg-none disabled:text-foreground-disabled disabled:ring-0",
      "aria-disabled:border-line-hairline aria-disabled:bg-fill-muted aria-disabled:bg-none aria-disabled:text-foreground-disabled aria-disabled:ring-0",
    ],
    content:
      "relative z-raised inline-flex min-w-0 max-w-full items-center justify-center gap-[inherit] data-[loading=true]:invisible",
    loadingIndicator:
      "pointer-events-none absolute inset-0 z-raised flex items-center justify-center",
  },
  variants: {
    variant: {
      primary: { root: sticker("bg-attention-400") },
      accent: { root: sticker("bg-attention-400") },
      warning: { root: sticker("bg-warning") },
      danger: { root: sticker("bg-danger") },
      default: { root: outline("text-foreground") },
      outline: { root: outline("text-foreground") },
      information: { root: outline("text-foreground") },
      muted: { root: outline("text-foreground") },
      success: { root: outline("text-foreground") },
      "danger-secondary": { root: outline("text-danger-strong") },
      "danger-outline": { root: outline("text-danger-strong") },
      ghost: {
        root: [
          "border-transparent bg-transparent text-foreground",
          "hover:bg-fill-medium active:bg-fill-medium",
        ],
      },
      "on-frame": {
        root: [
          "border-transparent bg-transparent text-foreground-on-frame",
          "hover:bg-fill-frame-medium active:bg-fill-frame-medium",
          "aria-expanded:bg-fill-frame-medium data-popup-open:bg-fill-frame-medium",
          "disabled:border-transparent disabled:bg-transparent",
          "aria-disabled:border-transparent aria-disabled:bg-transparent",
        ],
      },
    },
    size: {
      xs: { root: textMd },
      sm: { root: textMd },
      md: { root: textMd },
      lg: {
        root: [
          "h-control gap-2 rounded-(--control-radius) px-4 py-0 text-subhead",
          "has-data-[icon=inline-start]:pl-3.5 has-data-[icon=inline-end]:pr-3.5",
          "[&_svg:not([class*='size-'])]:size-[18px] [&_[data-icon]:not(svg):not([class*='size-'])]:size-[18px]",
          "after:absolute after:inset-x-0 after:-inset-y-[calc(var(--spacing-control-hit)+1.5px)]",
        ],
      },
      xl: {
        root: [
          "h-control-cta gap-2 rounded-control px-5 py-0 text-body",
          "[&_svg:not([class*='size-'])]:size-[18px] [&_[data-icon]:not(svg):not([class*='size-'])]:size-[18px]",
        ],
      },
      "icon-xs": { root: iconMd },
      "icon-sm": { root: iconMd },
      "icon-md": { root: iconMd },
      "icon-lg": {
        root: [
          "size-control rounded-(--control-radius) p-0 [&_svg:not([class*='size-'])]:size-control-icon",
          "after:absolute after:-inset-[calc(var(--spacing-control-hit)+1.5px)]",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
  compoundVariants: [
    {
      variant: "ghost",
      size: ["xs", "sm", "md", "lg", "xl"],
      class: {
        root: [
          "in-data-stacked:border-line-strong in-data-stacked:bg-layer-card",
          "in-data-stacked:hover:bg-layer-card in-data-stacked:active:bg-layer-card",
          "in-data-stacked:hover:overlay-medium in-data-stacked:active:overlay-medium",
        ],
      },
    },
    {
      variant: "ghost",
      size: ["icon-xs", "icon-sm", "icon-md", "icon-lg"],
      class: {
        root: [
          "disabled:border-transparent disabled:bg-transparent",
          "aria-disabled:border-transparent aria-disabled:bg-transparent",
        ],
      },
    },
    {
      variant: ["ghost", "on-frame"],
      size: "icon-lg",
      class: {
        root: ["[--icon-inset:calc((var(--control-height)-var(--control-icon))/2)]"],
      },
    },
    {
      variant: "ghost",
      size: ["icon-xs", "icon-sm", "icon-md"],
      class: {
        root: "[--icon-inset:calc((--spacing(8)-18px)/2)] md:pointer-fine:[--icon-inset:calc((var(--control-height)-18px)/2)]",
      },
    },
    {
      variant: "on-frame",
      size: ["xs", "sm", "md"],
      class: {
        root: "h-(--frame-item-height) px-2.5 text-subhead after:-inset-y-[calc((44px-var(--frame-item-height))/2+1.5px)]",
      },
    },
    {
      variant: "on-frame",
      size: ["icon-xs", "icon-sm", "icon-md"],
      class: {
        root: [
          "size-(--frame-item-height) after:-inset-[calc((44px-var(--frame-item-height))/2+1.5px)] [&_svg:not([class*='size-'])]:size-5",
          "[--icon-inset:calc((var(--frame-item-height)-20px)/2)]",
        ],
      },
    },
  ],
});

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export const FRAMELESS_VARIANTS = new Set<ButtonVariant>(["ghost", "on-frame"]);
export const ICON_SIZES = new Set<ButtonSize>(["icon-xs", "icon-sm", "icon-md", "icon-lg"]);
