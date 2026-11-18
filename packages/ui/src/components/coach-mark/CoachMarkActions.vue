<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkActions", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(coachMark().actions(), props.class, attrs.class as string | undefined),
);
const actionsAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="actionsAttrs" data-slot="coach-mark-actions" :class="classes">
    <slot />
  </div>
</template>
