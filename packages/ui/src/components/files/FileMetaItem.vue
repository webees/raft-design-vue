<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileMetaItem" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "span",
  asChild: false,
});
</script>

<template>
  <FileSlot
    part="metaItem"
    data-slot="file-meta-item"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </FileSlot>
</template>
