<script setup lang="ts">
import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkCount", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(coachMark().count(), props.class, attrs.class as string | undefined),
);
const countAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <span v-bind="countAttrs" data-slot="coach-mark-count" :class="classes">
    <slot />
  </span>
</template>
