import {
  computed,
  ref,
  toValue,
  type ComponentPublicInstance,
  type ComputedRef,
  type MaybeRefOrGetter,
} from "vue";

import {
  sheetPopupBoundary,
  usePopupSheet,
  visualViewportShift,
  type PopupAnchor,
} from "./popup-boundary";

/**
 * The parts of the screen a host shell keeps for itself: the window's own
 * controls on desktop, a foldable phone's system column. The shell publishes
 * them on its root element as `--raft-frame-inset-top`, `-start` and `-end`;
 * the web sets none, so they read 0.
 */
export interface FrameInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** The raw values of the three variables, as the root element computes them. */
export interface FrameInsetValues {
  top: string;
  start: string;
  end: string;
}

/** A positioner's collision padding: one number, or one per side. */
export type CollisionPadding =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

/** A collision boundary as a rect in window coordinates, or the elements to clip to. */
export type CollisionBoundary =
  | "clipping-ancestors"
  | Element
  | Element[]
  | { x: number; y: number; width: number; height: number };

/** Where a popup is portaled, whose direction and insets apply. */
export type FrameInsetsContainer =
  | Element
  | ShadowRoot
  | string
  | { readonly current: Element | ShadowRoot | null | undefined }
  | null
  | undefined;

/** Measures a CSS length that isn't plain px, along the axis it reserves. */
export type MeasureFrameInset = (value: string, axis: "block" | "inline") => number;

export const NO_FRAME_INSETS: Readonly<FrameInsets> = Object.freeze({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

/** Base UI's own collision padding, used where a component sets none. */
export const BASE_COLLISION_PADDING = 5;

/** The room a popover, a menu or a toast keeps from an inset. */
const POPUP_FRAME_GAP = 8;

const PX_LENGTH = /^-?(\d+\.?\d*|\.\d+)px$/;

/**
 * Turns the variables' values into physical px insets. An unset value is 0, a
 * px value is read as written, and any other CSS length (a calc() is kept as
 * written in the computed value of an unregistered custom property) is
 * measured. In left to right -start is the left side and -end the right; in
 * right to left they swap.
 */
export function frameInsetsFrom(
  values: FrameInsetValues,
  rtl: boolean,
  measure: MeasureFrameInset,
): FrameInsets {
  const read = (raw: string, axis: "block" | "inline") => {
    const value = raw.trim();
    if (!value) return 0;
    const px = PX_LENGTH.test(value) ? Number.parseFloat(value) : measure(value, axis);
    return Number.isFinite(px) ? Math.max(0, px) : 0;
  };
  const top = read(values.top, "block");
  const start = read(values.start, "inline");
  const end = read(values.end, "inline");
  if (!top && !start && !end) return NO_FRAME_INSETS;
  return { top, right: rtl ? start : end, bottom: 0, left: rtl ? end : start };
}

function resolveContainer(container: FrameInsetsContainer): Element | ShadowRoot | null {
  if (typeof container === "string") return document.querySelector(container);
  if (container && typeof container !== "string" && "current" in container) {
    return container.current ?? null;
  }
  const node = container as Element | ShadowRoot | null | undefined;
  return node ?? null;
}

function contextElement(container: FrameInsetsContainer): Element {
  const node = resolveContainer(container);
  if (node instanceof Element) return node;
  if (node && "host" in node && node.host instanceof Element) return node.host;
  return document.body ?? document.documentElement;
}

/** The computed direction, inherited from the nearest ancestor that sets one. */
function directionOf(element: Element): "rtl" | "ltr" {
  for (let node: Element | null = element; node; node = node.parentElement) {
    const direction = getComputedStyle(node).direction;
    if (direction) return direction === "rtl" ? "rtl" : "ltr";
  }
  return "ltr";
}

function measureWithProbe(root: Element): MeasureFrameInset & { done(): void } {
  let probe: HTMLDivElement | null = null;
  const measure = (value: string, axis: "block" | "inline") => {
    if (!probe) {
      probe = document.createElement("div");
      probe.style.cssText =
        "position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none";
      root.append(probe);
    }
    probe.style.width = "0";
    probe.style.height = "0";
    probe.style.setProperty(axis === "block" ? "height" : "width", value);
    const box = probe.getBoundingClientRect();
    return axis === "block" ? box.height : box.width;
  };
  return Object.assign(measure, { done: () => probe?.remove() });
}

/**
 * Reads the frame insets once, as physical px. The direction is the one the
 * popup renders in: the computed `direction` of its portal container (the
 * body by default), so `dir="rtl"` on that container swaps -start and -end.
 */
export function readFrameInsets(container?: FrameInsetsContainer): FrameInsets {
  if (typeof document === "undefined") return NO_FRAME_INSETS;
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const values = {
    top: style.getPropertyValue("--raft-frame-inset-top"),
    start: style.getPropertyValue("--raft-frame-inset-start"),
    end: style.getPropertyValue("--raft-frame-inset-end"),
  };
  if (!values.top.trim() && !values.start.trim() && !values.end.trim()) {
    return NO_FRAME_INSETS;
  }
  const rtl = directionOf(contextElement(container)) === "rtl";
  const measure = measureWithProbe(root);
  try {
    return frameInsetsFrom(values, rtl, measure);
  } finally {
    measure.done();
  }
}

/**
 * The collision padding with the insets added: on each side with an inset, at
 * least the inset plus `gap`; elsewhere `padding` as it is. With no inset the
 * padding comes back unchanged, so nothing moves on the web.
 */
export function frameCollisionPadding(
  padding: CollisionPadding,
  insets: FrameInsets,
  gap: number = POPUP_FRAME_GAP,
): CollisionPadding {
  if (!hasInset(insets)) return padding;
  const base =
    typeof padding === "number"
      ? { top: padding, right: padding, bottom: padding, left: padding }
      : padding;
  const side = (key: keyof FrameInsets) =>
    insets[key] > 0 ? Math.max(base[key] ?? 0, insets[key] + gap) : (base[key] ?? 0);
  return { top: side("top"), right: side("right"), bottom: side("bottom"), left: side("left") };
}

function hasInset(insets: FrameInsets) {
  return insets.top !== 0 || insets.right !== 0 || insets.bottom !== 0 || insets.left !== 0;
}

/**
 * Whether a popup's portal container is the document's own: none, the body or
 * the root. A ref counts as a container of its own whatever it holds now: the
 * caller memoizes on the ref, so a first render's empty ref would pin a popup
 * to the body for good.
 */
function portalsToBody(container: FrameInsetsContainer): boolean {
  if (container && typeof container !== "string" && "current" in container) return false;
  const node = resolveContainer(container);
  const element = node && "host" in node ? node.host : node;
  return element == null || element === document.body || element === document.documentElement;
}

/**
 * The window inset by the frame insets, as a collision boundary rect. Its
 * fields are read each time the positioner places the popup (floating-ui
 * copies them), so it follows the window when it resizes while the popup is
 * open, and WebKit's visual viewport when it pans.
 */
function frameCollisionBoundary(insets: FrameInsets): CollisionBoundary {
  const root = () => document.documentElement;
  return {
    get x() {
      return insets.left + visualViewportShift().x;
    },
    get y() {
      return insets.top + visualViewportShift().y;
    },
    get width() {
      return Math.max(0, root().clientWidth - insets.left - insets.right);
    },
    get height() {
      return Math.max(0, root().clientHeight - insets.top - insets.bottom);
    },
  };
}

export interface FrameCollision {
  collisionPadding: CollisionPadding;
  collisionBoundary: CollisionBoundary | undefined;
}

/**
 * The insets go into the padding, unless the popup is portaled to the body:
 * there they go into the boundary, so the padding stays the popup's own. An
 * explicit padding or boundary the caller passes wins.
 */
export function frameCollision(
  padding: CollisionPadding,
  boundary: CollisionBoundary | undefined,
  insets: FrameInsets,
  gap: number = POPUP_FRAME_GAP,
  container?: FrameInsetsContainer,
): FrameCollision {
  const padded = frameCollisionPadding(padding, insets, gap);
  if (
    !hasInset(insets) ||
    boundary !== undefined ||
    typeof document === "undefined" ||
    !portalsToBody(container)
  ) {
    return { collisionPadding: padded, collisionBoundary: boundary };
  }
  const full = padded as Required<Exclude<CollisionPadding, number>>;
  const side = (key: keyof FrameInsets) => Math.max(0, full[key] - insets[key]);
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

/**
 * A popup's collision padding and boundary (a tooltip, a popover, a menu, a
 * select or combobox list, a preview card): `defaultPadding` where there is no
 * inset, and `gap` inside each inset. A `collisionPadding` the caller passes
 * wins as it is; an explicit `collisionBoundary` replaces the sheet's. Call it
 * from a part inside the popup's portal, which mounts each time it opens.
 */
export interface PopupCollision {
  collisionPadding: ComputedRef<CollisionPadding>;
  collisionBoundary: ComputedRef<PopupCollisionBoundary | undefined>;
  /** Bind to the positioner, so a sheet's boundary can find the popup's anchor. */
  ref: PositionerRef;
}

/** A template ref on a positioner: an element, or a component wrapping one. */
export type PositionerRef = (value: Element | ComponentPublicInstance | null) => void;

/** The boundary a positioner prop accepts; the frame and sheet rects are internal. */
export type PopupCollisionBoundary = Element | Element[];

export type PopupSide = "top" | "right" | "bottom" | "left";
export type PopupAlign = "start" | "center" | "end";

/** Props shared by every popup positioner: where it goes and how it avoids the frame. */
export interface PopupPositionerProps {
  side?: PopupSide;
  sideOffset?: number;
  align?: PopupAlign;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionPadding?: CollisionPadding;
  collisionBoundary?: PopupCollisionBoundary;
  container?: string | HTMLElement | null;
  anchor?: Element | null;
}

/** Reads the element a template ref points at, whether it is an element or a component. */
export function elementOf(value: Element | ComponentPublicInstance | null): Element | null {
  if (value instanceof Element) return value;
  const element = (value as ComponentPublicInstance | null)?.$el;
  return element instanceof Element ? element : null;
}

export function usePopupCollision(
  collisionPadding: MaybeRefOrGetter<CollisionPadding | undefined> | undefined,
  collisionBoundary: MaybeRefOrGetter<PopupCollisionBoundary | undefined>,
  defaultPadding: MaybeRefOrGetter<CollisionPadding>,
  container?: MaybeRefOrGetter<FrameInsetsContainer>,
  gap: number = POPUP_FRAME_GAP,
  anchor?: MaybeRefOrGetter<PopupAnchor | undefined>,
): PopupCollision {
  const insets = readFrameInsets(toValue(container));
  const sheet = usePopupSheet();
  const positioner = ref<Element | null>(null);
  const setPositioner = (value: Element | ComponentPublicInstance | null) => {
    positioner.value = elementOf(value);
  };

  const sheetBoundary = computed(() => {
    if (!sheet || toValue(collisionBoundary) !== undefined) return undefined;
    return sheetPopupBoundary(
      sheet,
      () => positioner.value,
      () => toValue(anchor),
    );
  });

  const collision = computed(() => {
    const explicit = toValue(collisionPadding);
    const boundary = (toValue(collisionBoundary) ?? sheetBoundary.value ?? undefined) as
      | CollisionBoundary
      | undefined;
    return explicit === undefined
      ? frameCollision(toValue(defaultPadding), boundary, insets, gap, toValue(container))
      : { collisionPadding: explicit, collisionBoundary: boundary };
  });

  return {
    collisionPadding: computed(() => collision.value.collisionPadding),
    collisionBoundary: computed(
      () => collision.value.collisionBoundary as PopupCollisionBoundary | undefined,
    ),
    ref: setPositioner,
  };
}

/** The placement and collision values a positioner template spreads. */
export interface PopupBindings
  extends Pick<
    PopupPositionerProps,
    "side" | "sideOffset" | "align" | "alignOffset" | "avoidCollisions"
  > {
  collisionPadding: CollisionPadding;
  collisionBoundary: PopupCollisionBoundary | undefined;
}

/** Overrides for {@link useContentCollision}; everything defaults to the props. */
export interface ContentCollisionOptions {
  padding?: MaybeRefOrGetter<CollisionPadding | undefined>;
  container?: MaybeRefOrGetter<FrameInsetsContainer>;
  defaultPadding?: MaybeRefOrGetter<CollisionPadding>;
  gap?: number;
  anchor?: MaybeRefOrGetter<PopupAnchor>;
}

/**
 * `usePopupCollision` for a positioner whose collision props arrive as props:
 * the wiring lives here instead of in every content component. `bindings`
 * holds the placement and collision values a template spreads on the positioner.
 */
export const useContentCollision = (
  props: PopupPositionerProps,
  {
    padding = () => props.collisionPadding,
    container = () => props.container,
    defaultPadding = BASE_COLLISION_PADDING,
    gap,
    anchor = () => props.anchor,
  }: ContentCollisionOptions = {},
): PopupCollision & { bindings: ComputedRef<PopupBindings> } => {
  const collision = usePopupCollision(
    padding,
    () => props.collisionBoundary,
    defaultPadding,
    container,
    gap,
    anchor,
  );
  return {
    ...collision,
    bindings: computed(() => ({
      side: props.side,
      sideOffset: props.sideOffset,
      align: props.align,
      alignOffset: props.alignOffset,
      avoidCollisions: props.avoidCollisions,
      collisionPadding: collision.collisionPadding.value,
      collisionBoundary: collision.collisionBoundary.value,
    })),
  };
};
