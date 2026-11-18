<script setup lang="ts">
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreviewBadge", inheritAttrs: false });

const props = withDefaults(defineProps<{ placement?: "corner" | "inline" }>(), {
  placement: "corner",
});
const attrs = useAttrs();
const badgeClass = computed(() =>
  filePreview({ placement: props.placement }).badge({ className: attrs.class as string }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" :class="badgeClass" data-slot="file-preview-badge">
    <slot />
  </span>
</template>
