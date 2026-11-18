import { tv } from "../../lib/tv";

export const mobileNavServer = tv({
  slots: {
    item: [
      "select-none [-webkit-touch-callout:none]",
      "*:data-[slot=avatar]:size-[22px]",
      "data-popup-open:before:bg-fill-medium",
    ],
    content: [
      "flex flex-col",
      "w-[calc(var(--anchor-width)-16px)] min-w-0",
      "max-h-[min(max(60dvh,var(--mobile-nav-server-popover-floor,0px)),calc(var(--available-height)-env(safe-area-inset-top,0px)))]",
    ],
    scroll: ["flex min-h-0 flex-col"],
    list: [
      "flex min-h-[calc(var(--spacing-option)+var(--text-mono-meta--line-height)+(--spacing(2)))] flex-1 flex-col p-1",
    ],
    group: ["flex shrink-0 flex-col p-1"],
    row: [
      "flex w-full shrink-0 cursor-default select-none items-center",
      "text-left outline-none transition-colors",
      "min-h-option gap-2.5 rounded-chip px-2.5 py-option-inset",
      "font-sans text-callout font-medium text-foreground",
      "hover:bg-brand-soft active:bg-brand-soft focus-visible:bg-brand-soft",
      "aria-current:font-bold",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
      "[&>svg]:text-foreground-muted",
      "*:data-[slot=avatar]:size-5 *:data-[slot=avatar]:shrink-0",
    ],
    rowLabel: ["min-w-0 flex-1 truncate"],
    rowBody: ["flex min-w-0 flex-1 flex-col"],
    rowDescription: [
      "min-w-0 truncate",
      "font-mono text-mono-meta font-normal text-foreground-hint",
    ],
    destinations: [
      "grid shrink-0 grid-flow-col auto-cols-fr gap-1 p-1",
      "data-[layout=grid]:grid-flow-row data-[layout=grid]:grid-cols-3",
    ],
    destination: [
      "relative flex min-w-0 cursor-default select-none flex-col items-center justify-center",
      "outline-none transition-colors",
      "gap-1 rounded-chip px-1 py-2",
      "font-sans text-footnote font-medium text-foreground",
      "hover:bg-brand-soft active:bg-brand-soft focus-visible:bg-brand-soft",
      "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-foreground-muted",
      "[&>span]:max-w-full [&>span]:truncate",
      "*:data-[slot=status]:absolute *:data-[slot=status]:top-1 *:data-[slot=status]:left-[calc(50%+6px)]",
    ],
  },
});
