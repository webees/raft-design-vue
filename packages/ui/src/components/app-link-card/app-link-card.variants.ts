import { tv } from "../../lib/tv";

export const appLinkCard = tv({
  slots: {
    root: ["flex flex-col", "my-2 first:mt-0 last:mb-0"],
    badgeFill: [
      "not-forced-colors:bg-(--badge-fill) not-forced-colors:text-(--badge-fill-text)",
      "not-forced-colors:inset-ring",
      "[--badge-ring:var(--badge-ring-light)] dark:[--badge-ring:var(--badge-ring-dark)]",
      "not-forced-colors:inset-ring-(--badge-ring)",
    ],
    placeholderLine: ["flex h-lh items-center"],
    placeholderButton: ["h-8 md:pointer-fine:h-control w-28 rounded-control"],
  },
});
