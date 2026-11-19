import { Toggle } from "reka-ui";
import { defineComponent, h } from "vue";

import { TOGGLE_PROPS, usePanelToggle } from "./use-collapsible";

type ToggleRecipe = (options?: { className?: string }) => string;

/** The two panel toggles share every behavior; only their recipe and markers differ. */
export function createPanelToggleAction(
  name: string,
  dataSlot: string,
  recipe: ToggleRecipe,
  rootAttrs: Record<string, string> = {},
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: TOGGLE_PROPS,
    emits: { "update:pressed": (_pressed: boolean) => true },
    setup(props, { attrs, emit, slots }) {
      const { class: className, ...rest } = attrs;
      const { current, rootClass } = usePanelToggle(
        props,
        (pressed) => emit("update:pressed", pressed),
        recipe,
        className as string | undefined,
      );
      return () =>
        h(
          Toggle,
          {
            ...rest,
            ...rootAttrs,
            as: props.as,
            asChild: props.asChild,
            modelValue: current.value,
            "onUpdate:modelValue": (pressed: boolean) => (current.value = pressed),
            disabled: props.disabled,
            type: "button",
            "data-slot": dataSlot,
            "data-icon-inset": "",
            "data-pressed": current.value ? "" : undefined,
            class: rootClass.value,
          },
          { default: () => slots.default?.() },
        );
    },
  });
}
