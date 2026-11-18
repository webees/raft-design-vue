<script setup lang="ts">
import { computed, useAttrs, useSlots } from "vue";
import { cn } from "../../lib/cn";
import type { TaskStatusId } from "../../lib/task-status";

defineOptions({ name: "RaftTimelineItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: "default" | "information" | "success" | "warning" | "danger" | "accent";
    color?: string;
    taskStatus?: TaskStatusId;
    lineType?: "solid" | "dashed";
    class?: string;
  }>(),
  { variant: "default", color: undefined, taskStatus: undefined, lineType: "solid" },
);

const attrs = useAttrs();
const slots = useSlots();

const resolvedColor = computed(() => {
  if (props.color !== undefined) return props.color;
  if (props.taskStatus === undefined) return undefined;
  return props.taskStatus === "backlog"
    ? "var(--line-strong)"
    : `var(--task-status-${props.taskStatus})`;
});

const hollow = computed(() => props.color === undefined && props.taskStatus === "backlog");

const rootClass = computed(() =>
  cn(
    "r-timeline-item",
    `r-timeline-item--${props.variant}`,
    props.lineType === "dashed" && "r-timeline-item--dashed",
    resolvedColor.value !== undefined && "r-timeline-item--color",
    props.class,
  ),
);

const mergedStyle = computed(() => {
  const base = (attrs.style as Record<string, string> | undefined) ?? {};
  if (resolvedColor.value === undefined) return base;
  return {
    ...base,
    "--r-timeline-custom-color": resolvedColor.value,
    ...(hollow.value
      ? {
          "--r-timeline-marker-fill": "0%",
          "--r-timeline-marker-border-color": "var(--r-timeline-item-color)",
        }
      : {}),
  };
});
</script>

<template>
  <li
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    data-slot="timeline-item"
    :data-task-status="taskStatus"
    :data-icon="slots.icon ? '' : undefined"
    :class="rootClass"
    :style="mergedStyle"
  >
    <div aria-hidden="true" data-slot="timeline-item-axis" class="r-timeline-item__axis">
      <span v-if="slots.icon" data-slot="timeline-item-icon" class="r-timeline-item__icon">
        <slot name="icon" />
      </span>
      <span v-else data-slot="timeline-item-marker" class="r-timeline-item__marker" />
      <span data-slot="timeline-item-line" class="r-timeline-item__line" />
    </div>
    <div data-slot="timeline-item-body" class="r-timeline-item__body">
      <slot />
    </div>
  </li>
</template>
