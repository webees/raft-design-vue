<script setup lang="ts">
import { computed, provide, ref, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { buttonSplit, type ButtonSplitSize } from "./button-split.recipe";
import { buttonSplitKey, type ButtonSplitContextValue } from "./button-split-context";

defineOptions({ name: "RaftButtonSplit", inheritAttrs: false });

const props = withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });
const attrs = useAttrs();
const stickerParts = ref(0);
const size = ref<ButtonSplitSize>("md");

const context: ButtonSplitContextValue = {
  disabled: computed(() => props.disabled),
  registerStickerPart: () => {
    stickerParts.value += 1;
    return () => (stickerParts.value = Math.max(0, stickerParts.value - 1));
  },
  setSize: (next) => (size.value = next),
};
provide(buttonSplitKey, context);

const rootClass = computed(() => cn(buttonSplit(), attrs.class as string | undefined));
</script>

<template>
  <div
    role="group"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="button-split"
    :data-sticker-edge="stickerParts > 0 ? '' : undefined"
    :data-size="size"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
