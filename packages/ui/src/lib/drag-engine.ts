import {
  DRAG_AUTO_SCROLL_ZONE_PX,
  MOUSE_DRAG_DISTANCE_PX,
  TOUCH_DRAG_DISTANCE_PX,
  TOUCH_DRAG_HOLD_MS,
  TOUCH_DRAG_TOLERANCE_PX,
} from "./drag-constants";
import { holdEscape, releaseEscape } from "./drag-escape";

export type DragId = string | number;
export type DragPoint = { x: number; y: number };
export type DragPlacement = "before" | "after";

export type DragData = Record<string, unknown>;

export interface DraggableRegistration {
  data: DragData;
  disabled?: boolean;
  element: HTMLElement;
  id: DragId;
}

export interface DroppableRegistration {
  accept?: (active: DragData) => boolean;
  data: DragData;
  disabled?: boolean;
  element: HTMLElement;
  id: DragId;
}

export interface DragOverState {
  data: DragData;
  id: DragId;
  placement: DragPlacement | null;
  rect: DOMRect;
}

export interface DragSession {
  data: DragData;
  delta: DragPoint;
  id: DragId;
  keyboard: boolean;
  over: DragOverState | null;
  pointer: DragPoint;
  rect: DOMRect;
}

export type DragEndReason = "drop" | "cancel";

export interface DragEngineOptions {
  /** Sensor thresholds; `useDragSensors` builds these from the same tokens. */
  activation?: {
    mouseDistance?: number;
    touchDistance?: number;
    touchHoldMs?: number;
    touchTolerance?: number;
  };
  canDrop?: (active: DragData, over: DragData) => boolean;
  disabled?: () => boolean;
  onDragCancel?: (session: DragSession) => void;
  onDragEnd?: (session: DragSession, reason: DragEndReason) => void;
  onDragMove?: (session: DragSession) => void;
  onDragOver?: (session: DragSession) => void;
  onDragStart?: (session: DragSession) => void;
}

function pointOf(event: PointerEvent): DragPoint {
  return { x: event.clientX, y: event.clientY };
}

function rectCenter(rect: DOMRect): DragPoint {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function distance(a: DragPoint, b: DragPoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function scrollableAncestor(element: Element | null): Element | null {
  let node = element?.parentElement ?? null;
  while (node) {
    const style = getComputedStyle(node);
    if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
}

export function createDragEngine(options: DragEngineOptions = {}) {
  const activation = {
    mouseDistance: options.activation?.mouseDistance ?? MOUSE_DRAG_DISTANCE_PX,
    touchDistance: options.activation?.touchDistance ?? TOUCH_DRAG_DISTANCE_PX,
    touchHoldMs: options.activation?.touchHoldMs ?? TOUCH_DRAG_HOLD_MS,
    touchTolerance: options.activation?.touchTolerance ?? TOUCH_DRAG_TOLERANCE_PX,
  };
  const active = shallowRef<DragSession | null>(null);
  let measureObserver: ResizeObserver | null = null;
  const message = ref("");

  const draggables = new Map<Element, DraggableRegistration>();
  const droppables = new Map<Element, DroppableRegistration>();

  let start: { point: DragPoint; registration: DraggableRegistration; pointerId: number } | null =
    null;
  let holdTimer: ReturnType<typeof setTimeout> | null = null;
  let started = false;
  let armed = false;
  let lastOverKey = "";

  function registerDraggable(registration: DraggableRegistration) {
    draggables.set(registration.element, registration);
    return () => draggables.delete(registration.element);
  }

  function registerDroppable(registration: DroppableRegistration) {
    droppables.set(registration.element, registration);
    return () => droppables.delete(registration.element);
  }

  function announce(text: string) {
    message.value = text;
  }

  function droppablesList() {
    return [...droppables.values()].filter((entry) => !entry.disabled && entry.element.isConnected);
  }

  function resolveOver(session: DragSession): DragOverState | null {
    const candidates = droppablesList();
    if (candidates.length === 0) return null;

    let target: DroppableRegistration | undefined;
    const hit = document.elementFromPoint(session.pointer.x, session.pointer.y);
    const closest = hit?.closest<HTMLElement>("[data-drag-droppable]");
    if (closest) target = droppables.get(closest);

    if (!target || target.disabled || target.accept?.(session.data) === false) {
      const pointer = session.pointer;
      let best = Infinity;
      for (const entry of candidates) {
        if (entry.accept && entry.accept(session.data) === false) continue;
        const rect = entry.element.getBoundingClientRect();
        const center = rectCenter(rect);
        const score = distance(pointer, center) - rect.width * 0.0001;
        if (score < best) {
          best = score;
          target = entry;
        }
      }
    }

    if (!target) return null;
    if (target.accept && target.accept(session.data) === false) return null;

    const rect = target.element.getBoundingClientRect();
    const placement: DragPlacement =
      session.pointer.y < rect.top + rect.height / 2 ? "before" : "after";
    return { data: target.data, id: target.id, placement, rect };
  }

  function updateAutoScroll(session: DragSession) {
    if (typeof window === "undefined") return;
    const { x, y } = session.pointer;
    const scroller = scrollableAncestor((session.data.element as Element | undefined) ?? null);
    const deltaY =
      y < DRAG_AUTO_SCROLL_ZONE_PX
        ? -12
        : y > window.innerHeight - DRAG_AUTO_SCROLL_ZONE_PX
          ? 12
          : 0;
    const deltaX =
      x < DRAG_AUTO_SCROLL_ZONE_PX
        ? -12
        : x > window.innerWidth - DRAG_AUTO_SCROLL_ZONE_PX
          ? 12
          : 0;
    if (!deltaY && !deltaX) return;
    if (scroller) scroller.scrollBy({ top: deltaY, left: deltaX });
    else window.scrollBy({ top: deltaY, left: deltaX });
  }

  function move(event: PointerEvent) {
    if (!start || event.pointerId !== start.pointerId) return;
    const point = pointOf(event);

    if (!started) {
      if (event.pointerType === "touch") {
        if (!armed) {
          if (distance(point, start.point) > activation.touchTolerance) cleanup(pointerListeners);
          return;
        }
        if (distance(point, start.point) < activation.touchDistance) return;
        begin();
      } else {
        if (distance(point, start.point) < activation.mouseDistance) return;
        begin();
      }
    }

    const session = active.value;
    if (!session) return;
    event.preventDefault();
    session.pointer = point;
    session.delta = { x: point.x - start.point.x, y: point.y - start.point.y };
    session.over = resolveOver(session);
    // `active` is a shallowRef: replace the object so consumers re-render.
    active.value = { ...session };
    updateAutoScroll(session);
    options.onDragMove?.(session);
    const overKey = session.over ? `${session.over.id}:${session.over.placement}` : "";
    if (overKey !== lastOverKey) {
      lastOverKey = overKey;
      options.onDragOver?.(session);
    }
    document.documentElement.style.cursor = "grabbing";
  }

  function sessionFor(
    registration: DraggableRegistration,
    keyboard: boolean,
    pointer?: { x: number; y: number },
  ): DragSession {
    const rect = registration.element.getBoundingClientRect();
    return {
      data: { ...registration.data, element: registration.element },
      delta: { x: 0, y: 0 },
      id: registration.id,
      keyboard,
      over: null,
      pointer: pointer ?? rectCenter(rect),
      rect,
    };
  }

  function begin() {
    if (!start) return;
    started = true;
    const { registration } = start;
    const session = sessionFor(registration, false, start.point);
    active.value = session;
    if (typeof ResizeObserver !== "undefined") {
      measureObserver?.disconnect();
      measureObserver = new ResizeObserver(() => {
        const current = active.value;
        if (!current || !registration.element.isConnected) return;
        active.value = { ...current, rect: registration.element.getBoundingClientRect() };
      });
      measureObserver.observe(registration.element);
    }
    document.body.style.userSelect = "none";
    document.documentElement.style.cursor = "grabbing";
    grabEscape();
    options.onDragStart?.(session);
  }

  function end(event: PointerEvent | null, reason: DragEndReason) {
    const session = active.value;
    dropEscape();
    if (session && reason === "drop" && event) {
      session.pointer = pointOf(event);
      session.over = resolveOver(session);
      active.value = { ...session };
    }
    cleanup(pointerListeners);
    measureObserver?.disconnect();
    measureObserver = null;
    active.value = null;
    lastOverKey = "";
    document.body.style.userSelect = "";
    document.documentElement.style.cursor = "";
    if (!session) return;
    if (reason === "drop" && session.over) options.onDragEnd?.(session, "drop");
    else options.onDragCancel?.(session);
  }

  function cancel() {
    end(null, "cancel");
  }

  /** The drag's own token: every escape guard keys its hold by it. */
  const escapeToken = {};
  const grabEscape = () =>
    holdEscape(typeof window === "undefined" ? null : window, escapeToken, cancel);
  const dropEscape = () =>
    releaseEscape(typeof window === "undefined" ? null : window, escapeToken);

  const pointerListeners = {
    move: (event: Event) => move(event as PointerEvent),
    up: (event: Event) => end(event as PointerEvent, "drop"),
    key: (event: Event) => {
      if ((event as KeyboardEvent).key === "Escape") {
        event.preventDefault();
        cancel();
      }
    },
    blur: () => cancel(),
    resize: () => cancel(),
  };

  function cleanup(listeners: typeof pointerListeners) {
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
    start = null;
    started = false;
    armed = false;
    if (typeof window === "undefined") return;
    window.removeEventListener("pointermove", listeners.move);
    window.removeEventListener("pointerup", listeners.up);
    window.removeEventListener("pointercancel", listeners.up);
    window.removeEventListener("keydown", listeners.key, true);
    window.removeEventListener("blur", listeners.blur);
    window.removeEventListener("resize", listeners.resize);
  }

  function startPointer(event: PointerEvent, registration: DraggableRegistration) {
    if (options.disabled?.() || registration.disabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable]"))
      return;
    start = { point: pointOf(event), registration, pointerId: event.pointerId };
    started = false;
    armed = false;
    window.addEventListener("pointermove", pointerListeners.move, { passive: false });
    window.addEventListener("pointerup", pointerListeners.up);
    window.addEventListener("pointercancel", pointerListeners.up);
    window.addEventListener("keydown", pointerListeners.key, true);
    window.addEventListener("blur", pointerListeners.blur);
    window.addEventListener("resize", pointerListeners.resize);
    if (event.pointerType === "touch") {
      holdTimer = setTimeout(() => {
        holdTimer = null;
        armed = true;
      }, activation.touchHoldMs);
    }
  }

  const keyboard = {
    start(registration: DraggableRegistration) {
      if (options.disabled?.() || registration.disabled) return;
      const session = sessionFor(registration, true);
      active.value = session;
      grabEscape();
      options.onDragStart?.(session);
    },
    move(direction: "up" | "down" | "left" | "right") {
      const session = active.value;
      if (!session?.keyboard) return;
      // The dragged item is a droppable too (it can be dropped back home) but
      // a keyboard step must land on a *sibling*: with identical or missing
      // rects, keeping it in the list would make the first arrow a no-op.
      const candidates = droppablesList().filter(
        (entry) => entry.id !== session.id && (!entry.accept || entry.accept(session.data)),
      );
      if (candidates.length === 0) return;
      const rects = candidates.map((entry) => ({
        entry,
        rect: entry.element.getBoundingClientRect(),
      }));
      let next: { entry: DroppableRegistration; rect: DOMRect } | undefined;
      if (direction === "up" || direction === "down") {
        const sorted = [...rects].sort((a, b) => a.rect.top - b.rect.top);
        const current = session.over?.id;
        const index = sorted.findIndex((item) => item.entry.id === current);
        const step = direction === "up" ? -1 : 1;
        next = sorted[Math.max(0, Math.min(sorted.length - 1, index + step))] ?? sorted[0];
      } else {
        const sorted = [...rects].sort((a, b) => a.rect.left - b.rect.left);
        const current = session.over?.id;
        const index = sorted.findIndex((item) => item.entry.id === current);
        const step = direction === "left" ? -1 : 1;
        next = sorted[Math.max(0, Math.min(sorted.length - 1, index + step))] ?? sorted[0];
      }
      if (!next) return;
      session.over = {
        data: next.entry.data,
        id: next.entry.id,
        placement: "before",
        rect: next.rect,
      };
      session.pointer = rectCenter(next.rect);
      active.value = { ...session };
      options.onDragOver?.(session);
      options.onDragMove?.(session);
    },
    drop() {
      const session = active.value;
      if (!session?.keyboard) return;
      dropEscape();
      active.value = null;
      if (session.over) options.onDragEnd?.(session, "drop");
      else options.onDragCancel?.(session);
    },
    cancel,
  };

  // Keyboard drags do not install pointer listeners, so they need their own
  // Escape/resize escape hatch. A window resize also cancels pointer drags
  // (see `pointerListeners.resize`), matching dnd-kit's sensors.
  const windowListeners = {
    resize: () => {
      if (active.value?.keyboard) cancel();
    },
  };
  if (typeof window !== "undefined") {
    window.addEventListener("resize", windowListeners.resize);
  }
  const onVisibility = () => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") cancel();
  };
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", onVisibility);
  }

  onBeforeUnmount(() => {
    cleanup(pointerListeners);
    dropEscape();
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", onVisibility);
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", windowListeners.resize);
    }
  });

  return {
    active,
    announce,
    cancel,
    droppables,
    draggables,
    keyboard,
    message,
    registerDraggable,
    registerDroppable,
    startPointer,
  };
}

export type DragEngine = ReturnType<typeof createDragEngine>;
