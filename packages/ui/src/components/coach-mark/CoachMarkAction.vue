<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkAction", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(coachMark().action(), props.class, attrs.class as string | undefined),
);
const actionAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="actionAttrs" data-slot="coach-mark-action" :class="classes">
    <slot />
  </div>
</template>
