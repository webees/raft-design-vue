<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { MessageEmbed } from "../message-embed";
import { messageQuotedPreview } from "./message-quoted-preview.variants";

defineOptions({ name: "RaftMessageQuotedPreviewLoading", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  messageQuotedPreview().loading({ className: attrs.class as string | undefined }),
);
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <MessageEmbed v-bind="rootAttrs" data-frame="bar" :class="rootClass">
    <slot />
  </MessageEmbed>
</template>
