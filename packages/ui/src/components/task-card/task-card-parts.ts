import { defineComponent, h } from "vue";
import { taskCard } from "./task-card.variants";

type CardSlot = "row" | "body" | "meta" | "channel" | "number" | "legacy" | "title" | "description";

function createPart(name: string, slot: CardSlot, tag: string, slotName: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () =>
        h(
          tag,
          {
            ...attrs,
            "data-slot": slotName,
            class: taskCard()[slot]({ className: attrs.class as string }),
          },
          slots.default?.(),
        );
    },
  });
}

export const TaskCardRow = createPart("RaftTaskCardRow", "row", "div", "task-card-row");
export const TaskCardBody = createPart("RaftTaskCardBody", "body", "div", "task-card-body");
export const TaskCardMeta = createPart("RaftTaskCardMeta", "meta", "div", "task-card-meta");
export const TaskCardChannel = createPart(
  "RaftTaskCardChannel",
  "channel",
  "span",
  "task-card-channel",
);
export const TaskCardNumber = createPart(
  "RaftTaskCardNumber",
  "number",
  "span",
  "task-card-number",
);
export const TaskCardLegacy = createPart(
  "RaftTaskCardLegacy",
  "legacy",
  "span",
  "task-card-legacy",
);
export const TaskCardTitle = createPart(
  "RaftTaskCardTitle",
  "title",
  "p",
  "task-card-title",
);
export const TaskCardDescription = createPart(
  "RaftTaskCardDescription",
  "description",
  "p",
  "task-card-description",
);
