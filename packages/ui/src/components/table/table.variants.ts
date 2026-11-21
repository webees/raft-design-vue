import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

const sortButtonInteraction = [
  "cursor-pointer rounded-sticker",
  "hover:text-foreground",
  "outline-none focus-visible:shadow-focus",
  "pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:bottom-0 pointer-coarse:after:content-['']",
  "pointer-coarse:after:-top-[calc(--spacing(11)-100%)]",
];

export const table = tv({
  slots: {
    root: ["w-full border-collapse caption-bottom", "font-sans text-callout text-foreground"],
    header: [],
    body: [
      "[&>tr:last-child>td]:border-b-0 [&>tr:last-child>th]:border-b-0",
      "[&>tr]:hover:bg-fill-subtle [&>tr]:active:bg-fill-medium",
    ],
    row: [
      "not-aria-selected:not-data-[selected=true]:data-popup-open:bg-fill-subtle",
      "not-aria-selected:not-data-[selected=true]:has-data-popup-open:bg-fill-subtle",
      "aria-selected:bg-info-soft aria-selected:hover:bg-info-soft aria-selected:active:bg-info-soft",
      "data-[selected=true]:bg-info-soft data-[selected=true]:hover:bg-info-soft data-[selected=true]:active:bg-info-soft",
    ],
    head: [
      "text-left whitespace-nowrap",
      "border-b border-line-hairline px-3 py-2",
      "text-footnote font-bold normal-case tracking-normal text-foreground-hint",
    ],
    cell: ["align-top wrap-anywhere", "border-b border-line-hairline px-3 py-2"],
    colgroup: [],
    column: [],
    caption: ["pt-2 text-caption text-foreground-hint"],
    sortableHead: ["p-0"],
    sortButton: [
      "relative flex h-full w-full items-center gap-1",
      "border-0 bg-transparent [font:inherit]",
      ...sortButtonInteraction,
    ],
    headSortButton: [
      "relative flex w-full items-center gap-1",
      "border-0 bg-transparent px-3 py-2 [font:inherit]",
      ...sortButtonInteraction,
    ],
    sortArrow: ["size-3 shrink-0"],
  },
  variants: {
    align: {
      left: {},
      right: {
        head: "text-right",
        cell: "text-right",
        sortButton: "justify-end",
        headSortButton: "justify-end",
      },
    },
    sorted: {
      true: { sortButton: "text-foreground", headSortButton: "text-foreground" },
      false: { sortButton: "text-foreground-hint", headSortButton: "text-foreground-hint" },
    },
  },
  defaultVariants: {
    align: "left",
    sorted: false,
  },
});

export type TableVariants = VariantProps<typeof table>;
export type TableAlign = NonNullable<TableVariants["align"]>;
