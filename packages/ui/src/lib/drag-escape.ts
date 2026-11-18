/**
 * Escape during a drag belongs to the drag
 * (design/patterns/drag-and-drop.md#drop-and-cancel): it puts the item back,
 * and nothing else hears it. A dialog, a panel or a popover that closes on
 * Escape would otherwise close too.
 *
 * While a drag is held, one capture-phase listener on its window takes the
 * Escape first: it stops the event (`preventDefault`,
 * `stopImmediatePropagation`) and cancels the drag itself. Once the drag is
 * over the listener lets every key through again.
 */

type Cancel = (event: KeyboardEvent) => void;

/** The drags in progress in each window, each with its own cancel. */
const holds = new WeakMap<Window, Map<object, Cancel>>();

function onKeydown(this: Window, event: KeyboardEvent) {
  if (event.key !== "Escape" && event.code !== "Escape") return;
  const drags = holds.get(this);
  if (!drags || drags.size === 0) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  for (const cancel of drags.values()) cancel(event);
}

function guard(win: Window) {
  let drags = holds.get(win);
  if (!drags) {
    drags = new Map();
    holds.set(win, drags);
    win.addEventListener("keydown", onKeydown, { capture: true });
  }
  return drags;
}

// Installed when raft-ui loads, so it runs before the capture-phase Escape
// listeners an app adds on the window later, even when the drag parts load
// later (lazily). Every entry imports this module for its side effect.
if (typeof window !== "undefined") guard(window);

/** A drag has started: Escape now cancels it, and only it. */
export function holdEscape(win: Window | null | undefined, sensor: object, cancel: Cancel) {
  if (!win) return;
  guard(win).set(sensor, cancel);
}

/** The drag is over: Escape behaves as it does everywhere else again. */
export function releaseEscape(win: Window | null | undefined, sensor: object) {
  if (!win) return;
  holds.get(win)?.delete(sensor);
}
