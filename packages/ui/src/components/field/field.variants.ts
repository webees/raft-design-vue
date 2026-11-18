import { tv } from "../../lib/tv";

export const fieldVariants = tv({
  slots: {
    root: ["group/field flex flex-col gap-1.5"],
    item: [
      "group/field-item flex items-start gap-2",
      "*:min-w-0",
      "*:data-[slot=checkbox]:mt-[calc((1lh-1.25rem)/2)]",
      "*:data-[slot=radio-group-item]:mt-[calc((1lh-1.25rem)/2)]",
      "*:data-[slot=switch]:mt-[calc((1lh-var(--switch-height))/2)]",
    ],
    label: [
      "block wrap-anywhere",
      "group-data-[disabled]/field:text-foreground-disabled",
      "font-sans font-semibold text-foreground-muted",
    ],
    description: [
      "wrap-anywhere",
      "group-data-[disabled]/field:text-foreground-disabled",
      "text-caption text-foreground-hint",
    ],
    error: [
      "wrap-anywhere",
      "group-data-[disabled]/field:text-foreground-disabled",
      "text-caption font-semibold text-danger-strong",
    ],
  },
  variants: {
    size: {
      sm: { item: ["text-caption"], label: ["text-caption font-semibold"] },
      md: { item: ["text-footnote"], label: ["text-footnote font-semibold"] },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
