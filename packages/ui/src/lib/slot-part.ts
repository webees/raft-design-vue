import { createSlotComponent, type SlotComponentOptions } from "./create-slot-component";
import { defineComponent, h, mergeProps, type Component } from "vue";

import { cn } from "./cn";

interface SlotPartOptions {
  name: string;
  tag: string;
  dataSlot: string;
  className: (className: string | undefined) => string;
  type?: "button" | "submit" | "reset";
  /** Attributes the part always renders, e.g. `aria-live` or fit registration. */
  rootProps?: () => Record<string, unknown>;
}

export function createSlotPart({ className, type, ...rest }: SlotPartOptions) {
  return createSlotComponent({
    ...rest,
    as: false,
    classes: className,
    defaultType: type,
  });
}

/** Shorthand for parts whose only variation is one caller-class-aware recipe lookup. */
export const recipePart = (
  name: string,
  tag: string,
  dataSlot: string,
  style: (className?: string) => string,
) => createSlotPart({ name, tag, dataSlot, className: style });

type SlotClass = (options?: { class?: string }) => string;
type RecipeSlots = Record<string, unknown>;

export const kebabCase = (value: string) =>
  value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`).replace(/^-/, "");

const camelCase = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

const recipeParts =
  (recipe: () => RecipeSlots, polymorphic: boolean) =>
  (
    name: string,
    slot = camelCase(name),
    tag = "div",
    options: Partial<SlotComponentOptions> = {},
  ) =>
    createSlotComponent({
      name: `Raft${name}`,
      tag,
      dataSlot: kebabCase(name),
      classes: (className) => (recipe()[slot] as SlotClass)({ class: className }),
      asChild: true,
      ...options,
      ...(polymorphic ? {} : { as: false as const }),
    });

/**
 * Table-friendly `createSlotComponent` bound to one recipe. The component name
 * and `data-slot` are derived from the part name, so each part stays one line.
 */
export const recipePartFactory = (recipe: () => RecipeSlots) => recipeParts(recipe, true);

/** Same table shape as {@link recipePartFactory} but without the `as` prop. */
export const fixedPartFactory = (recipe: () => RecipeSlots) => recipeParts(recipe, false);

/**
 * A Reka primitive wrapped in the same `data-slot` + class-merge contract as a
 * slot part. `titleClass` stays optional because a few parts only forward the
 * caller's class (`SelectArrow`).
 */
export const rekaPart = (
  name: string,
  component: Component,
  dataSlot: string,
  style?: (className?: string) => string,
) =>
  defineComponent({
    name,
    inheritAttrs: false,
    setup:
      (_, { attrs, slots }) =>
      () => {
        const { class: attrClass, ...rest } = attrs;
        return h(
          component,
          mergeProps(rest, {
            "data-slot": (attrs["data-slot"] as string | undefined) ?? dataSlot,
            class: style ? style(cn(attrClass as string | undefined)) : attrClass,
          }),
          slots.default?.(),
        );
      },
  });
