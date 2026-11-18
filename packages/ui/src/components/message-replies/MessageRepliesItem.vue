<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesItem", inheritAttrs: false });

const attrs = useAttrs();
const replyClass = computed(() => messageReplies().reply({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="replyClass"
    data-slot="message-replies-item"
  >
    <slot />
  </span>
</template>
