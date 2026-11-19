<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileName" });
defineProps(asChildProps("span"));
</script>

<template>
  <FileSlot part="name" data-slot="file-name" :as="as" :as-child="asChild">
    <slot />
  </FileSlot>
</template>
