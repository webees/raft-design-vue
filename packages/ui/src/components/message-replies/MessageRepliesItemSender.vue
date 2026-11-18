<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesItemSender", inheritAttrs: false });

const attrs = useAttrs();
const senderClass = computed(() => messageReplies().sender({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="senderClass"
    data-slot="message-replies-item-sender"
  >
    <slot />
  </span>
</template>
