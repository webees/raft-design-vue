<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileMeta" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "span",
  asChild: false,
});
</script>

<template>
  <FileSlot part="meta" data-slot="file-meta" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
