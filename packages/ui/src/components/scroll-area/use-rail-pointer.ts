import { onBeforeUnmount, ref, type Ref } from "vue";

import { pageDirection, pageDistance } from "./scroll-geometry";
import type { ScrollAxis } from "./scroll-geometry";

type Drag = {
  pointerId: number;
  thumb: HTMLElement;
  start: number;
  scrollStart: number;
  scale: number;
};

const reducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Dragging and paging for one rail: the thumb moves the container while the
 * pointer drags it, and a click on the rail pages toward the pointer.
 */
export function useRailPointer(options: {
  axis: ScrollAxis;
  containerRef: Ref<HTMLElement | null>;
  onDraggingChange: (dragging: boolean) => void;
}) {
  const dragging = ref(false);
  let drag: Drag | null = null;
  const vertical = options.axis === "y";
  const along = (event: PointerEvent) => (vertical ? event.clientY : event.clientX);

  const changeDragging = (next: boolean) => {
    dragging.value = next;
    options.onDraggingChange(next);
  };

  const endDrag = () => {
    const current = drag;
    if (!current) return;
    drag = null;
    changeDragging(false);
  };

  const onRailPointerDown = (event: PointerEvent) => {
    const container = options.containerRef.value;
    const thumb = (event.currentTarget as HTMLElement).firstElementChild as HTMLElement | null;
    if (!container || !thumb || event.button !== 0 || event.pointerType === "touch") return;
    event.preventDefault();
    const rect = thumb.getBoundingClientRect();
    const direction = vertical
      ? pageDirection(event.clientY, rect.top, rect.bottom)
      : pageDirection(event.clientX, rect.left, rect.right);
    const distance =
      direction * pageDistance(vertical ? container.clientHeight : container.clientWidth);
    container.scrollBy({
      behavior: reducedMotion() ? "instant" : "smooth",
      [vertical ? "top" : "left"]: distance,
    });
  };

  const onThumbPointerDown = (event: PointerEvent) => {
    const container = options.containerRef.value;
    const thumb = event.currentTarget as HTMLElement;
    const rail = thumb.parentElement;
    if (!container || !rail || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const travel = vertical
      ? rail.clientHeight - thumb.offsetHeight
      : rail.clientWidth - thumb.offsetWidth;
    const overflow = vertical
      ? container.scrollHeight - container.clientHeight
      : container.scrollWidth - container.clientWidth;
    thumb.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      thumb,
      scale: travel > 0 ? overflow / travel : 0,
      scrollStart: vertical ? container.scrollTop : container.scrollLeft,
      start: along(event),
    };
    changeDragging(true);
  };

  const onThumbPointerMove = (event: PointerEvent) => {
    const current = drag;
    const container = options.containerRef.value;
    if (!current || !container || current.pointerId !== event.pointerId) return;
    event.preventDefault();
    const next = current.scrollStart + (along(event) - current.start) * current.scale;
    if (vertical) container.scrollTop = next;
    else container.scrollLeft = next;
  };

  onBeforeUnmount(() => {
    if (drag) endDrag();
  });

  return {
    dragging,
    railHandlers: { onPointerDown: onRailPointerDown },
    thumbHandlers: {
      onLostPointerCapture: endDrag,
      onPointerCancel: endDrag,
      onPointerDown: onThumbPointerDown,
      onPointerMove: onThumbPointerMove,
      onPointerUp: endDrag,
    },
  };
}
