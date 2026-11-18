<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageEmbed } from "../message-embed/message-embed.variants";
import { messageReplies } from "./message-replies.variants";

defineOptions({ name: "RaftMessageReplies", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => {
  const { root } = messageReplies();
  const { root: embedRoot } = messageEmbed({ size: "content" });
  return embedRoot({ className: root({ className: attrs.class as string }) });
});
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :class="rootClass"
    data-slot="message-embed"
  >
    <slot />
  </button>
</template>
