<script setup lang="ts">
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() =>
  previewCard().description({ className: attrs.class as string }),
);
</script>

<template>
  <p
    v-bind="{ ...attrs, class: undefined }"
    :class="descriptionClass"
    data-slot="preview-card-description"
  >
    <slot />
  </p>
</template>
