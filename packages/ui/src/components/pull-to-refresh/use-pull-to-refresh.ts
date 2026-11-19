import {
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

import {
  DEFAULT_PULL_GESTURE_CONFIG,
  IDLE_PULL_GESTURE,
  PULL_TO_REFRESH_IGNORE_SELECTOR,
  PULL_TO_REFRESH_LONG_PRESS_MS,
  pullProgress,
  pullState,
  stepPullGesture,
  type PullGesture,
  type PullGestureEvent,
  type PullToRefreshState,
} from "./pull-to-refresh-gesture";

export const PULL_TO_REFRESH_POINTER_QUERY = "(pointer: coarse)";

export type PullToRefreshPlatform = "default" | "android";

export function detectPullToRefreshPlatform(): PullToRefreshPlatform {
  if (typeof navigator === "undefined") return "default";
  const hints = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  if (hints?.platform) return hints.platform === "Android" ? "android" : "default";
  return /\bAndroid\b/i.test(navigator.userAgent) ? "android" : "default";
}

const PULL_TO_REFRESH_HAPTIC_MS = 10;

function hapticTick() {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(PULL_TO_REFRESH_HAPTIC_MS);
  }
}

export type UsePullToRefreshOptions = {
  onRefresh: () => Promise<unknown>;
  disabled?: MaybeRefOrGetter<boolean>;
  threshold?: number;
  maxDistance?: number;
  holdDistance?: number;
  platform?: PullToRefreshPlatform;
};

export type PullToRefresh = {
  state: PullToRefreshState;
  distance: number;
  progress: number;
  platform: PullToRefreshPlatform;
};

function ignoredTarget(target: EventTarget | null) {
  return target instanceof Element && target.closest(PULL_TO_REFRESH_IGNORE_SELECTOR) !== null;
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(PULL_TO_REFRESH_POINTER_QUERY).matches
  );
}

export function usePullToRefresh(
  scrollRef: Ref<HTMLElement | null>,
  options: UsePullToRefreshOptions,
): Ref<PullToRefresh> {
  const gesture = ref<PullGesture>({ ...IDLE_PULL_GESTURE });
  const result = ref<PullToRefresh>({
    state: "idle",
    distance: 0,
    progress: 0,
    platform: options.platform ?? detectPullToRefreshPlatform(),
  });
  const coarse = ref(isCoarsePointer());
  let cleanup: (() => void) | null = null;
  let detachMedia: (() => void) | null = null;

  function syncResult() {
    const state = pullState(gesture.value);
    const distance = state === "idle" ? 0 : gesture.value.distance;
    result.value = {
      state,
      distance,
      progress:
        state === "refreshing" || gesture.value.armed
          ? 1
          : pullProgress(distance, options.threshold),
      platform: options.platform ?? detectPullToRefreshPlatform(),
    };
  }

  function attach() {
    cleanup?.();
    cleanup = null;
    const element = scrollRef.value;
    const platform = options.platform ?? detectPullToRefreshPlatform();
    if (!element || !coarse.value || toValue(options.disabled ?? false)) return;

    const config = {
      threshold: options.threshold ?? DEFAULT_PULL_GESTURE_CONFIG.threshold,
      maxDistance: options.maxDistance ?? DEFAULT_PULL_GESTURE_CONFIG.maxDistance,
      holdDistance: options.holdDistance ?? DEFAULT_PULL_GESTURE_CONFIG.holdDistance,
      latch: platform !== "android",
    };
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let live = true;

    const dispatch = (event: PullGestureEvent, native?: Event) => {
      const next = stepPullGesture(gesture.value, event, config);
      if (next.preventDefault && native?.cancelable) native.preventDefault();
      if (next.gesture !== gesture.value) {
        gesture.value = next.gesture;
        syncResult();
      }
      if (next.gesture.phase !== "tracking") clearTimeout(holdTimer);
      if (next.armed && platform === "android") hapticTick();
      if (next.refresh) {
        const settle = () => {
          if (live) dispatch({ type: "settle" });
        };
        let pending: Promise<unknown>;
        try {
          pending = Promise.resolve(options.onRefresh());
        } catch (error) {
          pending = Promise.reject(error);
        }
        void pending.then(settle, settle);
      }
    };

    const atTop = () => element.scrollTop <= 0;
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      dispatch({
        type: "start",
        x: touch?.clientX ?? 0,
        y: touch?.clientY ?? 0,
        fingers: event.touches.length,
        atTop: atTop(),
        ignored: ignoredTarget(event.target),
      });
      if (gesture.value.phase === "tracking") {
        clearTimeout(holdTimer);
        holdTimer = setTimeout(() => dispatch({ type: "hold" }), PULL_TO_REFRESH_LONG_PRESS_MS);
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.defaultPrevented && gesture.value.phase === "tracking") {
        dispatch({ type: "cancel" });
        return;
      }
      const touch = event.touches[0];
      dispatch(
        {
          type: "move",
          x: touch?.clientX ?? 0,
          y: touch?.clientY ?? 0,
          fingers: event.touches.length,
          atTop: atTop(),
        },
        event,
      );
    };
    const onTouchEnd = () => dispatch({ type: "end" });
    const onCancel = () => dispatch({ type: "cancel" });

    const previousOverscroll = element.style.overscrollBehaviorY;
    element.style.overscrollBehaviorY = "contain";
    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchmove", onTouchMove, { passive: false });
    element.addEventListener("touchend", onTouchEnd, { passive: true });
    element.addEventListener("touchcancel", onCancel, { passive: true });
    element.addEventListener("contextmenu", onCancel);
    element.addEventListener("dragstart", onCancel);

    cleanup = () => {
      live = false;
      clearTimeout(holdTimer);
      element.style.overscrollBehaviorY = previousOverscroll;
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
      element.removeEventListener("touchcancel", onCancel);
      element.removeEventListener("contextmenu", onCancel);
      element.removeEventListener("dragstart", onCancel);
      gesture.value = { ...IDLE_PULL_GESTURE };
      syncResult();
    };
  }

  onMounted(attach);
  onMounted(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(PULL_TO_REFRESH_POINTER_QUERY);
    const onChange = () => {
      coarse.value = media.matches;
    };
    media.addEventListener("change", onChange);
    detachMedia = () => media.removeEventListener("change", onChange);
  });
  watch(() => [scrollRef.value, coarse.value, toValue(options.disabled ?? false)], attach);
  onBeforeUnmount(() => {
    detachMedia?.();
    cleanup?.();
  });
  return result;
}
