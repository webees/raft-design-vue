<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerActions", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).actions({ class: props.class }),
);
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="drawer-actions"
    :data-stacked="config.swipeAxis === 'x' ? undefined : ''"
    :class="classes"
  >
    <slot />
  </div>
</template>
