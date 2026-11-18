<script setup lang="ts">
import { cn } from "../../lib/cn";
import type { TaskStatusId } from "../../lib/task-status";
import { taskStatusSoft } from "../tasks/task-status.variants";
import TaskStatusIcon from "../tasks/TaskStatusIcon.vue";
import { taskCardStatus } from "./task-card.variants";

defineOptions({ name: "RaftTaskCardStatus", inheritAttrs: false });

const props = withDefaults(defineProps<{ status: TaskStatusId; busy?: boolean }>(), {
  busy: false,
});
const attrs = useAttrs();

const rootClass = computed(() =>
  cn(taskCardStatus(), taskStatusSoft({ status: props.status }), attrs.class as string),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="task-card-status"
    :data-busy="busy ? 'true' : undefined"
    :aria-busy="busy || undefined"
    :class="rootClass"
  >
    <slot>
      <TaskStatusIcon :status="status" />
    </slot>
  </button>
</template>
