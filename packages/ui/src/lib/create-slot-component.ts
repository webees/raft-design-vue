import { defineComponent, h, mergeProps, type Component, type PropType } from "vue";

import { cn } from "./cn";

export interface SlotComponentOptions {
  name: string;
  tag: string;
  dataSlot: string;
  classes: (className?: string) => string;
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
      as: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: undefined,
      },
      class: {
        type: String,
        default: undefined,
      },
      ...(options.defaultType
        ? { type: { type: String, default: options.defaultType } }
        : {}),
      ...Object.fromEntries(
        Object.keys(options.flags ?? {}).map((flag) => [flag, { type: Boolean, default: false }]),
      ),
    },
    setup(props, { attrs, slots }) {
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
      return () =>
        h(
          (props.as ?? options.tag) as string,
          mergeProps(attrs, {
            "data-slot": (attrs["data-slot"] as string | undefined) ?? options.dataSlot,
            ...staticAttrs(),
            ...(options.defaultType && !props.as ? { type: props.type } : {}),
            ...flagAttrs(),
            class: options.classes(cn(attrs.class as string | undefined, props.class)),
          }),
          slots.default ? slots.default() : undefined,
        );
    },
  });
}
