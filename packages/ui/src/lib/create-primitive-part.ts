import { Primitive } from "reka-ui";
import { defineComponent, h } from "vue";

/** Reka primitive shell shared by the static app-rail parts. */
export function createPrimitivePart(
  name: string,
  dataSlot: string,
  classes: (className?: string) => string,
  as = "div",
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      as: { type: String, default: as },
      asChild: { type: Boolean, default: false },
      class: { type: String, default: undefined },
    },
    setup(props, { attrs, slots }) {
      const { class: _class, ...rest } = attrs;
      return () =>
        h(
          Primitive,
          {
            ...rest,
            as: props.as,
            asChild: props.asChild,
            "data-slot": dataSlot,
            class: classes(props.class),
          },
          { default: () => slots.default?.() },
        );
    },
  });
}
