import { searchHit } from "../../lib/search-hit";
import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

const sender = [
  "min-w-0 truncate",
  "text-subhead font-bold text-foreground",
  "rounded-[2px] outline-none focus-visible:shadow-focus",
];

export const messageItem = tv({
  slots: {
    root: [
      "group/message relative flex h-fit gap-3",
      "hover:[--mi-toolbar-opacity:1] hover:[--mi-toolbar-pe:auto] focus-within:[--mi-toolbar-opacity:1] focus-within:[--mi-toolbar-pe:auto]",
      "has-data-popup-open:[--mi-toolbar-opacity:1] has-data-popup-open:[--mi-toolbar-pe:auto]",
      "hover:[--mi-header-mask:linear-gradient(to_left,transparent_calc(var(--mi-toolbar-width)+8px),black_calc(var(--mi-toolbar-width)+20px))]",
      "focus-within:[--mi-header-mask:linear-gradient(to_left,transparent_calc(var(--mi-toolbar-width)+8px),black_calc(var(--mi-toolbar-width)+20px))]",
      "has-data-popup-open:[--mi-header-mask:linear-gradient(to_left,transparent_calc(var(--mi-toolbar-width)+8px),black_calc(var(--mi-toolbar-width)+20px))]",
      "min-h-0 px-2 py-timeline-row border-t-(length:--spacing-timeline-turn) border-transparent bg-clip-padding",
      "hover:[--mi-ct-color:var(--foreground-hint)] has-data-popup-open:[--mi-ct-color:var(--foreground-hint)]",
      "bg-(--mi-row-fill) [--mi-row-fill:var(--located-fill)]",
      "not-data-located:hover:[--mi-row-fill:var(--fill-subtle)]",
      "data-popup-open:[--mi-row-fill:var(--fill-subtle)] has-data-popup-open:[--mi-row-fill:var(--fill-subtle)]",
      "has-data-[slot=message-item-search-match]:[--mi-row-fill:var(--info-soft)] has-data-[slot=message-item-search-match]:hover:[--mi-row-fill:var(--info-soft)]",
      "has-[[data-slot=message-multi-select-checkbox][data-checked]]:[--mi-row-fill:var(--info-soft)]",
      "has-[[data-slot=message-multi-select-checkbox][data-checked]]:hover:[--mi-row-fill:var(--info-soft)]",
      "outline-none focus-visible:keyboard:inset-ring-2 focus-visible:keyboard:inset-ring-foreground",
    ],
    gutter: ["relative shrink-0 self-stretch", "w-[35px]"],
    avatarSlot: [
      "relative shrink-0 self-start",
      "flex w-[35px] justify-center",
      "[&_[data-slot=avatar][data-size=md]]:size-(--mi-avatar,35px)",
    ],
    continuationTime: [
      "absolute right-0 select-none whitespace-nowrap tabular-nums",
      "top-[calc((var(--text-body--line-height)-var(--text-mono-meta--line-height))/2)]",
      "font-mono text-mono-meta",
      "text-(--mi-ct-color,transparent)",
    ],
    content: ["@container/message min-w-0 flex-1", "text-body text-foreground"],
    header: [
      "mb-px flex min-w-0 items-baseline gap-1.5 overflow-hidden",
      "@3xl/message:pe-[20%]",
      "mask-(--mi-header-mask,none)",
      "has-data-[slot=message-item-delegated-by]:[--mi-owner-basis:3rem] has-data-[slot=message-item-delegated-by]:[--mi-owner-flex:1_0]",
    ],
    senderGroup: [
      "flex min-w-0 items-baseline gap-1.5 overflow-hidden",
      "flex-[var(--mi-owner-flex,0_1)_var(--mi-owner-basis,auto)] max-w-max",
      "*:data-[slot=message-item-meta]:basis-0 *:data-[slot=message-item-meta]:grow",
      "*:data-[slot=message-item-meta]:-ms-1.5 *:data-[slot=message-item-meta]:before:inline-block *:data-[slot=message-item-meta]:before:w-1.5 *:data-[slot=message-item-meta]:before:content-['']",
    ],
    sender,
    senderButton: [
      ...sender,
      "cursor-pointer",
      "decoration-[1.5px] underline-offset-[3px] hover:underline",
    ],
    senderBadges: ["inline-flex shrink-0 items-center gap-1"],
    meta: ["min-w-0 truncate", "text-caption text-foreground-hint"],
    time: [
      "shrink-0 whitespace-nowrap",
      "font-mono text-mono-meta tabular-nums text-foreground-hint",
    ],
    inlineStatus: ["shrink-0", "text-caption text-foreground-hint"],
    delegatedBy: [
      "inline-grid grid-flow-col items-baseline",
      "min-w-min shrink whitespace-pre-wrap",
      "has-data-[slot=message-item-delegated-by-name]:max-w-[45%] has-data-[slot=message-item-delegated-by-name]:whitespace-pre",
      "has-data-[slot=message-item-delegated-by-button]:max-w-[45%] has-data-[slot=message-item-delegated-by-button]:whitespace-pre",
      "text-caption text-foreground-muted",
    ],
    delegatedByName: ["min-w-0 truncate"],
    delegatedByButton: [
      "min-w-0 truncate",
      "cursor-pointer decoration-1 underline-offset-[3px] hover:underline",
      "rounded-[2px] outline-none focus-visible:shadow-focus",
    ],
    delegatedAvatar: [
      "size-[19px] group-data-[size=md]/avatar:size-[19px]",
      "rounded-sticker outline-none",
      "bg-layer-canvas bg-[linear-gradient(var(--mi-row-fill,transparent),var(--mi-row-fill,transparent))]",
      "data-deleted:*:data-[slot=avatar]:grayscale data-deleted:*:data-[slot=avatar]:opacity-dimmed",
      "shadow-[0_0_0_1.5px_var(--mi-row-fill,transparent),0_0_0_1.5px_var(--layer-canvas)]",
      "dark:shadow-[0_0_0_3px_var(--mi-row-fill,transparent),0_0_0_3px_var(--layer-canvas)]",
    ],
    edited: ["ms-1 whitespace-nowrap", "text-caption text-foreground-hint"],
    trailing: [
      "absolute end-0 bottom-0 z-raised flex h-lh items-center",
      "select-none! **:select-none!",
    ],
    body: [
      "wrap-break-word select-text",
      "**:select-text",
      "text-body text-foreground",
      "selection:bg-selection",
    ],
    searchMatch: searchHit,
    embedded: ["min-w-0", "mt-2"],
    attachments: ["stack-y-2", "mt-2"],
    footer: ["mt-1.5 flex flex-wrap items-center gap-1.5"],
    toolbar: [
      "absolute z-control flex items-center",
      "opacity-(--mi-toolbar-opacity,0)",
      "[pointer-events:var(--mi-toolbar-pe,none)]",
      "top-[-18px] md:pointer-fine:top-[calc(-1*(var(--control-height)+8px)/2)] right-3 gap-1 overflow-visible rounded-container p-1",
      "bg-layer-popover ring-1 ring-line-seam ring-inset shadow-float",
    ],
    toolbarButton: [
      "inline-flex shrink-0 items-center justify-center",
      "[&_svg]:shrink-0",
      "size-7 rounded-chip md:pointer-fine:size-control md:pointer-fine:rounded-control border-0 bg-transparent p-0",
      "text-foreground-muted hover:bg-fill-medium active:bg-fill-medium",
      "data-popup-open:bg-fill-medium data-active:text-foreground",
      "outline-none focus-visible:shadow-focus",
      "[&_svg]:size-4",
    ],
  },
  variants: {
    compact: {
      true: { root: ["border-t-0"] },
    },
  },
});

export type MessageItemVariantProps = VariantProps<typeof messageItem>;
