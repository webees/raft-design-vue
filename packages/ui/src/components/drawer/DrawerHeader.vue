<script setup lang="ts">
import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerHeader", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).header({ class: props.class }),
);
</script>

<template>
  <div v-bind="attrs" data-slot="drawer-header" :class="classes">
    <slot />
  </div>
</template>
