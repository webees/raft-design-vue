<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { MessageEmbedContent } from "../message-embed";
import { messageQuotedPreview } from "./message-quoted-preview.variants";

defineOptions({ name: "RaftMessageQuotedPreviewContent", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageQuotedPreview().content({ className: attrs.class as string | undefined }),
);
</script>

<template>
  <MessageEmbedContent v-bind="{ ...attrs, class: undefined }" :class="rootClass">
    <slot />
  </MessageEmbedContent>
</template>
