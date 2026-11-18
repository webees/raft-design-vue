<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftTimelineTitle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const rootClass = computed(() => cn("r-timeline-title", props.class));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="timeline-title" :class="rootClass">
    <slot />
  </div>
</template>
