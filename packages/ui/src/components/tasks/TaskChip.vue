<script setup lang="ts">
import { cn } from "../../lib/cn";
import type { TaskStatusId } from "../../lib/task-status";
import { taskChip, type TaskChipSize, type TaskChipVariant } from "./task-chip.variants";

defineOptions({ name: "RaftTaskChip", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    status: TaskStatusId;
    loading?: boolean;
    variant?: TaskChipVariant;
    size?: TaskChipSize;
  }>(),
  { loading: false, variant: "default", size: "default" },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  cn(
    taskChip({ status: props.status, variant: props.variant, size: props.size }).root({
      class: attrs.class as string,
    }),
  ),
);
const slotName = computed(() => (attrs["data-slot"] as string | undefined) ?? "task-chip");
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="slotName"
    data-inline-reference=""
    :data-loading="loading ? 'true' : undefined"
    :class="rootClass"
  >
    <slot />
  </span>
</template>
