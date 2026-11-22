<script setup lang="ts">
import { cn } from "../../lib/cn";
import { composer } from "./composer.recipe";

defineOptions({ name: "RaftComposer", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => composer().root({ class: props.class }));
</script>

<template>
  <div v-bind="attrs" :class="classes" data-slot="composer">
    <slot />
  </div>
</template>
