import { tv } from "../../lib/tv";

export const messageEmbed = tv({
  slots: {
    root: [
      "group block min-w-0 text-left",
      "rounded-container border border-line-hairline bg-layer-card",
      "outline-none focus-visible:shadow-focus",
      "data-[interactive=true]:hover:overlay-subtle data-[interactive=true]:active:overlay-medium",
      "not-data-[frame=bar]:*:data-[slot=message-embed-content]:first:rounded-t-[calc(var(--radius-container)-1px)] not-data-[frame=bar]:*:data-[slot=message-embed-content]:first:overflow-clip",
      "not-data-[frame=bar]:*:data-[slot=message-embed-content]:last:rounded-b-[calc(var(--radius-container)-1px)] not-data-[frame=bar]:*:data-[slot=message-embed-content]:last:overflow-clip",
    ],
    header: ["min-w-0", "px-3 py-2"],
    content: ["min-w-0"],
    footer: ["min-w-0", "px-3 py-2"],
  },
  variants: {
    size: {
      item: { root: ["w-full max-w-[400px] max-md:max-w-none"] },
      content: { root: ["w-full max-w-[560px]"] },
    },
  },
});

export const messageCard = tv({
  slots: {
    source: [
      "flex min-w-0 items-center gap-1.5",
      "border-b border-line-hairline px-3 py-2",
      "font-sans text-caption text-foreground-muted",
    ],
    sourceIcon: [
      "inline-flex size-4 shrink-0 items-center justify-center",
      "*:size-full *:shrink-0 [&>img]:rounded-[2px] [&>img]:object-cover",
    ],
    sourceName: ["min-w-0 truncate", "font-semibold text-foreground"],
    sourceHost: ["flex min-w-0 items-baseline", "before:shrink-0 before:pe-1.5 before:content-['·']"],
    sourceHostText: ["min-w-0 truncate"],
    sourceFooter: [
      "m-0 truncate",
      "border-t border-line-hairline px-3 py-2",
      "font-sans text-caption text-foreground-muted",
    ],
    body: ["flex min-w-0 flex-col gap-1.5", "p-3"],
    eyebrow: ["m-0 truncate", "font-mono text-mono-meta text-foreground-muted"],
    title: [
      "m-0 line-clamp-2",
      "font-sans text-subhead font-bold text-foreground",
      "[&_a]:rounded-[2px] [&_a]:decoration-[1.5px] [&_a]:underline-offset-[3px] [&_a]:hover:underline",
      "[&_a]:outline-none [&_a]:focus-visible:shadow-focus",
    ],
    heading: ["font-sans text-subhead font-bold text-foreground"],
    meta: [
      "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
      "m-0 font-sans text-callout text-foreground-muted",
    ],
    actions: ["flex flex-wrap items-center justify-end gap-2", "px-3 pb-3"],
    actionRow: ["flex flex-wrap items-center justify-end gap-2"],
    actionGroup: ["flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2", "ms-auto"],
    inset: ["p-3"],
    popover: ["w-[400px] max-w-(--available-width)"],
  },
});
