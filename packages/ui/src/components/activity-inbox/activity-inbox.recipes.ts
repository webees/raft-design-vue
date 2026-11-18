import { listColumnMargin } from "../../lib/head-edges";
import { tv } from "../../lib/tv";

export const activityInboxShell = tv({
  slots: {
    panel: [
      "flex h-full min-h-0 flex-1 flex-col overflow-hidden",
      "bg-layer-canvas font-sans text-foreground",
      listColumnMargin,
    ],
    frame: ["min-h-0 flex-1"],
    viewport: [
      "relative flex min-h-0 flex-1 flex-col gap-0.5 *:shrink-0",
      "outline-none focus-visible:shadow-focus",
      "bg-layer-canvas px-0 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))]",
    ],
    loadingMore: ["py-3 text-center", "text-caption text-foreground-hint"],
  },
});

export const activityInboxSidebar = tv({
  slots: {
    sidebar: [
      "shrink-0",
      "max-md:hidden",
      "md:flex",
      "w-56 border-r border-line-seam bg-layer-canvas",
    ],
    sidebarBody: ["bg-layer-canvas"],
    sidebarContent: [
      "py-0",
      "[&_[data-slot=sidebar-group-label]]:mt-3 [&_[data-slot=sidebar-group-label]]:mb-0",
      "**:data-[slot=sidebar-group-label]:flex **:data-[slot=sidebar-group-label]:items-center [&_[data-slot=sidebar-group-label]]:gap-2",
      "[&_[data-slot=sidebar-group-label]]:px-5 [&_[data-slot=sidebar-group-label]]:py-0 md:pointer-fine:[&_[data-slot=sidebar-group-label]]:px-2",
      "**:data-[slot=sidebar-group-label]:font-sans **:data-[slot=sidebar-group-label]:text-footnote [&_[data-slot=sidebar-group-label]]:font-bold",
      "**:data-[slot=sidebar-group-label]:text-foreground-hint **:data-[slot=sidebar-group-label]:normal-case [&_[data-slot=sidebar-group-label]]:tracking-normal",
      "**:data-activity-inbox-show-all:whitespace-nowrap",
    ],
  },
});

export const activityInboxToolbar = tv({
  slots: {
    controls: [
      "flex shrink-0 flex-nowrap items-center gap-2",
      "bg-layer-canvas px-(--column-margin) py-3",
      "md:pointer-fine:py-[calc((var(--header-height)-var(--control-height))/2)]",
    ],
  },
});
