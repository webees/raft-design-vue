<script setup lang="ts">
import { DrawerTitle } from "reka-ui";

import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerTitle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).title({ class: props.class }),
);
</script>

<template>
  <DrawerTitle v-bind="attrs" data-slot="drawer-title" :class="classes">
    <slot />
  </DrawerTitle>
</template>
