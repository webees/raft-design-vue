import { tv } from "../../lib/tv";

const fieldType = "font-heading text-field font-field outline-none";
const fieldSurface = "rounded-(--control-radius) border-[1.5px] border-line-field bg-layer-card";
const fieldInk = "text-foreground placeholder:text-foreground-hint";

export const textarea = tv({
  slots: {
    root: [
      "block w-full min-h-[calc(var(--field-line-height)*3+--spacing(6))] resize-y pl-3 pr-(--ta-pr,0.75rem)",
      "scroll-pb-(--ta-scroll-pb,0)",
      fieldType,
      "py-2.5",
      fieldSurface,
      fieldInk,
      "shadow-none transition-shadow duration-90 ease-out focus-visible:shadow-focus",
      "data-invalid:border-danger-strong",
      "disabled:cursor-not-allowed disabled:resize-none disabled:border-line-hairline disabled:bg-fill-muted disabled:text-foreground-disabled disabled:placeholder:text-foreground-disabled",
    ],
  },
});

export const textareaScrollAreaVariants = tv({
  slots: {
    wrapper: [
      "w-full min-h-[calc(var(--field-line-height)*3+--spacing(6))] grid-rows-[minmax(0,1fr)]",
      fieldSurface,
      "shadow-none transition-shadow duration-90 ease-out has-focus-visible:shadow-focus",
      "has-data-invalid:border-danger-strong",
      "has-disabled:border-line-hairline has-disabled:bg-fill-muted",
    ],
    textarea: [
      "block w-full max-h-full pl-3 pr-(--ta-pr,0.75rem)",
      "scroll-pb-(--ta-scroll-pb,0)",
      fieldType,
      "py-2.5",
      "rounded-[inherit] border-0 bg-transparent",
      fieldInk,
      "disabled:cursor-not-allowed disabled:resize-none disabled:text-foreground-disabled disabled:placeholder:text-foreground-disabled",
    ],
  },
});

export const textareaGroup = tv({
  slots: {
    root: ["w-full", "flex flex-col items-end gap-1.5"],
  },
});

export const textareaCounter = tv({
  slots: {
    root: [
      "font-mono tabular-nums",
      "text-mono-meta text-foreground-hint",
      "group-data-[invalid]/field:font-bold group-data-invalid/field:text-danger-strong",
    ],
  },
  variants: {
    overLimit: {
      true: { root: ["font-bold text-danger-strong"] },
      false: { root: "" },
    },
  },
  defaultVariants: { overLimit: false },
});
