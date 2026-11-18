<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { MessageEmbedHeader } from "../message-embed";
import { messageQuotedPreview } from "./message-quoted-preview.variants";

defineOptions({ name: "RaftMessageQuotedPreviewHeader", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageQuotedPreview().header({ className: attrs.class as string | undefined }),
);
</script>

<template>
  <MessageEmbedHeader v-bind="{ ...attrs, class: undefined }" :class="rootClass">
    <slot />
  </MessageEmbedHeader>
</template>
