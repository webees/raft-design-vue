import { Primitive } from "reka-ui";
import { defineComponent, h } from "vue";

import { cn } from "./cn";

/** Reka `as`/`asChild` shell for static recipe parts. */
export function createPrimitivePart(
  name: string,
  dataSlot: string,
  classes: (className?: string) => string,
  as = "div",
  staticAttrs?: Record<string, string>,
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      as: { type: String, default: as },
      asChild: { type: Boolean, default: false },
      class: { type: String, default: undefined },
    },
    setup:
      (props, { attrs, slots }) =>
      () => {
        const { class: attrClass, ...rest } = attrs;
        return h(
          Primitive,
          {
            ...rest,
            as: props.as,
            asChild: props.asChild,
            "data-slot": dataSlot,
            ...staticAttrs,
            class: classes(cn(attrClass as string | undefined, props.class)),
          },
          { default: () => slots.default?.() },
        );
      },
  });
}
