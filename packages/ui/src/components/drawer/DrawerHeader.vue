<script setup lang="ts">
import { useDrawerRecipe } from "./drawer-context";

defineOptions({ name: "RaftDrawerHeader", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const variants = useDrawerRecipe();
const classes = computed(() => variants.value.header({ class: props.class }));
</script>

<template>
  <div v-bind="attrs" data-slot="drawer-header" :class="classes">
    <slot />
  </div>
</template>
