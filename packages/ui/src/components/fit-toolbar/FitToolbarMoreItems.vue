<script setup lang="ts">
import { computed } from "vue";

import { useFitToolbar } from "./fit-toolbar-context";

defineOptions({ name: "RaftFitToolbarMoreItems" });

const context = useFitToolbar();
const items = computed(() => context.more());
</script>

<template>
  <slot :items="items" />
</template>
