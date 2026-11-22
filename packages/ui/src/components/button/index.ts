export { default as Button } from "./Button.vue";
export { buttonVariants } from "./button.variants";
export type { ButtonVariant, ButtonSize } from "./button.variants";
export { default as ButtonSplit } from "./ButtonSplit.vue";
export { ButtonSplitMain, ButtonSplitMenu } from "./parts";
export { buttonSplit, buttonSplitMain, buttonSplitMenu } from "./button-split.recipe";
export type { ButtonSplitSize, ButtonSplitVariant } from "./button-split.recipe";
/** Sizes the deprecated `Button` still accepts; kept for upstream parity. */
export type DeprecatedButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";
