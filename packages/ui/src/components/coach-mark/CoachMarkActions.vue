<script setup lang="ts">
import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkActions", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(coachMark().actions(), props.class, attrs.class as string | undefined),
);
const actionsAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="actionsAttrs" data-slot="coach-mark-actions" :class="classes">
    <slot />
  </div>
</template>
