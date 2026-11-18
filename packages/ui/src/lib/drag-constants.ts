/** A mouse or pen picks an item up once it has moved this far. */
export const MOUSE_DRAG_DISTANCE_PX = 6;

/** A finger picks an item up after holding still this long, then moving. */
export const TOUCH_DRAG_HOLD_MS = 500;
export const TOUCH_DRAG_TOLERANCE_PX = 10;
export const TOUCH_DRAG_DISTANCE_PX = 10;

/** How close to an edge a drag auto-scrolls. */
export const DRAG_AUTO_SCROLL_ZONE_PX = 48;

/** A drag settling (motion.md, `motion-drag-settle-*`). */
export const DRAG_SETTLE = { duration: 160, easing: "cubic-bezier(0.25, 1, 0.5, 1)" } as const;

/** Siblings slide apart to open the place with the same token. */
export const DRAG_SIBLING_TRANSITION = DRAG_SETTLE;

/**
 * Drop: the copy glides into its place. Cancel: it glides back home. While
 * it glides, the item it will become stays hidden, then appears there.
 */
export const DROP_GLIDE = DRAG_SETTLE;

/** The origin stays legible under the lifted copy without competing with it. */
export const ORIGIN_OPACITY = 0.4;

/** How far a keyboard drag sets the copy off its place. */
export const DRAG_KEYBOARD_OFFSET_PX = 6;

export const DRAG_LIFT_Z_INDEX = 999;

export const DRAG_KEYBOARD_CODES = {
  start: ["Space"],
  cancel: ["Escape"],
  end: ["Space"],
} as const;
