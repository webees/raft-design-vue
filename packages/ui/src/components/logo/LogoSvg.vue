<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftLogoSvg", inheritAttrs: false });

const props = defineProps<{ viewBox: string; class?: string }>();
const attrs = useAttrs();
const svgClass = computed(() => cn(props.class, attrs.class as string));
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="svgClass"
  >
    <slot />
  </svg>
</template>
