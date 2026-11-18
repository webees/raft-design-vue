<script setup lang="ts">
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftPreviewCardEyebrow", inheritAttrs: false });

const attrs = useAttrs();
const eyebrowClass = computed(() => messageCard().eyebrow({ className: attrs.class as string }));
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="eyebrowClass" data-slot="preview-card-eyebrow">
    <slot />
  </p>
</template>
