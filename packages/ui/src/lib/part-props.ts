import type { PropType } from "vue";

/** Universal root contract shared by every slot part. */
export const asChildProps = (as = "div") =>
  ({ as: { type: String, default: as }, asChild: Boolean }) as const;

/** The caller-class prop the part factories merge into their recipe output. */
const classProp = {
  class: { type: String as PropType<string | undefined>, default: undefined },
} as const;

/** `asChildProps` plus the caller class, for parts built with `h`. */
export const primitivePartProps = (as = "span") => ({ ...asChildProps(as), ...classProp }) as const;

/** `asChildProps` plus the disabled flag shared by action buttons. */
export const actionProps = (as = "button") =>
  ({ ...asChildProps(as), disabled: { type: Boolean, default: false } }) as const;

/** Root props of a panel surface. */
export const panelRootProps = (as = "section") =>
  ({
    ...asChildProps(as),
    edge: { type: String as PropType<"attached" | "inset">, default: "inset" },
  }) as const;
