<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { useDragEngine } from "./drag-context";

defineOptions({ name: "RaftDraggable", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    class?: string;
    data?: Record<string, unknown>;
    disabled?: boolean;
    id: string | number;
  }>(),
  { as: "div", disabled: false, data: () => ({}) },
);

const attrs = useAttrs();
const engine = useDragEngine();
const root = ref<HTMLElement | null>(null);

const dragging = computed(() => engine?.active.value?.id === props.id);
const classes = computed(() => cn(attrs.class as string | undefined, props.class));

let unregister: (() => void) | null = null;

const elementOf = toElement;

onMounted(() => {
  const node = elementOf(root.value);
  if (!node || !engine) return;
  unregister = engine.registerDraggable({
    data: props.data,
    disabled: props.disabled,
    element: node,
    id: props.id,
  });
});

onBeforeUnmount(() => unregister?.());

function onPointerDown(event: PointerEvent) {
  const node = elementOf(root.value);
  if (!engine || !node) return;
  engine.startPointer(event, {
    data: props.data,
    disabled: props.disabled,
    element: node,
    id: props.id,
  });
}

function onKeydown(event: KeyboardEvent) {
  const node = elementOf(root.value);
  if (!engine || !node) return;
  const active = engine.active.value;
  if (event.code === "Space") {
    if (!active) {
      event.preventDefault();
      engine.keyboard.start({
        data: props.data,
        disabled: props.disabled,
        element: node,
        id: props.id,
      });
    } else if (active.id === props.id) {
      event.preventDefault();
      engine.keyboard.drop();
    }
    return;
  }
  if (!active || active.id !== props.id) return;
  const move = {
    ArrowDown: "down",
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowRight: "right",
  }[event.code] as "down" | "up" | "left" | "right" | undefined;
  if (event.code === "Escape") {
    event.preventDefault();
    engine.keyboard.cancel();
  } else if (move) {
    event.preventDefault();
    engine.keyboard.move(move);
  }
}
</script>

<template>
  <Primitive
    :as="props.as"
    ref="root"
    v-bind="attrs"
    :class="classes"
    :data-drag-id="props.id"
    :data-dragging="dragging ? '' : undefined"
    data-drag-draggable=""
    data-slot="draggable"
    role="button"
    tabindex="0"
    :aria-disabled="props.disabled || undefined"
    @pointerdown="onPointerDown"
    @keydown="onKeydown"
  >
    <slot :dragging="dragging" />
  </Primitive>
</template>
