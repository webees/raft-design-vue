<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { previewCard } from "./preview-card.variants";

defineOptions({ name: "RaftPreviewCardPopup", inheritAttrs: false });

const props = withDefaults(defineProps<{ size?: "profile" | "item" }>(), { size: "profile" });
const attrs = useAttrs();
const popupClass = computed(() =>
  previewCard({ size: props.size }).popup({ className: attrs.class as string }),
);
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="popupClass" data-slot="preview-card-content">
    <slot />
  </div>
</template>
