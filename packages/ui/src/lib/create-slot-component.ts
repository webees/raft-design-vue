import {
  defineComponent,
  h,
  mergeProps,
  type Component,
  type ComponentObjectPropsOptions,
  type ClassValue,
  type DefineComponent,
  type PropType,
  type VNodeChild,
} from "vue";

import { Primitive } from "reka-ui";
import { cn } from "./cn";

export interface SlotComponentOptions<
  Context = undefined,
  Extra extends Record<string, unknown> = Record<never, never>,
> {
  name: string;
  tag: string | ((props: SlotPartProps & Extra) => string);
  dataSlot: string;
  props?: ComponentObjectPropsOptions<Extra>;
  classes: (
    className: string | undefined,
    context: Context,
    props: SlotPartProps & Extra,
  ) => string;
  /** Value resolved once during setup and passed to `classes`. */
  context?: () => Context;
  /** Set to `false` to keep the component tag fixed (no `as` prop). */
  as?: boolean;
  /** Accept `asChild` and render through Reka's `Primitive` when set. */
  asChild?: boolean;
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
  rootProps?: (
    props: SlotPartProps & Extra,
    attrs: Record<string, unknown>,
  ) => Record<string, unknown>;
  /** Wrap slotted content in an inner element, e.g. a button content span. */
  content?: {
    dataSlot: string;
    classes: (props: SlotPartProps & Extra) => ClassValue;
    fallback?: () => VNodeChild;
  };
}

export interface SlotPartProps {
  as?: string | Component;
  asChild?: boolean;
  class?: ClassValue;
  type?: string;
}

/**
 * Creates a presentational slot element that mirrors the upstream `useRender`
 * contract with a Vue-native `as` prop.
 */
export function createSlotComponent<
  Context = undefined,
  Extra extends Record<string, unknown> = Record<never, never>,
>(options: SlotComponentOptions<Context, Extra>): DefineComponent<SlotPartProps & Extra> {
  const definition = {
    ...(options.as === false
      ? {}
      : {
          as: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: undefined,
          },
        }),
    ...(options.asChild ? { asChild: { type: Boolean, default: false } } : {}),
    class: {
      type: String,
      default: undefined,
    },
    ...(options.defaultType ? { type: { type: String, default: options.defaultType } } : {}),
    ...Object.fromEntries(
      Object.keys(options.flags ?? {}).map((flag) => [flag, { type: Boolean, default: false }]),
    ),
    ...options.props,
  } as ComponentObjectPropsOptions<SlotPartProps & Extra>;

  return defineComponent<SlotPartProps & Extra>({
    name: options.name,
    inheritAttrs: false,
    props: definition,
    setup(props, { attrs, slots }) {
      const context = options.context?.() as Context;
      const flagAttrs = () =>
        Object.fromEntries(
          Object.entries(options.flags ?? {})
            .filter(([flag]) => Boolean((props as Record<string, unknown>)[flag]))
            .map(([, spec]) => (typeof spec === "string" ? [spec, ""] : [spec[0], spec[1]])),
        );
      const staticAttrs = () =>
        Object.fromEntries(
          Object.entries(options.staticAttrs ?? {}).filter(
            ([attribute]) => !(attribute === "type" && (props as unknown as SlotPartProps).as),
          ),
        );
      return () => {
        const { class: attrClass, ...rest } = attrs;
        const typed = props as unknown as SlotPartProps & Extra;
        const asChild = options.asChild && typed.asChild;
        const tag = typeof options.tag === "function" ? options.tag(typed) : options.tag;
        const defaultChildren = slots.default?.();
        const children = defaultChildren ?? options.content?.fallback?.();
        return h(
          (asChild ? Primitive : (typed.as ?? tag)) as Component,
          mergeProps(options.rootProps?.(typed, attrs) ?? {}, rest, {
            ...(asChild ? { as: typed.as ?? tag, asChild: true } : {}),
            "data-slot": (attrs["data-slot"] as string | undefined) ?? options.dataSlot,
            ...staticAttrs(),
            ...(options.defaultType && !typed.as && !asChild ? { type: typed.type } : {}),
            ...flagAttrs(),
            class: options.classes(
              cn(attrClass as string | undefined, typed.class),
              context,
              typed,
            ),
          }),
          options.content
            ? h(
                "span",
                { "data-slot": options.content.dataSlot, class: options.content.classes(typed) },
                [children],
              )
            : defaultChildren,
        );
      };
    },
  }) as unknown as DefineComponent<SlotPartProps & Extra>;
}
