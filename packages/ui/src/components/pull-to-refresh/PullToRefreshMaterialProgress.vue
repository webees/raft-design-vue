<script setup lang="ts">
import { computed } from "vue";

import { tv } from "../../lib/tv";
import type { PullToRefreshState } from "./pull-to-refresh-gesture";
import {
  MATERIAL_ARC_RADIUS,
  MATERIAL_CENTER,
  MATERIAL_PROGRESS_STYLE,
  MATERIAL_STROKE_WIDTH,
  materialArc,
  materialArcPath,
  materialArrowPoints,
} from "./material-progress";

defineOptions({ name: "RaftPullToRefreshMaterialProgress" });

const props = withDefaults(
  defineProps<{
    state?: PullToRefreshState;
    progress?: number;
  }>(),
  { state: "idle", progress: 0 },
);

const materialProgress = tv({
  slots: {
    root: ["size-10 shrink-0 overflow-visible", "text-info-strong"],
    determinate: [
      "transition-opacity duration-150 ease-out motion-reduce:transition-none",
      "opacity-30 data-armed:opacity-100",
    ],
    arc: ["fill-none stroke-current [stroke-linecap:butt]"],
    arrow: ["fill-current"],
    indeterminate: ["fill-none stroke-current [stroke-linecap:round]"],
  },
});

const slots = materialProgress();
const refreshing = computed(() => props.state === "refreshing");
const armed = computed(() => props.progress >= 1);
const values = computed(() => materialArc(refreshing.value ? 1 : props.progress));
</script>

<template>
  <svg
    data-slot="pull-to-refresh-material-progress"
    :data-state="props.state"
    :data-armed="!refreshing && armed ? '' : undefined"
    viewBox="0 0 40 40"
    aria-hidden="true"
    :class="slots.root()"
  >
    <component :is="'style'">{{ MATERIAL_PROGRESS_STYLE }}</component>
    <circle
      v-if="refreshing"
      data-material-indeterminate=""
      :cx="MATERIAL_CENTER"
      :cy="MATERIAL_CENTER"
      :r="MATERIAL_ARC_RADIUS"
      :stroke-width="MATERIAL_STROKE_WIDTH"
      :transform="`rotate(-90 ${MATERIAL_CENTER} ${MATERIAL_CENTER})`"
      :class="slots.indeterminate()"
    />
    <g v-else :data-armed="armed ? '' : undefined" :class="slots.determinate()">
      <path
        data-material-arc=""
        :d="materialArcPath(values)"
        :stroke-width="MATERIAL_STROKE_WIDTH"
        :class="slots.arc()"
      />
      <polygon
        v-if="values.arrowScale > 0"
        data-material-arrow=""
        :points="materialArrowPoints(values.arrowScale)"
        :transform="`rotate(${values.endAngle - MATERIAL_STROKE_WIDTH} ${MATERIAL_CENTER} ${MATERIAL_CENTER})`"
        :class="slots.arrow()"
      />
    </g>
  </svg>
</template>
