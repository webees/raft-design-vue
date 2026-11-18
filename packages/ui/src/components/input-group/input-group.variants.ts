import { tv } from "../../lib/tv";

export const inputGroup = tv({
  slots: {
    root: [
      "group/input-group relative flex h-control w-full min-w-0 items-center overflow-hidden",
      "rounded-(--control-radius) border-[1.5px] border-line-field bg-layer-card text-foreground",
      "shadow-none transition-shadow duration-90 ease-out has-focus-visible:shadow-focus",
      "has-data-[input-group-trim=inline-end]:[--ig-control-pr:0]",
      "has-[[data-slot=input-group-control][data-invalid]]:border-danger-strong",
      "has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed",
      "has-[[data-slot=input-group-control]:disabled]:border-line-hairline",
      "has-[[data-slot=input-group-control]:disabled]:bg-fill-muted",
      "has-[[data-slot=input-group-control]:disabled]:[--ig-addon-fg:var(--foreground-disabled)]",
      "has-[[data-slot=input-group-control]:disabled]:[--ig-text-fg:var(--foreground-disabled)]",
    ],
    addon: [
      "flex shrink-0 select-none items-center justify-center gap-2 px-3",
      "text-(--ig-addon-fg,var(--ig-addon-fg-default,var(--foreground-hint)))",
      "[&>svg:not([class*='size-'])]:size-4.5",
    ],
    text: [
      "flex min-w-0 max-w-1/2 shrink-0 select-none items-center px-3",
      "font-mono text-mono-code",
      "text-(--ig-text-fg,var(--ig-text-fg-default,var(--foreground-hint)))",
    ],
    textInner: ["min-w-0 truncate"],
    control: [
      "h-full min-w-0 flex-1 bg-transparent py-0 pl-3 pr-(--ig-control-pr,0.75rem)",
      "font-heading text-field font-field text-foreground outline-none",
      "placeholder:text-foreground-hint",
      "disabled:cursor-not-allowed disabled:text-foreground-disabled",
      "disabled:placeholder:text-foreground-disabled",
    ],
  },
  variants: {
    size: {
      md: {
        root: [
          "h-8 rounded-control overflow-visible md:pointer-fine:h-control",
          "[--ig-hit:calc(--spacing(1.5)+1.5px)] md:pointer-fine:[--ig-hit:0px]",
          "*:data-[slot=input-group-control]:-my-(--ig-hit) *:data-[slot=input-group-control]:h-[calc(100%+2*var(--ig-hit))]",
          "[--control-embedded-size:calc(2rem-2*var(--control-embedded-inset))]",
          "md:pointer-fine:[--control-embedded-size:calc(var(--control-height)-2*var(--control-embedded-inset))]",
          "*:data-[variant=container]:data-[align=inline-start]:rounded-s-[calc(var(--radius-control)-1.5px)]",
          "*:data-[variant=container]:data-[align=inline-end]:rounded-e-[calc(var(--radius-control)-1.5px)]",
        ],
      },
      lg: {},
    },
    align: {
      "inline-start": { addon: "order-first", text: "order-first" },
      "inline-end": { addon: "order-last", text: "order-last" },
    },
    variant: {
      default: {},
      container: {
        addon: [
          "self-stretch",
          "[--ig-addon-fg-default:var(--foreground-hint)]",
          "border-line-hairline bg-fill-muted",
        ],
        text: [
          "self-stretch",
          "[--ig-text-fg-default:var(--foreground-hint)]",
          "border-line-hairline bg-fill-muted",
        ],
      },
    },
  },
  compoundVariants: [
    {
      variant: "default",
      align: "inline-start",
      class: {
        addon: "[&~[data-slot=input-group-control]]:pl-0",
        text: "[&~[data-slot=input-group-control]]:pl-0",
      },
    },
    {
      variant: "container",
      align: "inline-start",
      class: { addon: "border-r", text: "border-r" },
    },
    {
      variant: "container",
      align: "inline-end",
      class: { addon: "border-l", text: "border-l" },
    },
    {
      variant: "default",
      align: "inline-start",
      class: { addon: "pr-2", text: "pr-0.5" },
    },
    {
      variant: "default",
      align: "inline-end",
      class: {
        addon: [
          "pl-2",
          "*:data-[slot=button]:size-control-embedded *:data-[slot=button]:rounded-chip",
          "[&>[data-slot=button]_svg:not([class*='size-'])]:size-4",
          "[&>[data-slot=button]:last-child]:me-[calc(var(--control-embedded-inset)-0.75rem-1px)]",
        ],
        text: "pl-0.5",
      },
    },
  ],
  defaultVariants: {
    size: "lg",
    align: "inline-start",
    variant: "default",
  },
});

export type InputGroupSize = "md" | "lg";
export type InputGroupAlign = "inline-start" | "inline-end";
export type InputGroupVariant = "default" | "container";
