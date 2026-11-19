<script setup lang="ts">
import { cn } from "../../lib/cn";
import Button from "./Button.vue";
import {
  buttonSplitMain,
  type ButtonSplitSize,
  type ButtonSplitVariant,
} from "./button-split.recipe";
import { useButtonSplitPart } from "./use-button-split-part";
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
const { isDisabled, isSticker } = useButtonSplitPart(props, true);
const rootClass = computed(() => cn(buttonSplitMain(), attrs.class as string | undefined));
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    data-split-part="main"
    :data-split-sticker="isSticker ? '' : undefined"
    :variant="props.variant as ButtonVariant"
    :size="props.size as ButtonSize"
    :disabled="isDisabled"
    :loading="props.loading"
    :class="rootClass"
  >
    <slot />
  </Button>
</template>
