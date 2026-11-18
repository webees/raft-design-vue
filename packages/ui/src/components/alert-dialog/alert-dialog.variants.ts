import { tv } from "../../lib/tv";
import { stackedActions } from "../../lib/use-stacked-actions";

export const alertDialog = tv({
  slots: {
    overlay: ["fixed inset-0 z-dialog bg-layer-backdrop"],
    content: [
      "fixed top-1/2 left-1/2 z-dialog grid w-[calc(100%-2rem)] -translate-1/2 outline-none",
      "max-w-100",
      "overflow-clip rounded-dialog bg-layer-popover text-foreground",
      "shadow-float ring-1 ring-line-seam",
    ],
    header: [
      "grid grid-cols-[minmax(0,1fr)_max-content] items-center min-w-0",
      "gap-2 px-(--surface-inset) pt-(--surface-inset)",
      "[&>[data-icon-inset]:nth-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-ml-icon-inset",
      "[&>[data-icon-inset]:nth-last-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-mr-icon-inset",
    ],
    body: [
      "min-w-0",
      "px-(--surface-inset) pt-1.5 pb-(--surface-inset) first:pt-(--surface-inset)",
      "font-sans text-subhead text-foreground-muted",
    ],
    footer: [
      "flex min-w-0 items-center justify-end",
      ...stackedActions,
      "gap-2 px-(--surface-inset) pb-(--surface-inset) first:pt-(--surface-inset) [[data-slot=alert-dialog-header]+&]:pt-(--surface-inset)",
    ],
    title: ["m-0 min-w-0 text-foreground", "font-sans text-headline font-bold"],
    description: ["m-0", "font-sans text-subhead text-foreground-muted"],
  },
  variants: {
    nested: {
      false: {},
      true: { overlay: ["bg-layer-backdrop-nested"] },
    },
  },
  defaultVariants: { nested: false },
});
