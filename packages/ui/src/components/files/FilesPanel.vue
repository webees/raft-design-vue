<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFilesPanel" });
defineProps(asChildProps("section"));
</script>

<template>
  <FileSlot part="panel" data-slot="files-panel" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
