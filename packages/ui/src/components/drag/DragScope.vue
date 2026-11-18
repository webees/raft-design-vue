<script setup lang="ts">
import { createDragEngine } from "../../lib/drag-engine";
import type { DragData, DragSession } from "../../lib/drag-engine";
import { provideDragEngine } from "./drag-context";
import { dragSensorsActivation, type DragSensors } from "./drag-sensors";

defineOptions({ name: "RaftDragScope", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    canDrop?: (active: DragData, over: DragData) => boolean;
    disabled?: boolean;
    onDragCancel?: (session: DragSession) => void;
    onDragEnd?: (session: DragSession, reason: "drop" | "cancel") => void;
    onDragMove?: (session: DragSession) => void;
    onDragOver?: (session: DragSession) => void;
    onDragStart?: (session: DragSession) => void;
    sensors?: DragSensors;
  }>(),
  { disabled: false },
);

const engine = createDragEngine({
  activation: props.sensors ? dragSensorsActivation(props.sensors) : undefined,
  canDrop: props.canDrop,
  disabled: () => props.disabled,
  onDragCancel: props.onDragCancel,
  onDragEnd: props.onDragEnd,
  onDragMove: props.onDragMove,
  onDragOver: props.onDragOver,
  onDragStart: props.onDragStart,
});

provideDragEngine(engine);
</script>

<template>
  <slot />
</template>
