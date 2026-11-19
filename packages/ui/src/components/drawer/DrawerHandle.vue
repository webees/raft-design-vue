<script setup lang="ts">
import { DrawerHandle } from "reka-ui";

import { useDrawerRecipe } from "./drawer-context";

defineOptions({ name: "RaftDrawerHandle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const variants = useDrawerRecipe();
const classes = computed(() => variants.value.swipeHandle({ class: props.class }));
</script>

<template>
  <DrawerHandle
    v-bind="{ ...attrs, class: undefined }"
    data-slot="drawer-swipe-handle"
    :class="classes"
  />
</template>
