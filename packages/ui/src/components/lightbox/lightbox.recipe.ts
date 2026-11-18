import { headEdgePull } from "../../lib/head-edges";
import { tv } from "../../lib/tv";

export const lightbox = tv({
  slots: {
    portal: ["relative isolate z-lightbox"],
    backdrop: ["fixed inset-0 bg-layer-backdrop data-closed:hidden"],
    content: [
      "pointer-events-none fixed inset-0 flex flex-col data-closed:hidden",
      "*:data-lightbox-close:pointer-events-auto *:data-lightbox-close:absolute *:data-lightbox-close:z-raised",
      "*:data-lightbox-close:top-[calc(16px+env(safe-area-inset-top,0px))] *:data-lightbox-close:right-[calc(16px+env(safe-area-inset-right,0px))]",
    ],
    header: [
      "pointer-events-auto shrink-0",
      "flex items-center gap-3 pb-3",
      "pt-[calc(env(safe-area-inset-top,0px)+(--spacing(3)))]",
      "pl-[calc(env(safe-area-inset-left,0px)+(--spacing(4)))]",
      "pr-[calc(env(safe-area-inset-right,0px)+(--spacing(4)))]",
      "bg-transparent shadow-none",
      headEdgePull,
    ],
    toolbar: [
      "pointer-events-auto shrink-0 flex items-center gap-3",
      "h-[calc(var(--header-height)+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)]",
      "pl-[calc(16px+env(safe-area-inset-left,0px))] pr-[calc(16px+env(safe-area-inset-right,0px))]",
      "**:data-lightbox-close:static **:data-lightbox-close:inset-auto",
      "**:data-lightbox-close:top-auto **:data-lightbox-close:right-auto",
      "border-b border-line-seam bg-layer-canvas shadow-none",
      headEdgePull,
    ],
    headerMeta: ["flex min-w-0 flex-1 items-center gap-1.5"],
    headerLabel: [
      "inline-flex shrink-0 items-center px-1.5",
      "h-[22px] rounded-chip bg-fill-muted py-0",
      "font-sans text-caption font-semibold normal-case tracking-normal text-foreground-muted",
    ],
    title: ["min-w-0 flex-1 truncate", "py-0 font-sans text-headline font-bold text-foreground"],
    actions: [
      "flex shrink-0 items-center",
      "gap-1",
      "[&>[data-icon-inset]:nth-last-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-mr-icon-inset",
    ],
    body: [
      "pointer-events-auto min-h-0 flex-1 overscroll-contain",
      "bg-layer-canvas",
      "focus-visible:shadow-none focus-visible:keyboard:outline-2 focus-visible:keyboard:-outline-offset-2 focus-visible:keyboard:outline-foreground",
    ],
    bodyContent: [
      "pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]",
    ],
    stage: [
      "pointer-events-none relative flex min-h-0 flex-1 items-center justify-center overflow-hidden",
    ],
    media: ["pointer-events-auto max-h-[80vh] max-w-[86vw] border-0 bg-transparent shadow-none"],
    navigationButton: [
      "pointer-events-auto absolute z-raised inline-flex items-center justify-center",
      "transition-[background-color,color,opacity,box-shadow,transform] duration-150",
      "outline-[1px] outline-offset-2 outline-transparent",
      "data-[disabled=true]:cursor-default",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "size-11 rounded-control border-[1.5px] border-line-strong bg-layer-card text-foreground shadow-none",
      "hover:overlay-medium active:overlay-medium",
      "focus-visible:outline-transparent focus-visible:shadow-focus",
      "[&_svg]:size-5.5",
    ],
    infoDock: ["pointer-events-none absolute inset-x-6 bottom-20  z-raised flex justify-center"],
    infoBar: [
      "pointer-events-auto flex items-center",
      "w-[clamp(144px,20vw,224px)] max-w-[calc(100vw-48px)] min-w-36",
      "gap-2 rounded-container py-1 pr-1 pl-2.5",
      "bg-layer-popover text-foreground shadow-float ring-1 ring-line-seam",
    ],
    infoTitle: ["min-w-0 flex-1 truncate", "font-sans text-footnote font-semibold text-foreground"],
    infoActions: [
      "flex shrink-0 items-center",
      "gap-1",
      "*:data-[slot=button]:h-7 *:data-[slot=button]:w-auto *:data-[slot=button]:min-w-7",
      "*:data-[slot=button]:rounded-chip",
      "*:data-[slot=button]:after:inset-x-[-3px] *:data-[slot=button]:first:after:left-[-9.5px] *:data-[slot=button]:last:after:right-[-9.5px]",
      "pointer-coarse:*:data-[slot=button]:after:inset-y-[-9.5px]",
    ],
    thumbnailStrip: [
      "pointer-events-none absolute inset-x-0 bottom-4  z-raised",
      "flex items-center justify-center gap-1.5",
    ],
    thumbnail: [
      "group/lightbox-thumb pointer-events-auto relative size-12 overflow-hidden",
      "transition-[border-color,opacity,box-shadow] duration-150",
      "[&_img]:pointer-events-none [&_img]:size-full [&_img]:object-cover",
      "rounded-control border-[1.5px] opacity-100 shadow-none",
      "border-sticker-paper/40 hover:border-sticker-paper/80",
      "data-active:border-sticker-paper",
    ],
    thumbnailOverlay: [
      "pointer-events-none absolute inset-0 block transition-colors duration-150",
      "bg-layer-backdrop-nested group-hover/lightbox-thumb:bg-layer-backdrop-nested/70",
      "group-data-active/lightbox-thumb:bg-transparent",
    ],
    close: ["pointer-events-auto"],
  },
  variants: {
    nested: {
      true: { backdrop: ["bg-layer-backdrop-nested"] },
    },
  },
});

export type LightboxVariants = Parameters<typeof lightbox>[0];
