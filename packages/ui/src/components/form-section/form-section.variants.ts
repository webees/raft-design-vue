import { tv } from "../../lib/tv";

export const formSection = tv({
  slots: {
    root: [
      "flex flex-col gap-(--field-gap) py-[calc(var(--section-gap)/2)] first:pt-0",
      "[[data-slot=form-section]+&]:border-t [[data-slot=form-section]+&]:border-line-hairline",
    ],
    head: ["flex min-w-0 flex-col", "gap-0.5"],
    titleRow: ["flex min-w-0 items-center gap-2"],
    title: ["m-0 min-w-0 flex-1", "font-sans text-footnote font-bold text-foreground-muted"],
    description: ["m-0", "font-sans text-footnote text-foreground-hint"],
  },
});
