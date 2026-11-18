<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileActions" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "span",
  asChild: false,
});
</script>

<template>
  <FileSlot
    part="actions"
    data-slot="file-actions"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </FileSlot>
</template>
