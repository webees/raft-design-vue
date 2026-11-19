<script setup lang="ts">
import { useDrawerRecipe } from "./drawer-context";

defineOptions({ name: "RaftDrawerFooter", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const variants = useDrawerRecipe();
const classes = computed(() => variants.value.footer({ class: props.class }));
</script>

<template>
  <div v-bind="attrs" data-slot="drawer-footer" :class="classes">
    <slot />
  </div>
</template>
