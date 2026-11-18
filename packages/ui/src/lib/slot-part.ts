import { computed, defineComponent, h, useAttrs, type PropType } from "vue";

type SlotPartOptions = {
  name: string;
  tag: string;
  dataSlot: string;
  className: (className: string | undefined) => string;
  type?: "button" | "submit" | "reset";
  /** Attributes the part always renders, e.g. `aria-live` or fit registration. */
  rootProps?: () => Record<string, unknown>;
};

export function createSlotPart({
  name,
  tag,
  dataSlot,
  className,
  type,
  rootProps,
}: SlotPartOptions) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      class: { type: String as PropType<string>, default: undefined },
    },
    setup(props, { slots }) {
      const attrs = useAttrs();
      const extra = rootProps?.() ?? {};
      const rootClass = computed(() =>
        className([props.class, attrs.class as string].filter(Boolean).join(" ") || undefined),
      );
      return () => {
        const { class: _class, ...rest } = attrs;
        return h(
          tag,
          {
            ...extra,
            ...(type ? { type } : {}),
            ...rest,
            "data-slot": (attrs["data-slot"] as string | undefined) ?? dataSlot,
            class: rootClass.value,
          },
          slots.default?.(),
        );
      };
    },
  });
}
