<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileContent" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="content" data-slot="file-content" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
