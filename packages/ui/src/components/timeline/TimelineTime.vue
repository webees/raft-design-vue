<script setup lang="ts">
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftTimelineTime", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const rootClass = computed(() => cn("r-timeline-time", props.class));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="timeline-time" :class="rootClass">
    <slot />
  </div>
</template>
