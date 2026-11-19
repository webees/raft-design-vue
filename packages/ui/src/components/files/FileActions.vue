<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileActions" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="actions" data-slot="file-actions" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
