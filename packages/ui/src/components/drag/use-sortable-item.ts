import { computed, onBeforeUnmount, ref, watch, type Ref } from "vue";

import { toElement } from "../../lib/dom";
import { useDragEngine } from "./drag-context";

export type UseSortableItemOptions = {
  id: string;
  data?: Record<string, unknown>;
  disabled?: boolean;
  /** A component ref to the element to make sortable, instead of a wrapper. */
  target?: Ref<unknown>;
};

/**
 * Registers one element as both the draggable and the droppable of a sortable
 * item. Returns the binding helpers a sortable wrapper spreads on its root.
 */
export function useSortableItem(options: UseSortableItemOptions) {
  const engine = useDragEngine();
  const ownElement = ref<HTMLElement | null>(null);
  const element = computed<HTMLElement | null>(() =>
    options.target ? toElement(options.target.value) : ownElement.value,
  );
  let cleanup: (() => void) | null = null;

  function bind() {
    cleanup?.();
    cleanup = null;
    const node = element.value;
    if (!node || !engine) return;
    const registration = {
      element: node,
      id: options.id,
      get data() {
        return options.data ?? {};
      },
      get disabled() {
        return options.disabled ?? false;
      },
    };
    const offDraggable = engine.registerDraggable(registration);
    const offDroppable = engine.registerDroppable(registration);
    cleanup = () => {
      offDraggable();
      offDroppable();
    };
  }

  watch(element, bind, { flush: "post", immediate: true });
  onBeforeUnmount(() => cleanup?.());

  const dragging = computed(() => engine?.active.value?.id === options.id);
  const over = computed(() => engine?.active.value?.over?.id === options.id);

  function onPointerDown(event: PointerEvent) {
    const node = element.value;
    if (!node || !engine) return;
    engine.startPointer(event, {
      data: options.data ?? {},
      disabled: options.disabled ?? false,
      element: node,
      id: options.id,
    });
  }

  function onKeydown(event: KeyboardEvent) {
    const node = element.value;
    if (!node || !engine) return;
    const active = engine.active.value;
    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      if (!active) {
        engine.keyboard.start({
          data: options.data ?? {},
          disabled: options.disabled ?? false,
          element: node,
          id: options.id,
        });
      } else if (active.id === options.id) {
        engine.keyboard.drop();
      }
      return;
    }
    if (!active || active.id !== options.id) return;
    if (event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      engine.keyboard.cancel();
      return;
    }
    const move = {
      ArrowDown: "down",
      ArrowUp: "up",
      ArrowLeft: "left",
      ArrowRight: "right",
    }[event.code] as "down" | "up" | "left" | "right" | undefined;
    if (!move) return;
    event.preventDefault();
    event.stopPropagation();
    engine.keyboard.move(move);
  }

  return { element, elementRef: ownElement, dragging, over, onPointerDown, onKeydown };
}
