<script setup lang="ts">
import { createDragEngine } from "../../lib/drag-engine";
import type { DragData, DragLifecycleProps } from "../../lib/drag-engine";
import { provideDragEngine } from "./drag-context";
import { dragSensorsActivation, type DragSensors } from "./drag-sensors";

defineOptions({ name: "RaftDragScope", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    DragLifecycleProps & {
      canDrop?: (active: DragData, over: DragData) => boolean;
      disabled?: boolean;
      sensors?: DragSensors;
    }
  >(),
  { disabled: false },
);

const engine = createDragEngine({
  activation: props.sensors ? dragSensorsActivation(props.sensors) : undefined,
  canDrop: (active, over) => props.canDrop?.(active, over) ?? true,
  disabled: () => props.disabled,
  onDragCancel: (session) => props.onDragCancel?.(session),
  onDragEnd: (session, reason) => props.onDragEnd?.(session, reason),
  onDragMove: (session) => props.onDragMove?.(session),
  onDragOver: (session) => props.onDragOver?.(session),
  onDragStart: (session) => props.onDragStart?.(session),
});

provideDragEngine(engine);
</script>

<template>
  <slot />
</template>
