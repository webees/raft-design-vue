<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import Button from "./Button.vue";
import { buttonSplitMenu } from "./button-split.recipe";
import { BUTTON_SPLIT_PART_PROPS, useButtonSplitPart } from "./use-button-split-part";
import type { ButtonSize, ButtonVariant } from "./button.variants";

defineOptions({ name: "RaftButtonSplitMenu", inheritAttrs: false });

const props = defineProps(BUTTON_SPLIT_PART_PROPS);
const attrs = useAttrs();
const { isDisabled, isSticker } = useButtonSplitPart(props);
const rootClass = computed(() =>
  cn(
    buttonSplitMenu({ variant: props.variant, size: props.size }),
    attrs.class as string | undefined,
  ),
);
</script>

<template>
  <Button
    v-bind="{ ...attrs, class: undefined }"
    data-split-part="menu"
    :data-split-sticker="isSticker ? '' : undefined"
    :variant="props.variant as ButtonVariant"
    :size="props.size as ButtonSize"
    :disabled="isDisabled"
    :loading="props.loading"
    :class="rootClass"
  >
    <slot><ChevronDown aria-hidden /></slot>
  </Button>
</template>
