<script setup lang="ts">
defineOptions({ name: "RaftLogoSvg", inheritAttrs: false });

const props = defineProps<{ viewBox: string; class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <svg
    v-bind="{ ...attrs, class: undefined }"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="props.class"
  >
    <slot />
  </svg>
</template>
