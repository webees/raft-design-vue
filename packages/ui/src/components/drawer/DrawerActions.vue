<script setup lang="ts">
import { useDrawerPart } from "./drawer-context";

defineOptions({ name: "RaftDrawerActions", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const { attrs, config, recipe: variants } = useDrawerPart();
const classes = computed(() => variants.value.actions({ class: props.class }));
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
