import { computed, defineComponent, h, useAttrs, type PropType } from "vue";
import { Check } from "lucide-vue-next";
import { Primitive } from "reka-ui";

import {
  messageReference,
  type MessageReferenceTextVariant,
} from "./message-extras.recipe";

export type MessageReferenceChipVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "info"
  | "link"
  | "pending"
  | "unavailable";

function referencePart(
  name: string,
  tag: string,
  dataSlot: string,
  slot: "chipLabel" | "suffix" | "icon" | "indicator" | "readMark",
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      as: { type: String, default: tag },
      asChild: { type: Boolean, default: false },
      class: { type: String, default: undefined },
    },
    setup(props, { slots }) {
      const attrs = useAttrs();
      return () =>
        h(
          Primitive,
          {
            ...attrs,
            as: props.as,
            asChild: props.asChild,
            "data-slot": dataSlot,
            class: messageReference()[slot]({ className: props.class }),
          },
          slots.default?.(),
        );
    },
  });
}

export const MessageReferenceLabel = referencePart(
  "RaftMessageReferenceLabel",
  "span",
  "message-reference-label",
  "chipLabel",
);
export const MessageReferenceSuffix = referencePart(
  "RaftMessageReferenceSuffix",
  "span",
  "message-reference-suffix",
  "suffix",
);
export const MessageReferenceIcon = referencePart(
  "RaftMessageReferenceIcon",
  "span",
  "message-reference-icon",
  "icon",
);
export const MessageReferenceIndicator = referencePart(
  "RaftMessageReferenceIndicator",
  "span",
  "message-reference-indicator",
  "indicator",
);
export const MessageReferenceReadMark = defineComponent({
  name: "RaftMessageReferenceReadMark",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "span" },
    asChild: { type: Boolean, default: false },
    class: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    return () => {
      const label = slots.default?.();
      return h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-reference-read-mark",
          class: messageReference().readMark({ className: props.class }),
        },
        [
          h(Check, { "aria-hidden": "true", "stroke-width": 2.5 }),
          label ? h("span", { class: "sr-only" }, label) : null,
        ],
      );
    };
  },
});

export const MessageReference = defineComponent({
  name: "RaftMessageReference",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "span" },
    asChild: { type: Boolean, default: false },
    class: { type: String, default: undefined },
    variant: {
      type: String as PropType<MessageReferenceChipVariant>,
      default: "muted",
    },
    capped: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const classes = computed(() =>
      messageReference({
        variant: props.variant,
        capped: props.capped,
      }).root({ className: props.class }),
    );
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-reference",
          class: classes.value,
        },
        slots.default?.(),
      );
  },
});

export const MessageReferenceChip = MessageReference;

export const MessageReferenceText = defineComponent({
  name: "RaftMessageReferenceText",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "span" },
    asChild: { type: Boolean, default: false },
    class: { type: String, default: undefined },
    variant: {
      type: String as PropType<MessageReferenceTextVariant>,
      default: "secondary",
    },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const classes = computed(() =>
      messageReference({ variant: props.variant }).root({
        className: props.class,
      }),
    );
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-reference",
          class: classes.value,
        },
        slots.default?.(),
      );
  },
});

export const MessageReferencePending = defineComponent({
  name: "RaftMessageReferencePending",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "span" },
    asChild: { type: Boolean, default: false },
    capped: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-reference",
          class: messageReference({ variant: "pending", capped: props.capped }).root({
            className: attrs.class as string | undefined,
          }),
        },
        slots.default?.(),
      );
  },
});

export const MessageReferenceUnavailable = defineComponent({
  name: "RaftMessageReferenceUnavailable",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "span" },
    asChild: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    return () =>
      h(
        Primitive,
        {
          ...attrs,
          as: props.as,
          asChild: props.asChild,
          "data-slot": "message-reference",
          class: messageReference({ variant: "unavailable" }).root({
            className: attrs.class as string | undefined,
          }),
        },
        slots.default?.(),
      );
  },
});
