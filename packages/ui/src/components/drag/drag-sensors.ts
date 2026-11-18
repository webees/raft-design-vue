import {
  HoldThenMoveTouchSensor,
  MouseOnlyPointerSensor,
  useHoldThenMoveTouchSensor,
  useMouseOnlyPointerSensor,
  type HoldThenMoveOptions,
} from "../../lib/touch-drag";
import { MOUSE_DRAG_DISTANCE_PX } from "../../lib/drag-constants";

export {
  DRAG_AUTO_SCROLL_ZONE_PX,
  DRAG_KEYBOARD_CODES,
  MOUSE_DRAG_DISTANCE_PX,
  TOUCH_DRAG_DISTANCE_PX,
  TOUCH_DRAG_HOLD_MS,
  TOUCH_DRAG_TOLERANCE_PX,
} from "../../lib/drag-constants";
export {
  HoldThenMoveTouchSensor,
  MouseOnlyPointerSensor,
  useHoldThenMoveTouchSensor,
  useMouseOnlyPointerSensor,
};
export type { HoldThenMoveOptions };

export type DragKeyboardDirection = "up" | "down" | "left" | "right";

export type DragKeyboardCandidate = {
  id: string | number;
  rect: { left: number; top: number; width: number; height: number };
};

function center(rect: DragKeyboardCandidate["rect"]) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function listKeyboardCoordinates(
  current: DragKeyboardCandidate | null,
  candidates: readonly DragKeyboardCandidate[],
  direction: DragKeyboardDirection,
): DragKeyboardCandidate | null {
  if (candidates.length === 0) return null;
  if (!current) return candidates[0] ?? null;
  const from = center(current.rect);
  let best: { candidate: DragKeyboardCandidate; score: number } | null = null;
  for (const candidate of candidates) {
    if (candidate.id === current.id) continue;
    const to = center(candidate.rect);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const forward =
      direction === "down" ? dy > 0 : direction === "up" ? dy < 0 : direction === "right" ? dx > 0 : dx < 0;
    if (!forward) continue;
    const primary = direction === "down" || direction === "up" ? Math.abs(dy) : Math.abs(dx);
    const secondary = direction === "down" || direction === "up" ? Math.abs(dx) : Math.abs(dy);
    const score = primary + secondary * 2;
    if (!best || score < best.score) best = { candidate, score };
  }
  return best?.candidate ?? null;
}

export type DragKeyboardCoordinateGetter = typeof listKeyboardCoordinates;

export type DragSensorsOptions = {
  /** How the arrow keys move a lifted item. Defaults to `listKeyboardCoordinates`. */
  coordinateGetter?: DragKeyboardCoordinateGetter;
  /** Leave the keyboard out, for a surface whose keyboard path is a button. */
  keyboard?: boolean;
  /** The touch hold, distance and tolerance; the defaults are the system's. */
  touch?: HoldThenMoveOptions;
};

export type DragSensors = {
  mouse: MouseOnlyPointerSensor;
  touch: HoldThenMoveTouchSensor;
  keyboard: boolean;
  coordinateGetter: DragKeyboardCoordinateGetter;
};

/**
 * The Vue counterpart of the React package's single sensor set:
 * a mouse or pen after 6px, a finger after a 500ms hold plus 10px, and the
 * keyboard on Space/arrows/Escape. Render `<DragScope :sensors="sensors">`
 * so the engine uses these thresholds.
 */
export function useDragSensors(options: DragSensorsOptions | DragKeyboardCoordinateGetter = {}): DragSensors {
  const normalized = typeof options === "function" ? { coordinateGetter: options } : options;
  return {
    mouse: useMouseOnlyPointerSensor(MOUSE_DRAG_DISTANCE_PX),
    touch: useHoldThenMoveTouchSensor(normalized.touch ?? {}),
    keyboard: normalized.keyboard ?? true,
    coordinateGetter: normalized.coordinateGetter ?? listKeyboardCoordinates,
  };
}

/** Flattens a sensor set into the activation thresholds of `createDragEngine`. */
export function dragSensorsActivation(sensors: DragSensors) {
  return {
    mouseDistance: sensors.mouse.distance,
    touchHoldMs: sensors.touch.holdMs,
    touchTolerance: sensors.touch.tolerance,
    touchDistance: sensors.touch.distance,
  };
}

export type DragCollisionHit = { id: string | number };

export type DragCollisionDetection = (args: {
  active: { id: string | number };
}) => readonly DragCollisionHit[];

export type DragAcrossLists = {
  /** The caller's collision detection, holding the item over itself right after it moves list. */
  collisionDetection: DragCollisionDetection;
  /** Pass to `useDragSensors({ coordinateGetter })`. */
  coordinateGetter: DragKeyboardCoordinateGetter;
  /**
   * Call when the item has just been moved into another list. By keyboard it
   * then stays over itself until the next arrow; by pointer, for one frame.
   */
  moved: (viaKeyboard: boolean) => void;
  /** Call when the drag ends or is cancelled. */
  reset: () => void;
  /** The wrapped detection has put the item over itself. */
  isOverSelf: () => boolean;
};

/**
 * The keyboard fix for an item that moves between lists while it is dragged.
 * Without it, the place the item was put next to stays under it, so the next
 * arrow skips a place. The Vue engine resolves the drop target itself; this
 * tracker mirrors the upstream contract for consumers that drive a custom
 * collision detection through `DragScope`.
 */
export function useDragAcrossLists(collisionDetection: DragCollisionDetection = () => []): DragAcrossLists {
  let overSelf = false;
  let frame = 0;

  const reset = () => {
    overSelf = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  return {
    collisionDetection: (args) => {
      const hits = collisionDetection(args);
      overSelf = hits.some((hit) => String(hit.id) === String(args.active.id));
      return hits;
    },
    coordinateGetter: listKeyboardCoordinates,
    moved: (viaKeyboard) => {
      overSelf = true;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (!viaKeyboard && typeof requestAnimationFrame === "function") frame = requestAnimationFrame(reset);
    },
    reset,
    isOverSelf: () => overSelf,
  };
}
