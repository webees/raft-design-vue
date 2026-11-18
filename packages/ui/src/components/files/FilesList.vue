<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFilesList" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
</script>

<template>
  <FileSlot part="list" data-slot="files-list" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
