import { tv } from "../../lib/tv";

export const composerSuggestionList = tv({
  slots: {
    root: [
      "absolute inset-x-0 bottom-full w-auto",
      "mb-2 max-h-60 overflow-x-hidden rounded-container p-1",
      "bg-layer-popover text-foreground ring-1 ring-line-seam shadow-float",
    ],
    group: ["flex flex-col"],
    groupLabel: [
      "py-1.5",
      "px-2.5 pt-2 pb-1 font-sans text-caption font-bold text-foreground-hint",
    ],
    item: [
      "flex w-full items-center text-left",
      "min-h-option cursor-pointer gap-2.5 rounded-chip px-2.5 py-1",
      "font-sans text-callout font-medium text-foreground",
      "hover:bg-brand-soft data-[highlighted=true]:bg-brand-soft",
      "data-[disabled=true]:cursor-default data-[disabled=true]:text-foreground-disabled",
      "data-[disabled=true]:hover:bg-transparent",
    ],
    content: ["flex min-w-0 flex-1 items-center gap-1.5 text-left"],
    icon: ["shrink-0"],
    title: ["min-w-0 truncate"],
    aside: ["ml-auto flex max-w-[33%] min-w-0 shrink-0 items-center justify-end"],
    meta: ["text-caption text-foreground-hint"],
  },
  variants: {
    separated: {
      true: { group: ["-mx-1 mt-1 border-t border-line-hairline px-1 pt-1"] },
      false: {},
    },
    iconVariant: {
      avatar: {},
      framed: {
        icon: [
          "flex size-[19px] items-center justify-center rounded-sticker",
          "bg-fill-muted text-foreground-muted [&_svg]:size-[11px]",
        ],
      },
      auxiliary: { icon: ["-ml-1 size-3", "text-foreground-hint"] },
      inline: {
        icon: ["flex size-3.5 items-center justify-center [&_svg]:size-3.5", "text-foreground-hint"],
      },
    },
    metaVariant: {
      text: { meta: "min-w-0 flex-1 basis-0 truncate" },
      code: { meta: ["min-w-0 truncate font-mono", "text-mono-meta text-foreground-hint"] },
    },
  },
  defaultVariants: {
    separated: false,
    iconVariant: "avatar",
    metaVariant: "text",
  },
});
