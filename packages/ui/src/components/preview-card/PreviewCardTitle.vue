<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardTitle", inheritAttrs: false });

const attrs = useAttrs();
const titleClass = computed(() => previewCard().title({ className: attrs.class as string }));
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="titleClass" data-slot="preview-card-title">
    <slot />
  </p>
</template>
