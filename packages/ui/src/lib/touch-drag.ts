import {
  MOUSE_DRAG_DISTANCE_PX,
  TOUCH_DRAG_DISTANCE_PX,
  TOUCH_DRAG_HOLD_MS,
  TOUCH_DRAG_TOLERANCE_PX,
} from "./drag-constants";

export {
  MOUSE_DRAG_DISTANCE_PX,
  TOUCH_DRAG_DISTANCE_PX,
  TOUCH_DRAG_HOLD_MS,
  TOUCH_DRAG_TOLERANCE_PX,
};

/**
 * Vue counterpart of the dnd-kit sensors in the React package. The Raft Vue
 * engine (`createDragEngine`) owns the pointer listeners, so these are plain
 * activation descriptors that `DragScope` feeds into the engine instead of
 * sensor instances.
 */
export type HoldThenMoveOptions = {
  /** How long a finger must rest before a drag is armed. */
  holdMs?: number;
  /** Movement beyond this before the hold fires is treated as a scroll. */
  tolerance?: number;
  /** Movement after the hold that starts the drag. */
  distance?: number;
};

export class MouseOnlyPointerSensor {
  readonly kind = "mouse" as const;

  constructor(readonly distance = MOUSE_DRAG_DISTANCE_PX) {}
}

export class HoldThenMoveTouchSensor {
  readonly kind = "touch" as const;

  constructor(readonly options: HoldThenMoveOptions = {}) {}

  get holdMs() {
    return this.options.holdMs ?? TOUCH_DRAG_HOLD_MS;
  }

  get tolerance() {
    return this.options.tolerance ?? TOUCH_DRAG_TOLERANCE_PX;
  }

  get distance() {
    return this.options.distance ?? TOUCH_DRAG_DISTANCE_PX;
  }
}

export function useMouseOnlyPointerSensor(distance = MOUSE_DRAG_DISTANCE_PX) {
  return new MouseOnlyPointerSensor(distance);
}

export function useHoldThenMoveTouchSensor(options: HoldThenMoveOptions = {}) {
  return new HoldThenMoveTouchSensor(options);
}
