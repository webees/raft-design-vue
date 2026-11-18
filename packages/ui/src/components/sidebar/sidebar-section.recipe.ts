import { tv } from "../../lib/tv";

export const sidebarSectionRecipe = tv({
  slots: {
    sidebarSection: ["group/section", "px-0"],
    sidebarList: ["flex flex-col gap-0.5 py-2 md:pointer-fine:pt-1"],
    sidebarSectionEmpty: [
      "px-(--surface-inset) md:pointer-fine:pl-(--sidebar-text-axis) py-2",
      "font-sans text-footnote",
      "text-foreground-hint",
    ],
    sidebarSectionHeader: [
      "flex items-center justify-between",
      "group/section-header",
      "my-0 h-auto gap-2 pt-4 pb-0 pl-5",
      "pr-[calc(max(0px,calc(8px-var(--scrollbar-size,0px)))+12px)]",
      "md:pointer-fine:min-h-6 md:pointer-fine:pt-2 md:pointer-fine:pl-(--sidebar-glyph-axis) md:pointer-fine:pr-[calc(max(0px,calc(8px-var(--scrollbar-size,0px)))+10px)]",
      "not-pointer-fine:pb-1.5",
    ],
    sidebarSectionDisclosure: [
      "flex min-w-0 flex-1 items-center",
      "**:data-[slot=sidebar-section-chevron]:transition-transform",
      "[&[data-state=open]_[data-slot=sidebar-section-chevron]]:rotate-90",
      "[&[data-panel-open]_[data-slot=sidebar-section-chevron]]:rotate-90",
      "h-auto gap-1.5 rounded-sticker border-0",
      "font-sans text-footnote font-bold normal-case tracking-normal text-foreground-hint",
      "outline-none focus-visible:shadow-focus",
      "**:data-[slot=sidebar-section-chevron]:size-3.5 **:data-[slot=sidebar-section-chevron]:stroke-2",
    ],
    sidebarSectionChevronSlot: [
      "flex size-4.5 shrink-0 items-center justify-center",
      "md:pointer-fine:in-data-chevron-at-end:hidden",
    ],
    sidebarSectionEndChevron: [
      "hidden md:pointer-fine:flex",
      "[&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-90",
      "data-panel-open:[&_svg]:rotate-90",
    ],
    sidebarSectionTitle: ["min-w-0 truncate"],
    sidebarSectionCount: ["font-mono text-mono-meta font-normal tabular-nums text-foreground-hint"],
    sidebarSectionAttention: [
      "inline-flex min-w-4.5 shrink-0 items-center justify-center",
      "group-data-[state=open]/section:hidden",
      "group-data-open/section:hidden",
    ],
    sidebarSectionTrailing: ["relative flex min-w-4.5 shrink-0 items-center justify-end"],
    sidebarSectionControls: [
      "flex shrink-0 items-center gap-1",
      "[&>[data-icon-inset]:nth-last-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-mr-icon-inset",
    ],
    sidebarSectionControl: [
      "relative flex h-6 w-auto min-w-6 shrink-0 items-center justify-center p-0 -my-1",
      "md:pointer-fine:size-auto md:pointer-fine:h-6 md:pointer-fine:min-w-6",
      "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
      "[--icon-inset:calc((--spacing(6)-14px)/2)]",
      "text-foreground-hint",
      "hover:text-foreground active:text-foreground focus-visible:text-foreground",
      "data-popup-open:bg-fill-medium data-popup-open:text-foreground",
      "not-pointer-fine:after:absolute not-pointer-fine:after:inset-[-11px] not-pointer-fine:after:content-['']",
      "pointer-fine:after:absolute pointer-fine:after:inset-[-3px] pointer-fine:after:content-['']",
      "not-pointer-fine:not-first:after:left-[-3px] not-pointer-fine:not-last:after:right-[-3px]",
    ],
  },
});
