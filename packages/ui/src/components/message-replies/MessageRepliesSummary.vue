<script setup lang="ts">
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesSummary", inheritAttrs: false });

const attrs = useAttrs();
const summaryClass = computed(() => messageReplies().summary({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="summaryClass"
    data-slot="message-replies-summary"
  >
    <slot />
  </span>
</template>
