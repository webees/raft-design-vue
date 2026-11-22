<script setup lang="ts">
import { cn } from "../../lib/cn";
import { useTaskDnd, type TaskDropData } from "./task-dnd-context";
import { taskDnd } from "./task-dnd.recipe";

defineOptions({ name: "RaftTaskDraggable", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    disabled?: boolean;
    dropData?: TaskDropData;
    dropDisabled?: boolean;
    dropId?: string | number;
    id: string | number;
  }>(),
  { disabled: false, dropDisabled: false },
);

const attrs = useAttrs();
const context = useTaskDnd();
const root = ref<HTMLElement | null>(null);

const dragging = computed(() => context?.activeId() === props.id);
const lifted = computed(() => dragging.value && context?.overlay());
const isDropOver = computed(() => context?.over().overId === (props.dropId ?? props.id));
const classes = computed(() => taskDnd().draggable({ class: props.class }));
const dragStyle = computed(() => {
  const session = context?.engine.active.value;
  if (!dragging.value || lifted.value || !session) return undefined;
  return {
    transform: `translate3d(${session.delta.x}px, ${session.delta.y}px, 0)`,
    transition: "none",
  };
});

let unregisterDrag: (() => void) | null = null;
let unregisterDrop: (() => void) | null = null;

onMounted(() => {
  const node = root.value;
  if (!node || !context) return;
  unregisterDrag = context.engine.registerDraggable({
    data: { dropId: props.dropId },
    disabled: props.disabled,
    element: node,
    id: props.id,
  });
  if (props.dropId != null) {
    unregisterDrop = context.engine.registerDroppable({
      data: props.dropData ?? {},
      disabled: props.dropDisabled,
      element: node,
      id: props.dropId,
    });
  }
});

onBeforeUnmount(() => {
  unregisterDrag?.();
  unregisterDrop?.();
});

function onPointerDown(event: PointerEvent) {
  if (!context || !root.value) return;
  context.engine.startPointer(event, {
    data: { dropId: props.dropId },
    disabled: props.disabled,
    element: root.value,
    id: props.id,
  });
}

function onKeydown(event: KeyboardEvent) {
  if (!context || !root.value) return;
  const active = context.engine.active.value;
  if ((event.key === " " || event.key === "Enter") && !active) {
    event.preventDefault();
    context.engine.keyboard.start({
      data: { dropId: props.dropId },
      disabled: props.disabled,
      element: root.value,
      id: props.id,
    });
    return;
  }
  if (!active || active.id !== props.id) return;
  if (event.key === "Escape") {
    event.preventDefault();
    context.engine.keyboard.cancel();
  } else if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    context.engine.keyboard.drop();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    context.engine.keyboard.move("down");
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    context.engine.keyboard.move("up");
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    context.engine.keyboard.move("left");
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    context.engine.keyboard.move("right");
  }
}
</script>

<template>
  <div
    ref="root"
    v-bind="attrs"
    :aria-disabled="props.disabled || undefined"
    :class="classes"
    :data-disabled="props.disabled ? 'true' : undefined"
    :data-drag-origin="lifted ? '' : undefined"
    :data-dragging="dragging ? 'true' : undefined"
    :data-drop-over="isDropOver ? 'true' : undefined"
    data-slot="task-draggable"
    role="button"
    tabindex="0"
    :style="[attrs.style, dragStyle]"
    @keydown="onKeydown"
    @pointerdown="onPointerDown"
  >
    <slot />
  </div>
</template>
