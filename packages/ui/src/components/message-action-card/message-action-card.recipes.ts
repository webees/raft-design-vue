import { tv } from "../../lib/tv";

export const messageActionCard = tv({
  slots: {
    root: ["group/action-card mt-2"],
    header: [
      "flex items-start",
      "gap-2 pb-2 group-data-[closed]/action-card:pb-3 group-data-[state=closed]/action-card:pb-3",
    ],
    headerIcon: [
      "flex shrink-0 items-center justify-center",
      "[&>svg]:shrink-0",
      "size-[27px] rounded-chip bg-fill-muted text-foreground-muted",
      "[&>svg]:size-3.5",
    ],
    headerTitle: ["min-w-0 flex-1", "pt-[calc((27px-1lh)/2)]"],
    headerDescription: ["block", "mt-0.5 text-footnote font-normal text-foreground-muted"],
    headerMeta: [
      "block in-data-[slot=message-action-card-header-description]:inline",
      "mt-0.5 in-data-[slot=message-action-card-header-description]:mt-0",
      "font-mono text-mono-meta font-normal tabular-nums text-foreground-hint",
    ],
    headerStatus: [
      "ml-auto shrink-0",
      "mt-[calc((27px-1lh)/2)] text-caption font-semibold text-foreground-muted",
    ],
    status: [
      "inline-flex h-auto items-center gap-1.5 rounded-none border-0 bg-transparent p-0 shadow-none",
      "text-caption font-semibold text-foreground-muted",
      "before:size-2.5 before:shrink-0 before:rounded-[2px] before:border-[1.5px] before:border-sticker-ink before:content-['']",
    ],
    collapseTrigger: [
      "flex shrink-0 cursor-pointer items-center justify-center",
      "[&>svg]:transition-transform [&>svg]:duration-200 motion-reduce:[&>svg]:transition-none",
      "data-panel-open:[&>svg]:rotate-180 data-[state=open]:[&>svg]:rotate-180",
      "focus-visible:keyboard:outline-2 focus-visible:keyboard:outline-offset-1",
      "my-0 -mr-1 size-[27px] rounded-chip text-foreground-muted",
      "hover:bg-fill-medium hover:text-foreground active:bg-fill-medium",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "[&>svg]:size-4",
    ],
  },
  variants: {
    tone: {
      neutral: { status: ["before:bg-inactive"] },
      primary: { status: ["before:bg-presence-busy"] },
      information: { status: ["before:bg-info"] },
      accent: { status: ["before:bg-attention"] },
      success: { status: ["before:bg-success"] },
      warning: { status: ["before:bg-warning"] },
      danger: { status: ["before:bg-danger"] },
    },
  },
});

export const messageActionCardContent = tv({
  slots: {
    root: ["flex flex-col gap-2 pt-0"],
    panel: [
      // The component aliases --collapsible-panel-height to Reka's measured
      // --reka-collapsible-content-height so the upstream recipe applies.
      "h-(--collapsible-panel-height) overflow-hidden",
      "transition-[height] duration-200 ease-out motion-reduce:transition-none",
      "data-[starting-style]:h-0 data-[ending-style]:h-0",
      "data-[state=open]:animate-[raft-collapsible-down_200ms_ease-out]",
      "data-[state=closed]:animate-[raft-collapsible-up_200ms_ease-out]",
      "motion-reduce:animate-none",
    ],
    properties: [
      "m-0 grid",
      "data-stacked:grid-cols-1",
      "grid-cols-[minmax(88px,max-content)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-0.5",
    ],
    property: ["contents"],
    propertyLabel: [
      "max-w-40 min-w-0 wrap-break-word",
      "text-footnote font-medium text-foreground-hint",
      "[[data-stacked]>[data-slot=message-action-card-property]+[data-slot=message-action-card-property]>&]:mt-2",
    ],
    propertyValue: [
      "m-0 min-w-0 wrap-break-word",
      "min-h-8 py-1.5 text-callout text-foreground",
      "[[data-stacked]>[data-slot=message-action-card-property]>&]:min-h-0 [[data-stacked]>[data-slot=message-action-card-property]>&]:py-0",
    ],
    scopeList: ["mt-0 stack-y-1.5"],
    scopeListViewport: ["max-h-[136px]"],
    scopeListViewportContent: ["stack-y-1.5 pr-1"],
    scopeListLabel: ["text-footnote font-medium text-foreground-hint"],
    scope: ["min-w-0 border p-1.5", "rounded-control border-line-hairline bg-layer-card px-2.5 py-2"],
    scopeName: ["break-all font-mono", "text-mono-meta font-normal text-foreground"],
    scopeDescription: ["mt-0.5 text-footnote text-pretty text-foreground-muted"],
    hintLabel: ["text-footnote font-medium text-foreground-hint"],
    hint: [
      "border-l-2 border-line-seam pl-2.5",
      "text-footnote text-foreground-muted",
      "[[data-slot=message-action-card-hint-label]+&]:-mt-1",
    ],
    notice: [
      "flex items-start gap-2",
      "[&>svg]:size-3.5 [&>svg]:shrink-0",
      "mb-0 rounded-control bg-fill-muted px-2.5 py-2",
      "text-footnote text-foreground-muted",
      "[&>svg]:mt-[calc((1lh-14px)/2)] [&>svg]:text-foreground-muted",
    ],
    completion: [
      "inline-flex items-center gap-1.5 text-footnote text-foreground-muted",
      "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-foreground",
    ],
    actions: ["mt-1"],
    actionsNote: ["min-w-0 basis-full", "text-footnote text-foreground-muted"],
  },
});
