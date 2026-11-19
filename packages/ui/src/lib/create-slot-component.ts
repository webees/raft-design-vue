import { defineComponent, h, mergeProps, type Component, type PropType } from "vue";

import { cn } from "./cn";

export interface SlotComponentOptions {
  name: string;
  tag: string;
  dataSlot: string;
  classes: (className?: string) => string;
  /** Set to `false` to keep the component tag fixed (no `as` prop). */
  as?: boolean;
  /**
   * Presence flags the upstream part turns into data attributes, e.g.
   * `{ muted: "data-muted" }` (empty value) or
   * `{ selected: ["data-selected", "true"] }`. A falsy prop omits it.
   */
  flags?: Record<string, string | readonly [attribute: string, value: string]>;
  /** Attributes the upstream part always sets, e.g. `{ type: "button" }`. */
  staticAttrs?: Record<string, string>;
  /** Default `type` for button parts; a caller's own `type` still wins. */
  defaultType?: "button" | "submit" | "reset";
  /** Static attributes evaluated once during setup, e.g. fit registration. */
  rootProps?: () => Record<string, unknown>;
}

/**
 * Creates a presentational slot element that mirrors the upstream `useRender`
 * contract with a Vue-native `as` prop.
 */
export function createSlotComponent(options: SlotComponentOptions) {
  return defineComponent({
    name: options.name,
    inheritAttrs: false,
    props: {
      ...(options.as === false
        ? {}
        : {
            as: {
              type: [String, Object, Function] as PropType<string | Component>,
              default: undefined,
            },
          }),
      class: {
        type: String,
        default: undefined,
      },
      ...(options.defaultType ? { type: { type: String, default: options.defaultType } } : {}),
      ...Object.fromEntries(
        Object.keys(options.flags ?? {}).map((flag) => [flag, { type: Boolean, default: false }]),
      ),
    },
    setup(props, { attrs, slots }) {
      const extra = options.rootProps?.() ?? {};
      const flagAttrs = () =>
        Object.fromEntries(
          Object.entries(options.flags ?? {})
            .filter(([flag]) => Boolean((props as Record<string, unknown>)[flag]))
            .map(([, spec]) => (typeof spec === "string" ? [spec, ""] : [spec[0], spec[1]])),
        );
      const staticAttrs = () =>
        Object.fromEntries(
          Object.entries(options.staticAttrs ?? {}).filter(
            ([attribute]) => !(attribute === "type" && props.as),
          ),
        );
      return () => {
        const { class: attrClass, ...rest } = attrs;
        return h(
          (props.as ?? options.tag) as string,
          mergeProps(extra, rest, {
            "data-slot": (attrs["data-slot"] as string | undefined) ?? options.dataSlot,
            ...staticAttrs(),
            ...(options.defaultType && !props.as ? { type: props.type } : {}),
            ...flagAttrs(),
            class: options.classes(cn(attrClass as string | undefined, props.class)),
          }),
          slots.default ? slots.default() : undefined,
        );
      };
    },
  });
}
