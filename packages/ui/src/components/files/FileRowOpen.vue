<script setup lang="ts">
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileRowOpen" });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "button",
  asChild: false,
});
</script>

<template>
  <FileSlot part="rowOpen" data-slot="file-row-open" :as="as" :as-child="asChild" type="button">
    <slot />
  </FileSlot>
</template>
