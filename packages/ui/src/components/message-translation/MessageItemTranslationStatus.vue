<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationStatus", inheritAttrs: false });

const attrs = useAttrs();
const statusClass = computed(() =>
  messageTranslation().translationStatus({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="statusClass"
    data-slot="message-item-translation-status"
  >
    <slot />
  </div>
</template>
