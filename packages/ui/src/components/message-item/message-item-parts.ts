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
import { fixedPartFactory } from "../../lib/slot-part";
import { useMessageItemLabelId } from "./message-item-context";
import { observeTrailing, stampTrailingSlot } from "./message-item-trailing";
import { messageItem } from "./message-item.recipe";

const part = fixedPartFactory(messageItem);

export const MessageItemGutter = part("MessageItemGutter", "gutter");
export const MessageItemAvatarSlot = part("MessageItemAvatarSlot", "avatarSlot");
export const MessageItemContinuationTime = labelledPart(
  "RaftMessageItemContinuationTime",
  "time",
  "message-item-continuation-time",
  "continuationTime",
  "time",
);
export const MessageItemContent = part("MessageItemContent", "content");
export const MessageItemHeader = part("MessageItemHeader", "header");
export const MessageItemSenderGroup = part("MessageItemSenderGroup", "senderGroup", "span");
function labelledPart(
  name: string,
  tag: string,
  dataSlot: string,
  slotName: keyof ReturnType<typeof messageItem>,
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
export const MessageItemSenderBadges = part("MessageItemSenderBadges", "senderBadges", "span");
export const MessageItemMeta = part("MessageItemMeta", "meta", "span");
export const MessageItemTime = labelledPart(
  "RaftMessageItemTime",
  "time",
  "message-item-time",
  "time",
  "time",
);
export const MessageItemInlineStatus = part("MessageItemInlineStatus", "inlineStatus", "span");
export const MessageItemDelegatedBy = part("MessageItemDelegatedBy", "delegatedBy", "span");
export const MessageItemDelegatedByName = part(
  "MessageItemDelegatedByName",
  "delegatedByName",
  "span",
);
export const MessageItemDelegatedByButton = part(
  "MessageItemDelegatedByButton",
  "delegatedByButton",
  "button",
  { defaultType: "button" },
);
export const MessageItemBody = part("MessageItemBody", "body");
export const MessageItemAttachments = part("MessageItemAttachments", "attachments");
export const MessageItemEmbedded = part("MessageItemEmbedded", "embedded");
export const MessageItemEdited = part("MessageItemEdited", "edited", "span");
export const MessageItemSearchMatch = part("MessageItemSearchMatch", "searchMatch", "mark");
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
export const MessageItemFooter = part("MessageItemFooter", "footer");
export const MessageItemToolbarSlot = part("MessageItemToolbarSlot", "toolbar", "div", {
  dataSlot: "message-item-toolbar",
});
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
