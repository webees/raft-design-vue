<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileRow" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
</script>

<template>
  <FileSlot part="row" data-slot="file-row" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
