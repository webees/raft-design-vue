<script setup lang="ts">
import type { VNode } from "vue";
import { cn } from "../../lib/cn";
import { drag } from "./drag.recipe";
import { useDragEngine } from "./drag-context";
import type { FloatingDragProps } from "./floating-props";
import type { DragEndReason, DragSession } from "../../lib/drag-engine";
import {
  DRAG_KEYBOARD_OFFSET_PX,
  DRAG_SETTLE,
  type DragModifierArgs,
  type DragTransform,
  autoScrollAt,
  resetDragPointer,
  setDragPointer,
  trackDragPointer,
} from "./drag-lift";

defineOptions({ name: "RaftDragLift", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    FloatingDragProps & {
      autoScroll?: boolean;
      modifiers?: ((args: DragModifierArgs) => DragTransform)[];
      zIndex?: number;
    }
  >(),
  { autoScroll: true, zIndex: 999 },
);

const attrs = useAttrs();
const engine = useDragEngine();
const active = computed(() => engine?.active.value ?? null);
const settling = computed(() => (active.value ? null : (engine?.settling.value ?? null)));
const session = computed(() => active.value ?? settling.value?.session ?? null);
const slots = useSlots();
// dnd-kit keeps the overlay node alive through the drop animation; upstream
// clears `activeId` immediately, so the last frame has to be frozen here.
let snapshot: VNode[] = [];
const LiftContent = () => {
  if (active.value) {
    snapshot = slots.default?.({ active: active.value }) ?? [];
    return snapshot;
  }
  return settling.value ? snapshot : null;
};
const gliding = ref(false);
const dir = computed(() =>
  typeof document === "undefined" ? undefined : document.documentElement.dir || undefined,
);
const classes = computed(() => drag().lift({ class: props.class }));
const style = computed(() => {
  const current = session.value;
  if (!current) return {};
  const settle = settling.value;
  const glides = Boolean(settle && gliding.value);
  const transform = settle && glides ? dropDelta(current, settle.reason) : liftedDelta(current);
  return {
    position: "fixed" as const,
    left: `${current.rect.left + transform.x}px`,
    top: `${current.rect.top + transform.y}px`,
    width: `${current.rect.width}px`,
    height: `${current.rect.height}px`,
    zIndex: props.zIndex,
    transition: glides
      ? `left ${DRAG_SETTLE.duration}ms ${DRAG_SETTLE.easing}, top ${DRAG_SETTLE.duration}ms ${DRAG_SETTLE.easing}`
      : undefined,
    ...(typeof props.style === "string" ? {} : props.style),
  };
});

function liftedDelta(current: DragSession): DragTransform {
  let transform: DragTransform = { ...current.delta };
  if (current.keyboard) transform.y += DRAG_KEYBOARD_OFFSET_PX;
  for (const modifier of props.modifiers ?? []) {
    transform = modifier({ transform, activeNodeRect: current.rect, activatorEvent: null });
  }
  return transform;
}

/** The copy lands in the droppable it dropped on, or back home on a cancel. */
function dropDelta(current: DragSession, reason: DragEndReason): DragTransform {
  const target = reason === "drop" && current.over ? current.over.rect : current.rect;
  return { x: target.left - current.rect.left, y: target.top - current.rect.top };
}

watch(
  settling,
  (value) => {
    gliding.value = false;
    if (!value || typeof requestAnimationFrame === "undefined") return;
    requestAnimationFrame(() => {
      if (settling.value) gliding.value = true;
    });
  },
  { immediate: true },
);

let frame = 0;
let cleanup: (() => void) | null = null;

function stopSession() {
  cleanup?.();
  cleanup = null;
  cancelAnimationFrame(frame);
  frame = 0;
  resetDragPointer();
}

watch(
  active,
  (session) => {
    stopSession();
    if (!session || typeof window === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-dragging", "");
    setDragPointer(session.pointer.x, session.pointer.y);

    const onMove = (event: PointerEvent | TouchEvent) => trackDragPointer(event);
    const onBlur = () => engine?.cancel();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") engine?.cancel();
    };
    window.addEventListener("pointermove", onMove, { capture: true, passive: true });
    window.addEventListener("touchmove", onMove, { capture: true, passive: true });
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      const point = session.pointer;
      if (point) autoScrollAt(point.x, point.y);
      frame = requestAnimationFrame(tick);
    };
    if (props.autoScroll && !session.keyboard) frame = requestAnimationFrame(tick);

    cleanup = () => {
      root.removeAttribute("data-dragging");
      window.removeEventListener("pointermove", onMove, { capture: true });
      window.removeEventListener("touchmove", onMove, { capture: true });
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  },
  { immediate: true },
);

onBeforeUnmount(stopSession);
</script>

<template>
  <Teleport
    :to="props.container === null ? undefined : (props.container ?? 'body')"
    :disabled="!session || props.container === null"
  >
    <div v-if="session" data-slot="drag-lift-portal" class="contents" :dir="dir">
      <div
        v-bind="{ ...attrs, class: undefined, style: undefined }"
        :class="classes"
        :style="style"
        :data-settling="gliding ? '' : undefined"
        data-slot="drag-lift"
      >
        <LiftContent />
      </div>
    </div>
  </Teleport>
</template>
