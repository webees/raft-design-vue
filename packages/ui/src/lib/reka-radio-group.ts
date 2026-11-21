import type { AcceptableValue } from "reka-ui";
import { defineComponent, h, mergeProps, type Component, type PropType } from "vue";

import { omitAttrs } from "./attrs";

/**
 * Reka radio groups only speak `update:modelValue`; upstream consumers also use
 * the kebab-case alias, so every wrapper emits both.
 */
export function createRekaRadioGroup(options: {
  name: string;
  component: Component;
  dataSlot: string;
  classes: (className?: string) => string;
}) {
  return defineComponent({
    name: options.name,
    inheritAttrs: false,
    props: {
      modelValue: { type: String as PropType<string | undefined>, default: undefined },
    },
    emits: {
      "update:modelValue": (_value: string) => true,
      "update:model-value": (_value: string) => true,
    },
    setup(props, { attrs, emit, slots }) {
      const onUpdate = (value: AcceptableValue) => {
        if (typeof value !== "string") return;
        emit("update:modelValue", value);
        emit("update:model-value", value);
      };
      return () =>
        h(
          options.component,
          mergeProps(omitAttrs(attrs, "class"), {
            "model-value": props.modelValue,
            "data-slot": options.dataSlot,
            class: options.classes(attrs.class as string | undefined),
            "onUpdate:modelValue": onUpdate,
          }),
          slots.default?.(),
        );
    },
  });
}
