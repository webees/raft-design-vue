<script setup lang="ts">
import { DrawerHandle } from "reka-ui";

import { drawer } from "./drawer.recipe";
import { useDrawerConfig } from "./drawer-context";

defineOptions({ name: "RaftDrawerHandle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const config = useDrawerConfig();
const classes = computed(() =>
  drawer({
    axis: config.swipeAxis,
    side: config.swipeDirection,
    snapPoints: config.hasSnapPoints,
    nested: config.nested,
  }).swipeHandle({ class: props.class }),
);
</script>

<template>
  <DrawerHandle
    v-bind="{ ...attrs, class: undefined }"
    data-slot="drawer-swipe-handle"
    :class="classes"
  />
</template>
