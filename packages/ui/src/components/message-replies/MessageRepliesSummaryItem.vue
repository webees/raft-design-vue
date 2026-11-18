<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesSummaryItem", inheritAttrs: false });

const attrs = useAttrs();
const summaryItemClass = computed(() =>
  messageReplies().summaryItem({ className: attrs.class as string }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="summaryItemClass"
    data-slot="message-replies-summary-item"
  >
    <slot />
  </span>
</template>
