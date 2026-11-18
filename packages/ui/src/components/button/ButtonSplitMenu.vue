<script setup lang="ts">
import { computed, onBeforeUnmount, useAttrs, watchEffect } from "vue";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import Button from "./Button.vue";
import {
  buttonSplitMenu,
  type ButtonSplitSize,
  type ButtonSplitVariant,
} from "./button-split.recipe";
import { BUTTON_SPLIT_STICKERS, useButtonSplit } from "./button-split-context";
import type { ButtonSize, ButtonVariant } from "./button.variants";

defineOptions({ name: "RaftButtonSplitMenu", inheritAttrs: false });

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
const rootClass = computed(() =>
  cn(
    buttonSplitMenu({ variant: props.variant, size: props.size }),
    attrs.class as string | undefined,
  ),
);

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
    data-split-part="menu"
    :data-split-sticker="BUTTON_SPLIT_STICKERS.has(props.variant) ? '' : undefined"
    :variant="props.variant as ButtonVariant"
    :size="props.size as ButtonSize"
    :disabled="isDisabled"
    :loading="props.loading"
    :class="rootClass"
  >
    <slot><ChevronDown aria-hidden /></slot>
  </Button>
</template>
