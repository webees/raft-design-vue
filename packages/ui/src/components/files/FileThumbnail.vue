<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileThumbnail" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "span",
  asChild: false,
});
</script>

<template>
  <FileSlot
    part="thumbnail"
    data-slot="file-thumbnail"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </FileSlot>
</template>
