<script setup lang="ts">
import { cn } from "../../lib/cn";
import { drag } from "./drag.recipe";
import { useDragEngine } from "./drag-context";
import type { FloatingDragProps } from "./floating-props";
import {
  DRAG_KEYBOARD_OFFSET_PX,
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
const dir = computed(() =>
  typeof document === "undefined" ? undefined : document.documentElement.dir || undefined,
);
const classes = computed(() =>
  drag().lift({ class: cn(attrs.class as string | undefined, props.class) }),
);
const style = computed(() => {
  const session = active.value;
  if (!session) return {};
  let transform: DragTransform = { ...session.delta };
  if (session.keyboard) transform.y += DRAG_KEYBOARD_OFFSET_PX;
  for (const modifier of props.modifiers ?? []) {
    transform = modifier({ transform, activeNodeRect: session.rect, activatorEvent: null });
  }
  return {
    position: "fixed" as const,
    left: `${session.rect.left + transform.x}px`,
    top: `${session.rect.top + transform.y}px`,
    width: `${session.rect.width}px`,
    height: `${session.rect.height}px`,
    zIndex: props.zIndex,
    ...(typeof props.style === "string" ? {} : props.style),
  };
});

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
    :disabled="!active || props.container === null"
  >
    <div v-if="active" data-slot="drag-lift-portal" class="contents" :dir="dir">
      <div
        v-bind="{ ...attrs, class: undefined, style: undefined }"
        :class="classes"
        :style="style"
        data-slot="drag-lift"
      >
        <slot :active="active" />
      </div>
    </div>
  </Teleport>
</template>
