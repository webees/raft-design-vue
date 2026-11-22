<script setup lang="ts">
import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { coachMark } from "./coach-mark.variants";

defineOptions({ name: "RaftCoachMarkAction", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => cn(coachMark().action(), props.class));
const actionAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="actionAttrs" data-slot="coach-mark-action" :class="classes">
    <slot />
  </div>
</template>
