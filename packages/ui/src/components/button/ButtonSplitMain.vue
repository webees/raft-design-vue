<script setup lang="ts">
import { computed, onBeforeUnmount, useAttrs, watch, watchEffect } from "vue";

import { cn } from "../../lib/cn";
import Button from "./Button.vue";
import {
  buttonSplitMain,
  type ButtonSplitSize,
  type ButtonSplitVariant,
} from "./button-split.recipe";
import { BUTTON_SPLIT_STICKERS, useButtonSplit } from "./button-split-context";
import type { ButtonSize, ButtonVariant } from "./button.variants";

defineOptions({ name: "RaftButtonSplitMain", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ButtonSplitVariant;
    size?: ButtonSplitSize;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  { variant: "default", size: "md", disabled: false, loading: false },
);
const attrs = useAttrs();
const group = useButtonSplit();
const isDisabled = computed(() => props.disabled || group.disabled.value);
const rootClass = computed(() => cn(buttonSplitMain(), attrs.class as string | undefined));

watch(() => props.size, group.setSize, { immediate: true });
let release: (() => void) | undefined;
watchEffect(() => {
  release?.();
  release = undefined;
  if (BUTTON_SPLIT_STICKERS.has(props.variant) && !isDisabled.value && !props.loading) {
    release = group.registerStickerPart();
  }
});
onBeforeUnmount(() => release?.());
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    data-split-part="main"
    :data-split-sticker="BUTTON_SPLIT_STICKERS.has(props.variant) ? '' : undefined"
    :variant="(props.variant as ButtonVariant)"
    :size="(props.size as ButtonSize)"
    :disabled="isDisabled"
    :loading="props.loading"
    :class="rootClass"
  >
    <slot />
  </Button>
</template>
