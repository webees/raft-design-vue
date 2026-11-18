<script setup lang="ts">
import { cn } from "../../lib/cn";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div data-slot="scroll-area-content" :class="cn('r-scroll-area__content', props.class)">
    <slot />
  </div>
</template>
