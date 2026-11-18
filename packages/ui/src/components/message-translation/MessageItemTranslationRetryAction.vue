<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationRetryAction", inheritAttrs: false });

const attrs = useAttrs();
const retryClass = computed(() =>
  messageTranslation().translationRetryAction({ className: attrs.class as string }),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :class="retryClass"
    data-slot="message-item-translation-retry-action"
  >
    <slot />
  </button>
</template>
