<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import FileSlot from "./FileSlot.vue";

defineOptions({ name: "RaftFileRowOpen" });
defineProps(asChildProps("button"));
</script>

<template>
  <FileSlot part="rowOpen" data-slot="file-row-open" :as="as" :as-child="asChild" type="button">
    <slot />
  </FileSlot>
</template>
