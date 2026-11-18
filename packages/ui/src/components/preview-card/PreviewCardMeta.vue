<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftPreviewCardMeta", inheritAttrs: false });

const attrs = useAttrs();
const metaClass = computed(() => messageCard().meta({ className: attrs.class as string }));
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="metaClass" data-slot="preview-card-meta">
    <slot />
  </p>
</template>
