<script setup lang="ts">
import { cn } from "../../lib/cn";
import LogoArtwork from "./LogoArtwork.vue";

defineOptions({ name: "RaftLogo", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const svgClass = computed(() => cn(props.class, attrs.class as string));
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    viewBox="0 0 113 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="svgClass"
  >
    <LogoArtwork />
  </svg>
</template>
