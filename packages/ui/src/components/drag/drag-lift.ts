import {
  DRAG_AUTO_SCROLL_ZONE_PX,
  DRAG_KEYBOARD_OFFSET_PX,
  DRAG_LIFT_Z_INDEX,
  DRAG_SETTLE,
  DRAG_SIBLING_TRANSITION,
  DROP_GLIDE,
  ORIGIN_OPACITY,
} from "../../lib/drag-constants";

export {
  DRAG_KEYBOARD_OFFSET_PX,
  DRAG_LIFT_Z_INDEX,
  DRAG_SETTLE,
  DRAG_SIBLING_TRANSITION,
  DROP_GLIDE,
  ORIGIN_OPACITY,
};
export { LIFT_CLASS } from "./drag.recipe";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * The last pointer position, for auto-scroll and the refusal hint. Returns
 * `null` before the first move, matching upstream `dragPointer()`.
 */
const pointer = { x: 0, y: 0, known: false };

export function dragPointer(): { x: number; y: number } | null {
  return pointer.known ? { x: pointer.x, y: pointer.y } : null;
}

export function trackDragPointer(event: PointerEvent | TouchEvent) {
  const point = "touches" in event ? event.touches[0] : event;
  if (!point) return;
  setDragPointer(point.clientX, point.clientY);
}

export function setDragPointer(x: number, y: number) {
  pointer.x = x;
  pointer.y = y;
  pointer.known = true;
}

export function resetDragPointer() {
  pointer.known = false;
}

/**
 * Cancels the drag in progress, whichever sensor holds it. Every sensor puts
 * the item back when the window is resized, so this sends the window a
 * `resize`: unlike a synthetic Escape, it cannot be swallowed by an app's own
 * Escape handler.
 */
export function cancelDrag() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("resize"));
}

export type DragTransform = { x: number; y: number; scaleX?: number; scaleY?: number };

export type DragModifierArgs = {
  transform: DragTransform;
  activeNodeRect: { left: number; top: number; width: number; height: number } | null;
  activatorEvent?: Event | null;
};

/**
 * For a compact proxy (a section's head, at most 240px wide): the grab point
 * is kept, but pulled to within `inset` of the proxy's end, so the hand never
 * holds empty air beside it.
 */
export function keepGrabInside(proxyWidth: number, inset = 20) {
  return ({ transform, activatorEvent, activeNodeRect }: DragModifierArgs): DragTransform => {
    if (!activeNodeRect || !activatorEvent) return transform;
    const point = eventPoint(activatorEvent);
    if (!point) return transform;
    const grabX = point.x - activeNodeRect.left;
    const max = proxyWidth - inset;
    return grabX > max ? { ...transform, x: transform.x + (grabX - max) } : transform;
  };
}

function eventPoint(event: Event): { x: number; y: number } | null {
  if ("clientX" in event && typeof (event as PointerEvent).clientX === "number") {
    const pointerEvent = event as PointerEvent;
    return { x: pointerEvent.clientX, y: pointerEvent.clientY };
  }
  const touch = (event as TouchEvent).touches?.[0] ?? (event as TouchEvent).changedTouches?.[0];
  return touch ? { x: touch.clientX, y: touch.clientY } : null;
}

/**
 * The transition siblings use while a drag is open, or `null` when the user
 * prefers reduced motion.
 */
export function useDragSiblingTransition() {
  const reduced = ref(false);

  if (getCurrentInstance()) {
    onMounted(() => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
      const query = window.matchMedia(REDUCED_MOTION);
      const sync = () => {
        reduced.value = query.matches;
      };
      sync();
      query.addEventListener("change", sync);
      onBeforeUnmount(() => query.removeEventListener("change", sync));
    });
  }

  return computed(() => (reduced.value ? null : DRAG_SIBLING_TRANSITION));
}

function scrollable(element: Element) {
  const style = getComputedStyle(element);
  return {
    x: /(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth,
    y: /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight,
  };
}

/** Faster the nearer the edge: up to 16px a frame at the edge itself. */
function speed(depth: number) {
  return Math.ceil(16 * Math.min(1, depth / DRAG_AUTO_SCROLL_ZONE_PX) ** 2);
}

function scrollDelta(start: number, end: number, at: number, position: number, max: number) {
  const zone = DRAG_AUTO_SCROLL_ZONE_PX;
  if (at < start + zone && position > 0) return -speed(start + zone - at);
  if (at > end - zone && position < max) return speed(at - (end - zone));
  return 0;
}

/** Scrolls the nearest area under the point that can still scroll toward the edge it is near. */
export function autoScrollAt(x: number, y: number) {
  if (typeof document === "undefined") return;
  let element = document.elementFromPoint(x, y);
  while (element && element !== document.documentElement && element !== document.body) {
    const can = scrollable(element);
    if (can.x || can.y) {
      const rect = element.getBoundingClientRect();
      const dy = can.y
        ? scrollDelta(
            rect.top,
            rect.bottom,
            y,
            element.scrollTop,
            element.scrollHeight - element.clientHeight - 1,
          )
        : 0;
      const dx = can.x
        ? scrollDelta(
            rect.left,
            rect.right,
            x,
            element.scrollLeft,
            element.scrollWidth - element.clientWidth - 1,
          )
        : 0;
      if (dx || dy) element.scrollBy(dx, dy);
      return;
    }
    element = element.parentElement;
  }

  const page = document.scrollingElement ?? document.documentElement;
  const dy = scrollDelta(
    0,
    window.innerHeight,
    y,
    page.scrollTop,
    page.scrollHeight - window.innerHeight - 1,
  );
  if (dy) window.scrollBy(0, dy);
}
