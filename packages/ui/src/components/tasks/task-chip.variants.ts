import { tv } from "../../lib/tv";
import { inlineChip } from "../../lib/inline-chip";

export type TaskChipVariant = "default" | "inline";
export type TaskChipSize = "default" | "sm";

export const taskChip = tv({
  slots: {
    root: [
      "inline-flex max-w-full items-center gap-1.5 align-baseline overflow-hidden px-2 py-0 [font-size:inherit] leading-[1.4] tracking-normal whitespace-nowrap",
      "[&>svg]:shrink-0 [&>svg]:size-3",
      "no-underline select-text",
      "transition-[filter,opacity] duration-100",
      "focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-offset-2 focus-visible:keyboard:outline-line-strong",
      "border-0",
      "font-sans font-semibold text-foreground",
      "[&>svg:not([data-slot=task-status-icon])]:-mx-0.5 [&>svg[data-slot=task-status-icon]]:size-2.5",
      "[a,button]:cursor-pointer",
      "[a,button]:hover:overlay-medium [a,button]:active:overlay-medium",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "data-loading:pointer-events-none data-loading:opacity-dimmed",
    ],
  },
  variants: {
    status: {
      backlog: { root: ["bg-transparent inset-ring inset-ring-line-hairline"] },
      todo: { root: ["bg-task-status-todo-soft"] },
      "in-progress": { root: ["bg-task-status-in-progress-soft"] },
      "in-review": { root: ["bg-task-status-in-review-soft"] },
      done: { root: ["bg-task-status-done-soft"] },
      closed: { root: ["bg-task-status-closed-soft"] },
    },
    variant: {
      default: {
        root: [
          "h-[22px] items-baseline gap-1.5 rounded-chip px-[7px] py-[3px] [&>svg]:self-center",
          "text-[12px] leading-4",
        ],
      },
      inline: {},
    },
    size: {
      default: {},
      sm: {},
    },
  },
  compoundVariants: [
    {
      variant: "inline",
      class: {
        root: [
          ...inlineChip,
          "[&>svg]:size-3.5 [&>svg]:self-center [&>svg:not([data-slot=task-status-icon])]:mx-0",
        ],
      },
    },
    {
      variant: "default",
      size: "sm",
      class: { root: ["h-5 gap-1 px-[5px] py-0.5"] },
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
