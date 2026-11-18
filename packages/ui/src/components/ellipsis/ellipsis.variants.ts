import { tv } from "../../lib/tv";

export const ellipsis = tv({
  slots: {
    root: ["group/ellipsis min-w-0 max-w-full"],
    text: ["min-w-0"],
    content: [],
    spacer: [
      "float-end h-[calc(100%-1lh)] w-0",
      "data-hidden:hidden group-data-measuring/ellipsis:hidden",
    ],
    after: ["data-hidden:hidden group-data-measuring/ellipsis:hidden"],
  },
  variants: {
    multiline: {
      true: {
        root: ["flex"],
        text: ["flex-1", "wrap-break-word"],
        after: ["float-end clear-end ps-1"],
      },
      false: {
        root: ["inline-flex items-baseline gap-x-1 align-bottom"],
        after: ["shrink-0"],
      },
    },
    expanded: {
      true: {},
      false: {},
    },
    clickable: {
      true: { text: ["cursor-pointer"] },
      false: {},
    },
  },
  compoundVariants: [
    {
      multiline: false,
      expanded: false,
      class: { text: ["truncate", "print:overflow-visible print:whitespace-normal"] },
    },
    {
      multiline: false,
      expanded: true,
      class: { text: ["wrap-anywhere whitespace-normal"] },
    },
    {
      multiline: true,
      expanded: false,
      class: { text: ["line-clamp-(--ellipsis-lines)", "print:line-clamp-none"] },
    },
    {
      multiline: true,
      expanded: true,
      class: { text: ["line-clamp-none"] },
    },
  ],
});
