<script setup lang="ts">
import { searchTrigger } from "./search-trigger.recipe";

defineOptions({ name: "RaftSearchTrigger", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    type?: "button" | "submit" | "reset";
    class?: string;
  }>(),
  { as: "button", type: "button" },
);

const attrs = useAttrs();
const classes = computed(() => searchTrigger().root({ class: props.class }));
</script>

<template>
  <component
    :is="as"
    v-bind="attrs"
    :type="as === 'button' ? type : undefined"
    data-slot="search-trigger"
    :class="classes"
  >
    <slot />
  </component>
</template>
