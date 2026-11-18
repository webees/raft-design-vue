import { tv } from "../../lib/tv";

export const emptyState = tv({
  slots: {
    root: [
      "flex w-full min-w-0 flex-col items-center justify-center px-6 md:pointer-fine:px-(--page-inset) py-12 text-center",
    ],
    content: [
      "flex w-full max-w-sm min-w-0 flex-col items-center gap-2 text-center",
      "[&>[data-slot=empty-state-icon]]:mb-0",
      "[&>[data-slot=empty-state-title]]:mb-0",
    ],
    icon: [
      "mb-4 inline-flex items-center justify-center [&_svg]:shrink-0",
      "text-foreground-hint [&_svg]:size-9",
    ],
    title: [
      "mb-2 w-full max-w-full text-center text-balance",
      "font-sans text-headline font-bold text-foreground-muted",
    ],
    description: [
      "mx-auto w-full text-center text-pretty",
      "[&>a]:font-semibold [&>a]:decoration-[1.5px] [&>a]:underline-offset-[3px]",
      "[&>a]:hover:text-foreground [&>a]:hover:underline",
      "max-w-[300px] text-callout text-foreground-hint",
    ],
    actions: ["mt-5"],
  },
});
