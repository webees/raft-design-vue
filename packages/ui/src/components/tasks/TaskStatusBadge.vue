<script setup lang="ts">
import type { TaskStatusId } from "../../lib/task-status";
import TaskChip from "./TaskChip.vue";
import TaskStatusIcon from "./TaskStatusIcon.vue";
import type { TaskChipSize } from "./task-chip.variants";

defineOptions({ name: "RaftTaskStatusBadge", inheritAttrs: false });

withDefaults(
  defineProps<{
    status: TaskStatusId;
    size?: TaskChipSize;
    loading?: boolean;
  }>(),
  { size: "default", loading: false },
);
const attrs = useAttrs();
</script>

<template>
  <TaskChip
    v-bind="attrs"
    :status="status"
    :size="size"
    :loading="loading"
    data-slot="task-status-badge"
    :data-status="status"
  >
    <TaskStatusIcon :status="status" />
    <slot />
  </TaskChip>
</template>
