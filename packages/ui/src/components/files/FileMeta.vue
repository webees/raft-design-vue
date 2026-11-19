<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileMeta" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="meta" data-slot="file-meta" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
