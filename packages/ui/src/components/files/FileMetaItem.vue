<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileMetaItem" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="metaItem" data-slot="file-meta-item" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
