import { Primitive } from "reka-ui";
import { cn } from "../../lib/cn";
import { threadPanel } from "./thread-panel.variants";

type PartName = Exclude<keyof ReturnType<typeof threadPanel>, "root" | "header" | "footer">;

function createThreadPart(
  name: string,
  part: PartName,
  tag: string,
  staticAttrs?: Record<string, string>,
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      as: { type: String, default: tag },
      asChild: { type: Boolean, default: false },
      class: { type: String, default: undefined },
    },
    setup(props, { attrs, slots }) {
      const rootClass = computed(() =>
        cn(threadPanel()[part](), props.class, attrs.class as string | undefined),
      );
      return () =>
        h(
          Primitive,
          {
            as: props.as,
            asChild: props.asChild,
            ...attrs,
            "data-slot": `thread-panel-${part.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`,
            ...staticAttrs,
            class: rootClass.value,
          },
          slots.default ? { default: slots.default } : undefined,
        );
    },
  });
}

export const ThreadPanelContent = createThreadPart("RaftThreadPanelContent", "content", "div");
export const ThreadPanelTitle = createThreadPart("RaftThreadPanelTitle", "title", "h2");
export const ThreadPanelTitleMeta = createThreadPart(
  "RaftThreadPanelTitleMeta",
  "titleMeta",
  "span",
);
export const ThreadPanelActions = createThreadPart("RaftThreadPanelActions", "actions", "div", {
  "data-icon-inset": "",
});
export const ThreadPanelOriginalMessage = createThreadPart(
  "RaftThreadPanelOriginalMessage",
  "originalMessage",
  "div",
);
export const ThreadPanelReplySummary = createThreadPart(
  "RaftThreadPanelReplySummary",
  "replySummary",
  "div",
);
export const ThreadPanelReplyCount = createThreadPart(
  "RaftThreadPanelReplyCount",
  "replyCount",
  "div",
);
export const ThreadPanelSearch = createThreadPart("RaftThreadPanelSearch", "search", "div");
export const ThreadPanelSearchTrailing = createThreadPart(
  "RaftThreadPanelSearchTrailing",
  "searchTrailing",
  "div",
);
export const ThreadPanelSearchCount = createThreadPart(
  "RaftThreadPanelSearchCount",
  "searchCount",
  "div",
);
