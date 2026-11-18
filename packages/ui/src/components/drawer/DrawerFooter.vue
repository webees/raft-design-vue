<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerFooter", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).footer({ class: props.class }),
);
</script>

<template>
  <div v-bind="attrs" data-slot="drawer-footer" :class="classes">
    <slot />
  </div>
</template>
