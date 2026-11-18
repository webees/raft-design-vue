import { tv } from "../../lib/tv";

export const appShell = tv({
  slots: {
    root: [
      "flex min-h-0 w-full overflow-visible md:overflow-clip",
      "max-md:flex-col max-md:pt-[env(safe-area-inset-top,0px)]",
      "font-sans",
      "[--shell-header-height:var(--header-height)] [@media(max-height:600px)]:[--shell-header-height:var(--header-height-short)]",
      "bg-layer-canvas text-foreground",
    ],
    railSlot: ["hidden h-full shrink-0 flex-col md:flex"],
    sidebarSlot: ["hidden min-h-0 shrink-0 flex-col md:flex"],
    mainSlot: ["flex min-h-0 min-w-0 flex-1 flex-col"],
    panelSlot: ["hidden min-h-0 min-w-0 flex-col md:flex"],
    overlaySlot: ["absolute inset-0 z-cover flex min-h-0 min-w-0"],
  },
  variants: {
    overlay: {
      false: {},
      true: {
        mainSlot: "relative",
      },
    },
  },
  defaultVariants: {
    overlay: false,
  },
});
