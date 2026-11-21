import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
} from "vue";
import { Primitive } from "reka-ui";

import { toElement } from "../../lib/dom";
import { primitivePartProps } from "../../lib/part-props";
import { createSlotPart, recipePart } from "../../lib/slot-part";
import { useMessageItemLabelId } from "./message-item-context";
import { observeTrailing, stampTrailingSlot } from "./message-item-trailing";
import { messageItem } from "./message-item.recipe";

type MessageItemSlots = ReturnType<typeof messageItem>;

const part = (name: string, tag: string, dataSlot: string, slotName: keyof MessageItemSlots) =>
  recipePart(name, tag, dataSlot, (className) => messageItem()[slotName]({ className }));

export const MessageItemGutter = part(
  "RaftMessageItemGutter",
  "div",
  "message-item-gutter",
  "gutter",
);
export const MessageItemAvatarSlot = part(
  "RaftMessageItemAvatarSlot",
  "div",
  "message-item-avatar-slot",
  "avatarSlot",
);
export const MessageItemContinuationTime = labelledPart(
  "RaftMessageItemContinuationTime",
  "time",
  "message-item-continuation-time",
  "continuationTime",
  "time",
);
export const MessageItemContent = part(
  "RaftMessageItemContent",
  "div",
  "message-item-content",
  "content",
);
export const MessageItemHeader = part(
  "RaftMessageItemHeader",
  "div",
  "message-item-header",
  "header",
);
export const MessageItemSenderGroup = part(
  "RaftMessageItemSenderGroup",
  "span",
  "message-item-sender-group",
  "senderGroup",
);
function labelledPart(
  name: string,
  tag: string,
  dataSlot: string,
  slotName: keyof MessageItemSlots,
  part: "sender" | "time",
  type?: "button",
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      class: { type: String, default: undefined },
      id: { type: String, default: undefined },
    },
    setup(props, { slots }) {
      const attrs = useAttrs();
      const id = computed(() => props.id);
      const labelId = useMessageItemLabelId(part, id);
      return () =>
        h(
          tag,
          {
            ...attrs,
            ...(type ? { type } : {}),
            id: labelId.value,
            "data-slot": dataSlot,
            class: messageItem()[slotName]({ className: props.class }),
          },
          slots.default?.(),
        );
    },
  });
}

export const MessageItemSender = labelledPart(
  "RaftMessageItemSender",
  "span",
  "message-item-sender",
  "sender",
  "sender",
);
export const MessageItemSenderButton = labelledPart(
  "RaftMessageItemSenderButton",
  "button",
  "message-item-sender-button",
  "senderButton",
  "sender",
  "button",
);
export const MessageItemSenderBadges = part(
  "RaftMessageItemSenderBadges",
  "span",
  "message-item-sender-badges",
  "senderBadges",
);
export const MessageItemMeta = part("RaftMessageItemMeta", "span", "message-item-meta", "meta");
export const MessageItemTime = labelledPart(
  "RaftMessageItemTime",
  "time",
  "message-item-time",
  "time",
  "time",
);
export const MessageItemInlineStatus = part(
  "RaftMessageItemInlineStatus",
  "span",
  "message-item-inline-status",
  "inlineStatus",
);
export const MessageItemDelegatedBy = part(
  "RaftMessageItemDelegatedBy",
  "span",
  "message-item-delegated-by",
  "delegatedBy",
);
export const MessageItemDelegatedByName = part(
  "RaftMessageItemDelegatedByName",
  "span",
  "message-item-delegated-by-name",
  "delegatedByName",
);
export const MessageItemDelegatedByButton = createSlotPart({
  name: "RaftMessageItemDelegatedByButton",
  tag: "button",
  dataSlot: "message-item-delegated-by-button",
  type: "button",
  className: (className) => messageItem().delegatedByButton({ className }),
});
export const MessageItemBody = part("RaftMessageItemBody", "div", "message-item-body", "body");
export const MessageItemAttachments = part(
  "RaftMessageItemAttachments",
  "div",
  "message-item-attachments",
  "attachments",
);
export const MessageItemEmbedded = part(
  "RaftMessageItemEmbedded",
  "div",
  "message-item-embedded",
  "embedded",
);
export const MessageItemEdited = part(
  "RaftMessageItemEdited",
  "span",
  "message-item-edited",
  "edited",
);
export const MessageItemSearchMatch = part(
  "RaftMessageItemSearchMatch",
  "mark",
  "message-item-search-match",
  "searchMatch",
);
export const MessageItemTrailing = defineComponent({
  name: "RaftMessageItemTrailing",
  inheritAttrs: false,
  props: primitivePartProps(),
  setup(props, { slots }) {
    const attrs = useAttrs();
    const element = ref<HTMLElement | null>(null);
    let stop: (() => void) | undefined;
    const setElement = (value: unknown) => {
      const resolved = toElement(value);
      if (element.value === resolved) {
        return;
      }
      stop?.();
      stop = undefined;
      element.value = resolved;
      if (resolved) {
        stop = observeTrailing(resolved);
      }
    };
    onMounted(() => {
      if (element.value) {
        stampTrailingSlot(element.value);
      }
    });
    onUpdated(() => {
      if (element.value) {
        stampTrailingSlot(element.value);
      }
    });
    onBeforeUnmount(() => stop?.());
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          ref: setElement,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-item-trailing",
          class: messageItem().trailing({ className: props.class }),
        },
        { default: () => slots.default?.() },
      );
  },
});
export const MessageItemFooter = part(
  "RaftMessageItemFooter",
  "div",
  "message-item-footer",
  "footer",
);
export const MessageItemToolbarSlot = part(
  "RaftMessageItemToolbarSlot",
  "div",
  "message-item-toolbar",
  "toolbar",
);
export const MessageItemToolbarButton = defineComponent({
  name: "RaftMessageItemToolbarButton",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "button" },
    asChild: { type: Boolean, default: false },
    class: { type: String, default: undefined },
    active: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const classes = computed(() => messageItem().toolbarButton({ className: props.class }));
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          type: "button",
          "data-slot": "message-item-toolbar-button",
          "data-active": props.active ? "true" : undefined,
          class: classes.value,
        },
        { default: () => slots.default?.() },
      );
  },
});
