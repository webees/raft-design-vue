<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFilesList" });
defineProps(asChildProps());
</script>

<template>
  <FileSlot part="list" data-slot="files-list" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
