<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationFailedStatus", inheritAttrs: false });

const attrs = useAttrs();
const failedClass = computed(() =>
  messageTranslation().translationFailedStatus({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="failedClass"
    data-slot="message-item-translation-status"
  >
    <slot />
  </div>
</template>
