/**
 * The attribute on the portal container of every raft-ui overlay: Popover,
 * DropdownMenu, ContextMenu, Select, Combobox, ComboboxSelect, Tooltip,
 * PreviewCard, NotificationCenter, Dialog, AlertDialog, Drawer, Lightbox and
 * Toast. Each `…Portal` part sets it, so an overlay opened from inside another
 * (portaled into that one's container) is inside both.
 */
export const OVERLAY_PORTAL_ATTRIBUTE = "data-raft-ui-overlay";

const OVERLAY_SELECTOR = `[${OVERLAY_PORTAL_ATTRIBUTE}]`;

/**
 * The portal container of the innermost raft-ui overlay `node` is inside, or
 * `null` when it is in none (and for `null`). A text node counts by its parent.
 */
export function closestOverlay(node: Node | null): Element | null {
  if (!node) return null;
  const element = node.nodeType === 1 ? (node as Element) : node.parentElement;
  return element?.closest(OVERLAY_SELECTOR) ?? null;
}

/**
 * Whether `node` is inside a raft-ui overlay. Use it where a page's own
 * handler must leave events from an overlay alone, such as a shortcut, a press
 * outside a region, or a drag: an overlay's content is portaled out of the
 * tree it was opened from, so `region.contains(target)` is false for it.
 */
export function isInsideOverlay(node: Node | null): boolean {
  return closestOverlay(node) !== null;
}
