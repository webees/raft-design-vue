import { tv } from "../../lib/tv";

export const tooltip = tv({
  slots: {
    trigger: ["select-none"],
    content: [
      "pointer-events-none relative isolate z-popup inline-block max-w-[min(20rem,var(--available-width,20rem))] min-w-0 px-2.5 py-1",
      "origin-(--transform-origin) outline-none",
      "starting:scale-[0.97] starting:opacity-0",
      "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-[0.99] data-[ending-style]:opacity-0",
      "transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[state=delayed-open]:scale-[0.97] data-[state=delayed-open]:opacity-0",
      "data-[state=instant-open]:scale-[0.97] data-[state=instant-open]:opacity-0",
      "data-[state=closed]:scale-[0.99] data-[state=closed]:opacity-0",
      "data-[instant]:transition-none",
      "motion-reduce:transition-none",
      "rounded-chip bg-layer-hud text-foreground-on-hud",
      "font-sans font-medium",
      "shadow-float",
      "has-data-[slot=kbd]:py-1 has-data-[slot=kbd]:pr-2.5",
    ],
    body: [
      "block min-w-0 text-footnote whitespace-normal wrap-break-word",
      "**:data-[slot=kbd]:relative **:data-[slot=kbd]:z-raised **:data-[slot=kbd]:ml-1.5",
      "**:data-[slot=kbd-group]:ml-1.5 [&_[data-slot=kbd-group]_[data-slot=kbd]]:ml-0",
      "**:data-[slot=kbd]:h-4 **:data-[slot=kbd]:min-w-4 **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:py-0",
      "[&_[data-slot=kbd][data-glyph=icon]]:px-0",
      "**:data-[slot=kbd]:text-[12px]/4 **:data-[slot=kbd]:font-normal",
    ],
    bodyIcon: ["shrink-0 [&>svg]:block [&>svg]:size-3.5 [&>svg]:shrink-0"],
    bodyText: ["min-w-0 flex-1"],
    arrow: [
      "pointer-events-none flex overflow-visible",
      "fill-layer-hud",
      "data-[side=top]:bottom-[-5px]",
      "data-[side=bottom]:top-[-5px] data-[side=bottom]:rotate-180",
      "data-[side=left]:right-[-8px] data-[side=left]:-rotate-90",
      "data-[side=right]:left-[-8px] data-[side=right]:rotate-90",
      "data-[side=inline-start]:right-[-8px] data-[side=inline-start]:-rotate-90",
      "data-[side=inline-end]:left-[-8px] data-[side=inline-end]:rotate-90",
    ],
  },
  variants: {
    hasLeadingIcon: {
      true: {
        body: ["flex items-center gap-x-1.5"],
      },
      false: {},
    },
  },
  defaultVariants: {
    hasLeadingIcon: false,
  },
});
