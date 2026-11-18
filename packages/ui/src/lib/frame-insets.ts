import { computed, onMounted, ref, toValue, type MaybeRefOrGetter } from "vue";

/**
 * The parts of the screen a host shell keeps for itself: the window's own
 * controls on desktop, a foldable phone's system column. The shell publishes
 * them on its root element as `--raft-frame-inset-{top,start,end}`; on the web
 * they are unset, so every inset reads 0 and nothing moves.
 */
export interface FrameInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type CollisionBoundary =
  | "clipping-ancestors"
  | Element
  | Element[]
  | { x: number; y: number; width: number; height: number };

export interface FrameCollision {
  collisionPadding: CollisionPadding;
  collisionBoundary: CollisionBoundary | undefined;
}

export type CollisionPadding =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

export const NO_FRAME_INSETS: Readonly<FrameInsets> = Object.freeze({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

/** The room a popup, a menu or a toast keeps from an inset. */
export const POPUP_FRAME_GAP = 8;

const PX_LENGTH = /^-?(\d+\.?\d*|\.\d+)px$/;

function measure(element: HTMLElement, value: string, axis: "block" | "inline"): number {
  const previous = axis === "block" ? element.style.height : element.style.width;
  element.style[axis === "block" ? "height" : "width"] = value;
  const size = element.getBoundingClientRect()[axis === "block" ? "height" : "width"];
  element.style[axis === "block" ? "height" : "width"] = previous;
  return size;
}

/** Reads the insets once, as physical px, in the document's direction. */
export function readFrameInsets(): FrameInsets {
  if (typeof document === "undefined") return NO_FRAME_INSETS;
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const raw = {
    top: style.getPropertyValue("--raft-frame-inset-top"),
    start: style.getPropertyValue("--raft-frame-inset-start"),
    end: style.getPropertyValue("--raft-frame-inset-end"),
  };
  if (!raw.top.trim() && !raw.start.trim() && !raw.end.trim()) return NO_FRAME_INSETS;

  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none";
  root.append(probe);
  try {
    const px = (value: string, axis: "block" | "inline") => {
      const text = value.trim();
      if (!text) return 0;
      const size = PX_LENGTH.test(text) ? Number.parseFloat(text) : measure(probe, text, axis);
      return Number.isFinite(size) ? Math.max(0, size) : 0;
    };
    const top = px(raw.top, "block");
    const start = px(raw.start, "inline");
    const end = px(raw.end, "inline");
    const rtl = getComputedStyle(document.body ?? root).direction === "rtl";
    return { top, right: rtl ? start : end, bottom: 0, left: rtl ? end : start };
  } finally {
    probe.remove();
  }
}

/**
 * Adds the insets to collision padding: on each side with an inset, at least
 * the inset plus `gap`; elsewhere `padding` unchanged.
 */
export function frameCollisionPadding(
  padding: CollisionPadding,
  insets: FrameInsets,
  gap = POPUP_FRAME_GAP,
): CollisionPadding {
  const { top, right, bottom, left } = insets;
  if (!top && !right && !bottom && !left) return padding;
  const base =
    typeof padding === "number"
      ? { top: padding, right: padding, bottom: padding, left: padding }
      : padding;
  const side = (key: keyof FrameInsets) =>
    insets[key] > 0 ? Math.max(base[key] ?? 0, insets[key] + gap) : (base[key] ?? 0);
  return { top: side("top"), right: side("right"), bottom: side("bottom"), left: side("left") };
}

/**
 * The collision padding a popup should use: the caller's padding, widened on
 * any side the shell insets so the popup clears the shell's own controls.
 * Read once on mount — the shell does not change its insets mid-session.
 */
export function useFrameCollisionPadding(padding: MaybeRefOrGetter<CollisionPadding>) {
  const insets = ref<FrameInsets>(NO_FRAME_INSETS);
  onMounted(() => {
    insets.value = readFrameInsets();
  });
  return computed(() => frameCollisionPadding(toValue(padding), insets.value));
}

function hasInset(insets: FrameInsets) {
  return insets.top !== 0 || insets.right !== 0 || insets.bottom !== 0 || insets.left !== 0;
}

function portalsToBody(
  container?: Element | { host?: Element } | { current?: Element | null } | null,
): boolean {
  if (container && "current" in container) return false;
  const element = container && "host" in container ? container.host : container;
  return element == null || element === document.body || element === document.documentElement;
}

function visualViewportShift(): { x: number; y: number } {
  if (typeof window === "undefined" || !window.visualViewport) return { x: 0, y: 0 };
  return {
    x: window.visualViewport.offsetLeft,
    y: window.visualViewport.offsetTop,
  };
}

export function frameCollisionBoundary(insets: FrameInsets): CollisionBoundary {
  return {
    get x() {
      return insets.left + visualViewportShift().x;
    },
    get y() {
      return insets.top + visualViewportShift().y;
    },
    get width() {
      return Math.max(
        0,
        (typeof document === "undefined" ? 0 : document.documentElement.clientWidth) -
          insets.left -
          insets.right,
      );
    },
    get height() {
      return Math.max(
        0,
        (typeof document === "undefined" ? 0 : document.documentElement.clientHeight) -
          insets.top -
          insets.bottom,
      );
    },
  };
}

export function frameCollision(
  padding: CollisionPadding,
  boundary: CollisionBoundary | undefined,
  insets: FrameInsets,
  gap = POPUP_FRAME_GAP,
  container?: Element | { host?: Element } | { current?: Element | null } | null,
): FrameCollision {
  const padded = frameCollisionPadding(padding, insets, gap);
  if (!hasInset(insets) || boundary !== undefined || !portalsToBody(container)) {
    return { collisionPadding: padded, collisionBoundary: boundary };
  }
  const full =
    typeof padded === "number"
      ? { top: padded, right: padded, bottom: padded, left: padded }
      : padded;
  const side = (key: keyof FrameInsets) => Math.max(0, (full[key] ?? 0) - insets[key]);
  return {
    collisionPadding: {
      top: side("top"),
      right: side("right"),
      bottom: side("bottom"),
      left: side("left"),
    },
    collisionBoundary: frameCollisionBoundary(insets),
  };
}
