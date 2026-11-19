<script setup lang="ts">
import { DrawerDescription } from "reka-ui";

import { useDrawerRecipe } from "./drawer-context";

defineOptions({ name: "RaftDrawerDescription", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const variants = useDrawerRecipe();
const classes = computed(() => variants.value.description({ class: props.class }));
</script>

<template>
  <DrawerDescription v-bind="attrs" data-slot="drawer-description" :class="classes">
    <slot />
  </DrawerDescription>
</template>
