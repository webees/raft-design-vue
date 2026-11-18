import {
  onScopeDispose,
  shallowRef,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
} from "vue";

import { toElement } from "./dom";

/**
 * Tap activation: a navigation control switches when the finger lifts, not on
 * the click that follows. While a list is still momentum-scrolling the first
 * tap only stops it, so activating on click would need a second tap.
 */
export const TAP_SLOP_PX = 10;
export const TAP_MAX_MS = 500;

/** How long after a tap a click on the same control is the browser's echo of it. */
const ECHO_CLICK_MS = 800;

const DISABLED = ':disabled, [aria-disabled="true"], [data-disabled]';

type Gesture = { id: number; x: number; y: number; at: number; moved: boolean };

const NON_TEXT_INPUTS = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

function findTouch(list: TouchList | undefined, id: number): Touch | undefined {
  if (!list) return undefined;
  for (let index = 0; index < list.length; index++) {
    const touch = list[index];
    if (touch?.identifier === id) return touch;
  }
  return undefined;
}

export function isTextEntry(node: Element | null): boolean {
  if (!node) return false;
  if ((node as HTMLElement).isContentEditable || node.tagName === "TEXTAREA") return true;
  return node.tagName === "INPUT" && !NON_TEXT_INPUTS.has((node as HTMLInputElement).type);
}

const isStylus = (touch: Touch) =>
  (touch as Touch & { touchType?: string }).touchType === "stylus";

/** Make `element` activate on a tap's `touchend`. Does nothing outside a browser. */
export function attachTapActivation(element: HTMLElement): () => void {
  const view = element.ownerDocument?.defaultView;
  if (!view) return () => undefined;
  const now = () => view.performance?.now() ?? Date.now();

  let gesture: Gesture | null = null;
  let clicking = false;
  let swallowClickUntil = -Infinity;

  const onTouchStart = (event: TouchEvent) => {
    swallowClickUntil = -Infinity;
    const touch = event.touches.length === 1 ? event.changedTouches[0] : undefined;
    gesture =
      touch && !isStylus(touch)
        ? { id: touch.identifier, x: touch.clientX, y: touch.clientY, at: now(), moved: false }
        : null;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!gesture || gesture.moved) return;
    const touch = findTouch(event.touches, gesture.id);
    if (!touch) return;
    if (Math.hypot(touch.clientX - gesture.x, touch.clientY - gesture.y) > TAP_SLOP_PX) {
      gesture.moved = true;
    }
  };

  const onTouchCancel = () => {
    gesture = null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const started = gesture;
    gesture = null;
    if (!started || started.moved || event.touches.length > 0) return;
    const touch = findTouch(event.changedTouches, started.id);
    if (!touch) return;
    if (Math.hypot(touch.clientX - started.x, touch.clientY - started.y) > TAP_SLOP_PX) return;
    if (now() - started.at >= TAP_MAX_MS || !event.cancelable) return;
    if (element.matches(DISABLED)) return;
    const box = element.getBoundingClientRect();
    const inside =
      touch.clientX >= box.left &&
      touch.clientX <= box.right &&
      touch.clientY >= box.top &&
      touch.clientY <= box.bottom;
    if (!inside) return;

    event.preventDefault();
    swallowClickUntil = now() + ECHO_CLICK_MS;
    const focusedBefore = element.ownerDocument.activeElement;
    clicking = true;
    try {
      element.click();
    } finally {
      clicking = false;
    }
    const focusedAfter = element.ownerDocument.activeElement;
    if (focusedAfter === focusedBefore && !isTextEntry(focusedAfter)) {
      element.focus({ preventScroll: true });
    }
  };

  const endEchoWindow = () => {
    swallowClickUntil = -Infinity;
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "touch") endEchoWindow();
  };
  const onClick = (event: MouseEvent) => {
    if (clicking || now() > swallowClickUntil) return;
    swallowClickUntil = -Infinity;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  const passive = { passive: true } as const;
  element.addEventListener("touchstart", onTouchStart, passive);
  element.addEventListener("touchmove", onTouchMove, passive);
  element.addEventListener("touchcancel", onTouchCancel, passive);
  element.addEventListener("pointerdown", onPointerDown, passive);
  element.addEventListener("keydown", endEchoWindow, passive);
  element.addEventListener("touchend", onTouchEnd, { passive: false });
  element.addEventListener("click", onClick, { capture: true });
  return () => {
    element.removeEventListener("touchstart", onTouchStart);
    element.removeEventListener("touchmove", onTouchMove);
    element.removeEventListener("touchcancel", onTouchCancel);
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("keydown", endEchoWindow);
    element.removeEventListener("touchend", onTouchEnd);
    element.removeEventListener("click", onClick, { capture: true });
  };
}

/**
 * Template-ref callback that gives the element it is set to tap activation.
 * Pass it to `ref` on the control (native or component root).
 */
export function useTapActivation(enabled: MaybeRefOrGetter<boolean> = true) {
  const target = shallowRef<unknown>(null);
  let detach: (() => void) | null = null;

  watchEffect(() => {
    detach?.();
    detach = null;
    const node = toElement(target.value);
    if (node && toValue(enabled)) detach = attachTapActivation(node);
  });
  onScopeDispose(() => detach?.());

  return (node: unknown) => {
    target.value = node;
  };
}
