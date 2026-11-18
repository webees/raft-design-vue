<script setup lang="ts">
import Kbd from "../kbd/Kbd.vue";
import { searchTrigger } from "./search-trigger.recipe";

defineOptions({ name: "RaftSearchTriggerShortcut", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => searchTrigger().shortcut({ class: props.class }));
</script>

<template>
  <Kbd v-bind="attrs" data-slot="search-trigger-shortcut" :class="classes">
    <slot />
  </Kbd>
</template>
