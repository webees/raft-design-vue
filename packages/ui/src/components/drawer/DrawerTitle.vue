<script setup lang="ts">
import { DrawerTitle } from "reka-ui";

import { useDrawerRecipe } from "./drawer-context";

defineOptions({ name: "RaftDrawerTitle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const variants = useDrawerRecipe();
const classes = computed(() => variants.value.title({ class: props.class }));
</script>

<template>
  <DrawerTitle v-bind="attrs" data-slot="drawer-title" :class="classes">
    <slot />
  </DrawerTitle>
</template>
