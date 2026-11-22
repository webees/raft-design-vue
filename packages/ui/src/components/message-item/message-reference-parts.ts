import { defineComponent, h, useAttrs, type ComponentObjectPropsOptions, type PropType } from "vue";
import { Check } from "lucide-vue-next";
import { Primitive } from "reka-ui";

import { primitivePartProps } from "../../lib/part-props";
import {
  messageReference,
  type MessageReferenceChipVariant,
  type MessageReferenceTextVariant,
} from "./message-extras.recipe";

type ReferenceVariant =
  | MessageReferenceChipVariant
  | MessageReferenceTextVariant
  | "pending"
  | "unavailable";

interface ReferencePartOptions {
  name: string;
  dataSlot?: string;
  slot?: "chipLabel" | "suffix" | "icon" | "indicator" | "readMark";
  variant?: ReferenceVariant;
  capped?: boolean;
  readMark?: boolean;
}

interface ReferencePartProps {
  as: string;
  asChild: boolean;
  class?: string;
  variant?: ReferenceVariant;
  capped?: boolean;
}

/** Every chip part is a `Primitive` wrapped around one recipe slot. */
function referencePart({
  name,
  dataSlot = "message-reference",
  slot,
  variant,
  capped = false,
  readMark = false,
}: ReferencePartOptions) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      ...primitivePartProps(),
      ...(variant
        ? {
            variant: {
              type: String as PropType<ReferenceVariant>,
              default: variant,
            },
          }
        : {}),
      ...(capped ? { capped: { type: Boolean, default: false } } : {}),
    } as ComponentObjectPropsOptions,
    setup(props: ReferencePartProps, { slots }) {
      const attrs = useAttrs();
      return () => {
        const className = props.class;
        const classes = slot
          ? messageReference()[slot]({ className })
          : messageReference({ variant: props.variant, capped: props.capped }).root({
              className,
            });
        const label = slots.default?.();
        return h(
          Primitive,
          {
            ...attrs,
            as: props.as,
            asChild: props.asChild,
            "data-slot": dataSlot,
            class: classes,
          },
          readMark
            ? [
                h(Check, { "aria-hidden": "true", "stroke-width": 2.5 }),
                label ? h("span", { class: "sr-only" }, label) : null,
              ]
            : label,
        );
      };
    },
  });
}

export const MessageReferenceLabel = referencePart({
  name: "RaftMessageReferenceLabel",
  dataSlot: "message-reference-label",
  slot: "chipLabel",
});

export const MessageReferenceSuffix = referencePart({
  name: "RaftMessageReferenceSuffix",
  dataSlot: "message-reference-suffix",
  slot: "suffix",
});

export const MessageReferenceIcon = referencePart({
  name: "RaftMessageReferenceIcon",
  dataSlot: "message-reference-icon",
  slot: "icon",
});

export const MessageReferenceIndicator = referencePart({
  name: "RaftMessageReferenceIndicator",
  dataSlot: "message-reference-indicator",
  slot: "indicator",
});

export const MessageReferenceReadMark = referencePart({
  name: "RaftMessageReferenceReadMark",
  dataSlot: "message-reference-read-mark",
  slot: "readMark",
  readMark: true,
});

export const MessageReferenceChip = referencePart({
  name: "RaftMessageReferenceChip",
  variant: "muted",
  capped: true,
});

export const MessageReferenceText = referencePart({
  name: "RaftMessageReferenceText",
  variant: "secondary",
});

export const MessageReferencePending = referencePart({
  name: "RaftMessageReferencePending",
  variant: "pending",
  capped: true,
});

export const MessageReferenceUnavailable = referencePart({
  name: "RaftMessageReferenceUnavailable",
  variant: "unavailable",
});
