import { tv } from "../../lib/tv";

export const announcement = tv({
  slots: {
    content: ["@container/announcement max-w-xl gap-0 overflow-clip p-0"],
    body: [
      "min-h-0 max-h-[70dvh] pb-5",
      "[&_[data-slot=announcement-picture]+[data-slot=announcement-text]]:mt-5",
      "px-(--surface-inset) pt-(--surface-inset)",
    ],
    header: ["flex min-w-0 items-center justify-between gap-3"],
    label: [
      "flex min-w-0 items-center gap-2 wrap-break-word",
      "text-caption text-foreground-muted",
    ],
    dot: ["shrink-0", "size-2.5 rounded-[2px] border-[1.5px] border-sticker-ink bg-attention-400"],
    title: ["mt-3 wrap-break-word normal-case", "text-headline font-bold tracking-normal"],
    picture: [
      "mt-5 h-44 w-full overflow-hidden border border-line-hairline [&_img]:size-full  [&_img]:object-contain",
      "rounded-container bg-fill-muted",
    ],
    text: [
      "mt-3 min-w-0 wrap-break-word [&_p+p]:mt-3",
      // Native scroll, an allowed exception (scroll-area.md#native-scrolling): a
      // `<pre>` in the text holds phrasing content only, so it has no room for gutters.
      "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_pre]:max-w-full [&_pre]:overflow-x-auto",
      "text-subhead text-foreground-muted",
    ],
    footer: [
      "flex shrink-0 flex-wrap items-center justify-between gap-3 border-line-hairline py-4 @max-[28rem]/announcement:flex-col",
      "border-t-0 px-(--surface-inset) pt-0 pb-(--surface-inset)",
    ],
    action: [
      "ml-auto h-auto min-h-8 min-w-0 max-w-full py-1 whitespace-normal text-center font-bold @max-[28rem]/announcement:ml-0 @max-[28rem]/announcement:w-full",
    ],
    secondary: ["min-w-0 max-w-full whitespace-normal @max-[28rem]/announcement:w-full"],
  },
});
