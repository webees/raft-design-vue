import { TOUCH_DRAG_HOLD_MS, TOUCH_DRAG_TOLERANCE_PX } from "../../lib/touch-drag";

export const PULL_TO_REFRESH_THRESHOLD = 100;
export const PULL_TO_REFRESH_MAX_DISTANCE = 140;
export const PULL_TO_REFRESH_HOLD_DISTANCE = 60;
export const PULL_TO_REFRESH_DAMPING = 0.55;
export const PULL_TO_REFRESH_SNAP_BACK_MS = 300;
export const PULL_TO_REFRESH_SLOP = 6;
export const PULL_TO_REFRESH_LONG_PRESS_MS = TOUCH_DRAG_HOLD_MS;
export const PULL_TO_REFRESH_TOLERANCE = TOUCH_DRAG_TOLERANCE_PX;

export const PULL_TO_REFRESH_IGNORE_SELECTOR = [
  "input",
  "textarea",
  "select",
  '[contenteditable=""]',
  '[contenteditable="true"]',
  '[contenteditable="plaintext-only"]',
  "[data-pull-to-refresh-ignore]",
].join(", ");

export type PullToRefreshState = "idle" | "pulling" | "refreshing";

export type PullGestureConfig = {
  threshold: number;
  maxDistance: number;
  holdDistance: number;
  latch: boolean;
};

export const DEFAULT_PULL_GESTURE_CONFIG: PullGestureConfig = {
  threshold: PULL_TO_REFRESH_THRESHOLD,
  maxDistance: PULL_TO_REFRESH_MAX_DISTANCE,
  holdDistance: PULL_TO_REFRESH_HOLD_DISTANCE,
  latch: true,
};

export type PullGesture = {
  phase: "idle" | "tracking" | "pulling" | "refreshing";
  startX: number;
  startY: number;
  distance: number;
  armed: boolean;
};

export const IDLE_PULL_GESTURE: PullGesture = {
  phase: "idle",
  startX: 0,
  startY: 0,
  distance: 0,
  armed: false,
};

export type PullGestureEvent =
  | { type: "start"; x: number; y: number; fingers: number; atTop: boolean; ignored: boolean }
  | { type: "move"; x: number; y: number; fingers: number; atTop: boolean }
  | { type: "hold" }
  | { type: "end" }
  | { type: "cancel" }
  | { type: "settle" };

export type PullGestureStep = {
  gesture: PullGesture;
  preventDefault: boolean;
  refresh: boolean;
  armed: boolean;
};

export function pullDistance(
  delta: number,
  maxDistance = PULL_TO_REFRESH_MAX_DISTANCE,
): number {
  if (delta <= 0) return 0;
  return Math.min(maxDistance, delta * PULL_TO_REFRESH_DAMPING);
}

export function pullProgress(
  distance: number,
  threshold = PULL_TO_REFRESH_THRESHOLD,
): number {
  if (threshold <= 0) return 1;
  return Math.min(1, Math.max(0, distance / threshold));
}

export function pullStep(progress: number): 0 | 1 | 2 | 3 {
  return Math.min(3, Math.floor(Math.max(0, progress) * 4)) as 0 | 1 | 2 | 3;
}

export function pullState(gesture: PullGesture): PullToRefreshState {
  if (gesture.phase === "refreshing") return "refreshing";
  if (gesture.phase !== "pulling") return "idle";
  return gesture.distance > 0 || gesture.armed ? "pulling" : "idle";
}

function step(
  gesture: PullGesture,
  preventDefault = false,
  refresh = false,
  armed = false,
): PullGestureStep {
  return { gesture, preventDefault, refresh, armed };
}

export function stepPullGesture(
  gesture: PullGesture,
  event: PullGestureEvent,
  config: PullGestureConfig = DEFAULT_PULL_GESTURE_CONFIG,
): PullGestureStep {
  if (gesture.phase === "refreshing") {
    return step(event.type === "settle" ? IDLE_PULL_GESTURE : gesture);
  }

  switch (event.type) {
    case "start":
      if (event.fingers !== 1 || !event.atTop || event.ignored) {
        return step(IDLE_PULL_GESTURE);
      }
      return step({
        ...IDLE_PULL_GESTURE,
        phase: "tracking",
        startX: event.x,
        startY: event.y,
      });

    case "move": {
      if (gesture.phase === "idle") return step(gesture);
      if (event.fingers !== 1) return step(IDLE_PULL_GESTURE);
      if (!event.atTop && !gesture.armed) return step(IDLE_PULL_GESTURE);
      const dx = event.x - gesture.startX;
      const dy = event.y - gesture.startY;
      if (gesture.phase === "tracking") {
        if (Math.abs(dx) > PULL_TO_REFRESH_TOLERANCE && Math.abs(dx) > dy) {
          return step(IDLE_PULL_GESTURE);
        }
        if (dy < -PULL_TO_REFRESH_SLOP) return step(IDLE_PULL_GESTURE);
        if (dy <= PULL_TO_REFRESH_SLOP) return step(gesture);
      }
      const distance = pullDistance(dy, config.maxDistance);
      const armed = (config.latch && gesture.armed) || distance >= config.threshold;
      return step(
        { ...gesture, phase: "pulling", distance, armed },
        armed || dy > PULL_TO_REFRESH_SLOP,
        false,
        armed && !gesture.armed,
      );
    }

    case "hold":
      return step(gesture.phase === "tracking" ? IDLE_PULL_GESTURE : gesture);

    case "end":
      if (gesture.phase === "pulling" && gesture.armed) {
        return step(
          { ...gesture, phase: "refreshing", distance: config.holdDistance },
          false,
          true,
        );
      }
      return step(IDLE_PULL_GESTURE);

    case "cancel":
    case "settle":
      return step(IDLE_PULL_GESTURE);
  }
}
