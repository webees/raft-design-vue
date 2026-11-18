<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkCount", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(coachMark().count(), props.class, attrs.class as string | undefined),
);
const countAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <span v-bind="countAttrs" data-slot="coach-mark-count" :class="classes">
    <slot />
  </span>
</template>
