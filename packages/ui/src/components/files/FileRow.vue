<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileRow" });
defineProps(asChildProps());
</script>

<template>
  <FileSlot part="row" data-slot="file-row" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
