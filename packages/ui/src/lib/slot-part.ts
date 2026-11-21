import { createSlotComponent } from "./create-slot-component";
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
