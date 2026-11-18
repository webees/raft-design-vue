<script setup lang="ts">
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardHeader", inheritAttrs: false });

const attrs = useAttrs();
const headerClass = computed(() => previewCard().header({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="headerClass" data-slot="preview-card-header">
    <slot />
  </div>
</template>
