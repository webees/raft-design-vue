<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import WordmarkArtwork from "./WordmarkArtwork.vue";

defineOptions({ name: "RaftWordmark", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const svgClass = computed(() => cn(props.class, attrs.class as string));
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    viewBox="128 0 294 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="svgClass"
  >
    <WordmarkArtwork />
  </svg>
</template>
