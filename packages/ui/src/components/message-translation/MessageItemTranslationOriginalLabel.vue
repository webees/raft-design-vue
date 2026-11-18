<script setup lang="ts">
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationOriginalLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() =>
  messageTranslation().translationOriginalLabel({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="labelClass"
    data-slot="message-item-translation-original-label"
  >
    <slot />
  </div>
</template>
