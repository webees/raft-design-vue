import { computed, inject, type InjectionKey, type Ref } from "vue";

import type { ButtonSplitSize, ButtonSplitVariant } from "./button-split.recipe";

export const BUTTON_SPLIT_STICKERS = new Set<ButtonSplitVariant>(["primary", "warning", "danger"]);

export type ButtonSplitContextValue = {
  disabled: Readonly<Ref<boolean>>;
  registerStickerPart: () => () => void;
  setSize: (size: ButtonSplitSize) => void;
};

export const buttonSplitKey: InjectionKey<ButtonSplitContextValue> = Symbol("raft-button-split");

export function useButtonSplit() {
  return inject(buttonSplitKey, {
    disabled: computed(() => false),
    registerStickerPart: () => () => {},
    setSize: () => {},
  } satisfies ButtonSplitContextValue);
}
