import { computed, defineComponent, h, useAttrs, type PropType } from "vue";

import { badgeVariants } from "../badge/badge.variants";
import { messageFooter } from "./message-footer.recipe";

function footerPart(
  name: string,
  tag: string,
  dataSlot: string,
  slot: "savedIndicator" | "readReceipt" | "badgeSeparator",
  extra: { "aria-hidden"?: "true"; iconOnly?: boolean } = {},
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: { class: { type: String, default: undefined } },
    setup(props, { slots }) {
      const attrs = useAttrs();
      return () =>
        h(
          tag,
          {
            ...attrs,
            "data-slot": dataSlot,
            ...(extra["aria-hidden"] ? { "aria-hidden": extra["aria-hidden"] } : {}),
            ...(extra.iconOnly ? { "data-icon-only": "" } : {}),
            class: messageFooter()[slot]({ className: props.class }),
          },
          slots.default?.(),
        );
    },
  });
}

export const MessageItemBadgeSeparator = footerPart(
  "RaftMessageItemBadgeSeparator",
  "span",
  "message-item-badge-separator",
  "badgeSeparator",
  { "aria-hidden": "true" },
);
export const MessageItemSavedIndicator = defineComponent({
  name: "RaftMessageItemSavedIndicator",
  inheritAttrs: false,
  props: {
    class: { type: String, default: undefined },
    iconOnly: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "message-item-saved-indicator",
          class: messageFooter({ iconOnly: props.iconOnly }).savedIndicator({
            className: props.class,
          }),
        },
        slots.default?.(),
      );
  },
});
export const MessageItemReadReceipt = footerPart(
  "RaftMessageItemReadReceipt",
  "span",
  "message-item-read-receipt",
  "readReceipt",
);

export const MessageItemBadge = defineComponent({
  name: "RaftMessageItemBadge",
  inheritAttrs: false,
  props: {
    class: { type: String, default: undefined },
    status: { type: String as PropType<"read" | "unread">, default: "read" },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const classes = computed(() =>
      badgeVariants({ appearance: "soft", variant: "muted" }).root({
        className: messageFooter({ badgeStatus: props.status }).badge({
          className: props.class,
        }),
      }),
    );
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "message-item-badge",
          "data-appearance": "soft",
          "data-variant": "muted",
          class: classes.value,
        },
        slots.default?.(),
      );
  },
});
