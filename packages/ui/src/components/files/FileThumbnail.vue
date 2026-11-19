<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileThumbnail" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="thumbnail" data-slot="file-thumbnail" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
