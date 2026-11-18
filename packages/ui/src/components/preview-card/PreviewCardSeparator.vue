<script setup lang="ts">
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardSeparator", inheritAttrs: false });

const attrs = useAttrs();
const separatorClass = computed(() =>
  previewCard().separator({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    role="separator"
    aria-orientation="horizontal"
    :class="separatorClass"
    data-slot="preview-card-separator"
  />
</template>
