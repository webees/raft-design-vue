<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageRepliesItemTime", inheritAttrs: false });

const attrs = useAttrs();
const timeClass = computed(() => messageReplies().time({ className: attrs.class as string }));
</script>

<template>
  <time v-bind="{ ...attrs, class: undefined }" :class="timeClass" data-slot="message-replies-item-time">
    <slot />
  </time>
</template>
