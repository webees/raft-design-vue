<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFilesPanel" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "section",
  asChild: false,
});
</script>

<template>
  <FileSlot part="panel" data-slot="files-panel" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
