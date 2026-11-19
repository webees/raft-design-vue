import { CollapsibleRoot } from "reka-ui";
import { defineComponent, h } from "vue";

import { COLLAPSIBLE_SECTION_PROPS, useCollapsibleSection } from "./use-collapsible";

type SectionRecipe = () => { root: (options?: { className?: string }) => string };

/** Task sections and board columns differ only by their slot name and recipe. */
export function createCollapsibleSection(name: string, dataSlot: string, recipe: SectionRecipe) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: COLLAPSIBLE_SECTION_PROPS,
    emits: { "update:open": (_open: boolean) => true },
    setup(props, { attrs, emit, slots }) {
      const { class: className, ...rest } = attrs;
      const { openState, rootClass } = useCollapsibleSection(
        props,
        (open) => emit("update:open", open),
        recipe,
        className as string | undefined,
      );
      return () =>
        h(
          CollapsibleRoot,
          {
            ...rest,
            as: "section",
            open: openState.value,
            "onUpdate:open": (open: boolean) => (openState.value = open),
            "data-slot": dataSlot,
            "data-panel-open": openState.value ? "" : undefined,
            disabled: props.disabled,
            class: rootClass.value,
          },
          { default: () => slots.default?.() },
        );
    },
  });
}
