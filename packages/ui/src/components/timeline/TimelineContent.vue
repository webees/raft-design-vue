<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";

defineOptions({ name: "RaftTimelineContent", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const rootClass = computed(() => cn("r-timeline-content", props.class));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="timeline-content" :class="rootClass">
    <slot />
  </div>
</template>
