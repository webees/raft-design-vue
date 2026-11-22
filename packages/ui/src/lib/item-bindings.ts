import { computed, useAttrs } from "vue";

import type { ItemProps } from "./item-props";
import { useTapActivation } from "./tap-activation";

/** Shared root bindings for Reka-backed selectable items (tabs, toggles...). */
export const useItemBindings = (
  props: ItemProps,
  classes: (attrClass: string | undefined) => string,
) => {
  const attrs = useAttrs();
  return {
    tapRef: useTapActivation(),
    rootAttrs: computed(() => ({
      ...attrs,
      value: props.value,
      disabled: props.disabled,
      as: props.as,
      asChild: props.asChild,
      class: classes(attrs.class as string | undefined),
    })),
  };
};
