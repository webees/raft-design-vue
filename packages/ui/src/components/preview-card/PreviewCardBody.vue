<script setup lang="ts">
import { messageCard } from "../message-embed/message-embed.variants";

defineOptions({ name: "RaftPreviewCardBody", inheritAttrs: false });

const attrs = useAttrs();
const bodyClass = computed(() => messageCard().body({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="bodyClass" data-slot="preview-card-body">
    <slot />
  </div>
</template>
