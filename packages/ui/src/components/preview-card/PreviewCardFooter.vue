<script setup lang="ts">
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftPreviewCardFooter", inheritAttrs: false });

const attrs = useAttrs();
const footerClass = computed(() =>
  messageCard().sourceFooter({ className: attrs.class as string }),
);
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="footerClass" data-slot="preview-card-footer">
    <slot />
  </p>
</template>
