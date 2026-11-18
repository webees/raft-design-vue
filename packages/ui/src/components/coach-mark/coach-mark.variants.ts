import { tv } from "tailwind-variants";

export const coachMark = tv({
  slots: {
    content: ["relative w-[300px] min-w-0 max-w-(--available-width)", "overflow-visible"],
    action: ["flex", "px-4 pb-3"],
    actions: ["flex items-center gap-2", "px-4 pb-4"],
    count: ["me-auto", "font-mono text-mono-meta font-normal tabular-nums text-foreground-hint"],
  },
});
