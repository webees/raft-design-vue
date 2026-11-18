import { listCell, listCellStates } from "../../lib/list-cell";
import { tv } from "../../lib/tv";

export const sidebarItemRecipe = tv({
  slots: {
    sidebarItem: [
      "group/sidebar-item flex w-full items-center text-left",
      listCell,
      "h-(--row-height) gap-2 rounded-none border-0 py-0",
      "supports-[overflow-clip-margin:2px]:[content-visibility:auto] [overflow-clip-margin:2px]",
      "[contain-intrinsic-block-size:auto_1lh]",
      "md:pointer-fine:*:data-[slot=avatar]:mr-[-3px]",
      "md:py-0 md:[@media(max-height:600px)]:py-0",
      "max-md:h-auto max-md:min-h-11 max-md:py-2.5",
      "font-sans text-subhead font-medium text-foreground",
      "max-md:text-body max-md:font-semibold",
      "data-active:font-bold data-active:text-sticker-ink",
      "data-active:before:bg-selected data-active:before:inset-ring-[1.5px] data-active:before:inset-ring-sticker-ink data-active:before:ring-[1.5px] data-active:before:ring-sticker-edge",
      "not-data-active:data-[tone=muted]:text-foreground-muted not-data-active:data-[tone=away]:text-foreground-hint",
    ],
    sidebarItemIcon: [
      "flex shrink-0 items-center justify-center",
      "[&>svg]:shrink-0",
      "size-[19px] md:pointer-fine:size-4 text-foreground-hint [&>svg]:size-4 [&>svg]:stroke-2",
      "group-data-active/sidebar-item:text-sticker-ink",
    ],
    sidebarItemChannelIcon: [
      "flex shrink-0 items-center justify-center",
      "[&_svg]:shrink-0",
      "size-[19px] md:pointer-fine:size-4 text-foreground-hint [&_svg]:size-4 [&_svg]:stroke-2",
      "group-data-active/sidebar-item:text-sticker-ink",
    ],
    sidebarItemContent: ["has-[>[data-slot=sidebar-item-meta-icon]]:items-center"],
    sidebarItemTitle: [
      "block min-w-0 shrink truncate",
      "group-data-[tone=unread]/sidebar-item:font-bold",
    ],
    sidebarItemSubtitle: [
      "block min-w-0 flex-1 truncate",
      "shrink-1000 text-footnote font-normal text-foreground-muted",
      "group-data-active/sidebar-item:text-sticker-ink",
    ],
    sidebarItemMeta: [
      "ml-auto shrink-0",
      "font-mono text-mono-meta font-normal tabular-nums text-foreground-hint",
      "group-data-active/sidebar-item:text-sticker-ink",
    ],
    sidebarItemStatus: ["shrink-0", "inline-flex items-center"],
    sidebarItemIndicator: [
      "shrink-0 items-center justify-center gap-0",
      "has-[svg]:px-0",
      "[&_svg]:shrink-0 [&_svg]:translate-y-0",
      "size-5 min-w-5 rounded-sticker border-0 p-0",
      "bg-you text-sticker-ink inset-ring-[1.5px] inset-ring-sticker-ink ring-[1.5px] ring-sticker-edge",
      "[&_svg]:size-[13px] [&_svg]:stroke-2",
    ],
    sidebarItemMetaIcon: [
      "inline-flex size-4 shrink-0 items-center justify-center",
      "[&_svg]:shrink-0",
      "text-foreground-hint [&_svg]:size-3.5",
      "group-data-active/sidebar-item:text-sticker-ink",
    ],
    sidebarItemAside: ["flex shrink-0 items-center gap-1"],
    sidebarItemCount: [
      "shrink-0",
      "h-5 min-w-5 items-center justify-center gap-0 rounded-sticker border-0 px-1.5 py-0",
      "data-[slot=sidebar-item-count]:px-1.5",
      "bg-attention text-sticker-ink inset-ring-[1.5px] inset-ring-sticker-ink ring-[1.5px] ring-sticker-edge",
      "font-mono text-mono-meta font-bold tabular-nums tracking-normal",
    ],
    sidebarItemCountSeparator: ["mx-0.5 opacity-60"],
    sidebarItemThreadCount: [
      "inline-flex items-center gap-0.5",
      "[&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:translate-y-0",
    ],
  },
  variants: {
    interactive: {
      true: {
        sidebarItem: [
          listCellStates,
          "data-active:active:before:overlay-sticker-medium",
          "not-data-active:focus-visible:keyboard:before:inset-ring-2 not-data-active:focus-visible:keyboard:before:inset-ring-foreground",
          "data-active:focus-visible:keyboard:before:shadow-[inset_0_0_0_3.5px_var(--foreground)]",
        ],
      },
      false: { sidebarItem: "cursor-default" },
    },
    wrap: {
      false: {},
      true: {
        sidebarItem: [
          "h-auto items-start whitespace-normal",
          "min-h-(--row-height) py-[calc((var(--row-height)-20px)/2)] md:py-[calc((var(--row-height)-20px)/2)] md:[@media(max-height:600px)]:py-[calc((var(--row-height)-20px)/2)]",
          "**:data-[slot=sidebar-item-channel-icon]:h-lh **:data-[slot=sidebar-item-icon]:h-lh",
          "**:data-[slot=sidebar-item-meta-icon]:h-lh",
          "*:data-[slot=avatar]:mt-[calc((1lh-19px)/2)]",
        ],
      },
    },
    stacked: {
      false: {
        sidebarItemContent: "min-w-0 flex flex-1 items-baseline gap-1 text-left",
      },
      true: { sidebarItemContent: ["min-w-0 flex-1 text-left"] },
    },
  },
  defaultVariants: {
    interactive: true,
    wrap: false,
    stacked: false,
  },
});
