import { computed, onBeforeUnmount, watch, watchEffect } from "vue";

import { BUTTON_SPLIT_STICKERS, useButtonSplit } from "./button-split-context";
import type { ButtonSplitSize, ButtonSplitVariant } from "./button-split.recipe";

interface ButtonSplitPartProps {
  variant: ButtonSplitVariant;
  size: ButtonSplitSize;
  disabled: boolean;
  loading: boolean;
}

/** Disabled state and sticker registration shared by both halves of a split button. */
export function useButtonSplitPart(props: ButtonSplitPartProps, trackSize = false) {
  const group = useButtonSplit();
  const isDisabled = computed(() => props.disabled || group.disabled.value);
  const isSticker = computed(
    () => BUTTON_SPLIT_STICKERS.has(props.variant) && !isDisabled.value && !props.loading,
  );

  if (trackSize) watch(() => props.size, group.setSize, { immediate: true });

  let release: (() => void) | undefined;
  watchEffect(() => {
    release?.();
    release = isSticker.value ? group.registerStickerPart() : undefined;
  });
  onBeforeUnmount(() => release?.());

  return { isDisabled, isSticker };
}
