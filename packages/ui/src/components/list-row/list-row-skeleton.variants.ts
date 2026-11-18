import { tv } from "../../lib/tv";

// Raft Design System › ListRow, loading: the real ListRow parts with a bar in
// each text slot. Bar widths vary over a run of three rows.
export const listRowSkeleton = tv({
  slots: {
    row: [
      "[--list-row-skeleton-title:45%] [--list-row-skeleton-description:75%]",
      "nth-[3n+2]:[--list-row-skeleton-title:35%] nth-[3n+2]:[--list-row-skeleton-description:60%]",
      "nth-[3n]:[--list-row-skeleton-title:55%] nth-[3n]:[--list-row-skeleton-description:70%]",
    ],
    avatar: ["size-[35px] shrink-0"],
    icon: ["size-5 shrink-0"],
    bar: ["inline-block h-[0.75em] max-w-full align-middle"],
    titleBar: ["w-(--list-row-skeleton-title)"],
    descriptionBar: ["w-(--list-row-skeleton-description)"],
    metaBar: ["w-9"],
  },
});
