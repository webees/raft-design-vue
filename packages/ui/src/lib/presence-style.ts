import {
  onBeforeUnmount,
  toValue,
  watch,
  type ComponentPublicInstance,
  type MaybeRefOrGetter,
} from "vue";

/**
 * Base UI marks an entering element `data-starting-style` for one frame and a
 * leaving one `data-ending-style` until its transition finishes. Reka only
 * sets `data-state`, so the upstream recipes (kept 1:1 here) would never paint
 * their enter/leave classes.
 *
 * This recreates that contract for transition-driven surfaces:
 * - open: `data-starting-style` for two frames, then removed so the base
 *   classes transition in;
 * - close: `data-ending-style` plus an inert animation whose duration matches
 *   the element's longest exit transition. Reka's `Presence` unmounts the
 *   moment `animation-name` is `none`, so the animation is what buys the exit.
 */

const TIME = /([\d.]+)(m?s)/i;

function toMilliseconds(value: string): number {
  const match = TIME.exec(value.trim());
  if (!match) return 0;
  const amount = Number.parseFloat(match[1]!);
  return match[2]!.toLowerCase() === "s" ? amount * 1000 : amount;
}

function transitionLength(node: Element): number {
  const style = getComputedStyle(node);
  const durations = style.transitionDuration.split(",").map(toMilliseconds);
  const delays = style.transitionDelay.split(",").map(toMilliseconds);
  return durations.reduce(
    (longest, duration, index) =>
      Math.max(longest, duration + (delays[index % delays.length] ?? 0)),
    0,
  );
}

function resolveElement(
  target: Element | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
  const element = "nodeType" in (target ?? {}) ? target : (target as { $el?: unknown })?.$el;
  return element instanceof HTMLElement ? element : null;
}

export function usePresenceStyle(
  open: MaybeRefOrGetter<boolean>,
  target: MaybeRefOrGetter<Element | ComponentPublicInstance | null | undefined>,
  fallbackMs = 400,
): void {
  let node: HTMLElement | null = null;
  let frame = 0;
  let timer = 0;
  let onEnd: ((event: AnimationEvent) => void) | null = null;
  let previous: boolean | undefined;

  const reset = () => {
    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);
    frame = 0;
    timer = 0;
    if (node && onEnd) node.removeEventListener("animationend", onEnd);
    onEnd = null;
    node?.removeAttribute("data-ending-style");
    node?.style.removeProperty("--raft-presence-exit");
  };

  const enter = () => {
    if (!node) return;
    node.setAttribute("data-starting-style", "");
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        frame = 0;
        node?.removeAttribute("data-starting-style");
      });
    });
  };

  const leave = () => {
    if (!node) return;
    node.setAttribute("data-ending-style", "");
    const length = transitionLength(node);
    node.style.setProperty("--raft-presence-exit", `${Math.max(length, 1)}ms`);
    onEnd = (event) => {
      if (event.target === node) reset();
    };
    node.addEventListener("animationend", onEnd);
    timer = window.setTimeout(reset, Math.max(length, fallbackMs) + 64);
  };

  watch(
    [() => toValue(open), () => resolveElement(toValue(target))] as const,
    ([isOpen, element], [, previousElement]) => {
      if (element !== node || element !== previousElement) reset();
      node = element;
      if (!node) {
        previous = isOpen;
        return;
      }
      node.setAttribute("data-presence", "");
      if (isOpen) {
        reset();
        enter();
      } else if (previous === true) {
        leave();
      } else {
        reset();
      }
      previous = isOpen;
    },
    { immediate: true, flush: "post" },
  );

  onBeforeUnmount(reset);
}
