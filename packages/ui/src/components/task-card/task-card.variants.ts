import { tv } from "../../lib/tv";

export const taskCard = tv({
  slots: {
    root: [
      "relative w-full text-left",
      "transition-all duration-100",
      "data-[interactive=true]:cursor-pointer",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:transform-none",
      "group-data-[dragging=true]/task-draggable:transform-none",
      "motion-reduce:transform-none motion-reduce:transition-none",
      "rounded-container border border-line-hairline bg-layer-card p-3 text-foreground shadow-none",
      "data-[interactive=true]:hover:overlay-subtle data-[interactive=true]:active:overlay-medium",
      "data-[disabled=true]:bg-fill-muted data-[disabled=true]:opacity-100",
      "group-data-[dragging=true]/task-draggable:not-in-data-drag-origin:shadow-float",
    ],
    row: ["flex min-w-0 items-start gap-2"],
    body: ["min-w-0 flex-1"],
    meta: ["flex min-w-0 flex-nowrap items-center gap-2", "mb-2"],
    channel: [
      "min-w-0 truncate",
      "font-mono text-mono-meta font-normal text-foreground-hint",
    ],
    number: ["shrink-0", "font-mono text-mono-meta font-normal text-foreground-hint"],
    legacy: [
      "shrink-0",
      "inline-flex h-[22px] items-center rounded-chip px-1.5 py-0",
      "inset-ring inset-ring-line-hairline",
      "font-mono text-mono-meta font-normal text-foreground-muted",
    ],
    title: [
      "line-clamp-3 wrap-break-word",
      "text-body font-semibold text-foreground",
      "in-data-[disabled=true]:text-foreground-disabled",
    ],
    description: [
      "line-clamp-2 wrap-break-word",
      "mt-1 text-callout text-foreground-muted",
      "in-data-[disabled=true]:text-foreground-disabled",
    ],
  },
});

export const taskCardStatus = tv({
  base: [
    "inline-flex min-w-0 shrink-0 touch-manipulation items-center",
    "transition-[filter,opacity] duration-100 outline-none",
    "data-[busy=true]:pointer-events-none data-[busy=true]:cursor-wait data-[busy=true]:opacity-dimmed data-[busy=true]:disabled:opacity-100",
    "h-[22px] gap-1.5 rounded-chip border-0 px-[7px] py-0",
    "font-sans text-[12px] leading-4 font-semibold text-foreground",
    "[&:not(:has([data-slot=task-card-status-label]))]:hidden",
    "**:data-[slot=task-card-status-label]:inline-flex **:data-[slot=task-card-status-label]:items-center [&_[data-slot=task-card-status-label]]:gap-1.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3 [&_svg:not([data-slot=task-status-icon])]:-mx-0.5 [&_svg[data-slot=task-status-icon]]:size-2.5",
    "[button&]:cursor-pointer [button&]:enabled:hover:overlay-medium [button&]:enabled:active:overlay-medium",
    "disabled:cursor-default disabled:opacity-100",
    "focus-visible:shadow-focus",
  ],
});
