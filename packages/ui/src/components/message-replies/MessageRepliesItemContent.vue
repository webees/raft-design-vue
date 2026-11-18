<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesItemContent", inheritAttrs: false });

const attrs = useAttrs();
const contentClass = computed(() => messageReplies().content({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="contentClass"
    data-slot="message-replies-item-content"
  >
    <slot />
  </span>
</template>
