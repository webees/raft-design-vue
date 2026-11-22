<script setup lang="ts">
import { useTaskDnd, useTaskDropState, type TaskDropData } from "./task-dnd-context";

defineOptions({ name: "RaftTaskDropZone", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    class?: string;
    data?: TaskDropData;
    disabled?: boolean;
    dragInto?: boolean;
    id: string | number;
  }>(),
  { as: "div", disabled: false, dragInto: false },
);

const attrs = useAttrs();
const context = useTaskDnd();
const root = ref<HTMLElement | null>(null);

const dropState = useTaskDropState(() => props.id, { data: () => props.data });

let unregister: (() => void) | null = null;

onMounted(() => {
  const node = root.value;
  if (!node || !context) return;
  unregister = context.engine.registerDroppable({
    data: props.data ?? {},
    disabled: props.disabled,
    element: node,
    id: props.id,
  });
});

onBeforeUnmount(() => unregister?.());
</script>

<template>
  <component
    :is="props.as"
    ref="root"
    v-bind="attrs"
    :class="props.class"
    :data-drag-into="props.dragInto && dropState === 'allowed' ? '' : undefined"
    :data-drop-state="dropState"
    data-slot="task-drop-zone"
  >
    <slot :dropState="dropState" />
  </component>
</template>
