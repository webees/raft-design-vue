<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DrawerDescription } from "reka-ui";

import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerDescription", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).description({ class: props.class }),
);
</script>

<template>
  <DrawerDescription v-bind="attrs" data-slot="drawer-description" :class="classes">
    <slot />
  </DrawerDescription>
</template>
