<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileContent" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "span",
  asChild: false,
});
</script>

<template>
  <FileSlot
    part="content"
    data-slot="file-content"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </FileSlot>
</template>
