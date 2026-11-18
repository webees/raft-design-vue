<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageTranslation } from "./message-translation.variants";

defineOptions({ name: "RaftMessageItemTranslationAction", inheritAttrs: false });

const attrs = useAttrs();
const actionClass = computed(() =>
  messageTranslation().translationAction({ className: attrs.class as string }),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :class="actionClass"
    data-slot="message-item-translation-action"
  >
    <slot />
  </button>
</template>
