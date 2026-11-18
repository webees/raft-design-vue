import { tv } from "../../lib/tv";

export const workspaceButton = tv({
  slots: {
    root: [
      "max-w-full min-w-0 shrink justify-start gap-2",
      "[&>[data-slot=button-content]]:min-w-0 [&>[data-slot=button-content]]:max-w-full",
    ],
    name: ["max-w-[200px] min-w-0 truncate"],
    chevron: ["-ml-1 size-4 shrink-0"],
  },
});
