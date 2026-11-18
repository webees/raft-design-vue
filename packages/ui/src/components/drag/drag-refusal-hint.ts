/** The chip sits this far right of and below the pointer. */
const HINT_OFFSET = { x: 14, y: 16 } as const;
/** It stays at least this far inside the window on every side. */
const HINT_INSET = 8;
/** Pushed off the lifted copy, it keeps this far from it. */
const HINT_GAP = 6;

export type Box = { left: number; top: number; right: number; bottom: number };
export type Size = { width: number; height: number };

const overlaps = (a: Box, b: Box) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, Math.max(min, max)));

/**
 * Where the refusal chip goes: right of and below the pointer; left of it (and
 * of the copy) where the window's right edge would cut it, above it where the
 * bottom edge would; off the lifted copy; always at least 8px inside the window.
 */
export function placeRefusalHint(
  point: { x: number; y: number },
  size: Size,
  lift: Box | null,
  viewport: Size,
): { x: number; y: number } {
  const { width, height } = size;
  const maxX = viewport.width - HINT_INSET - width;
  const maxY = viewport.height - HINT_INSET - height;
  const fitsX = (x: number) => x >= HINT_INSET && x <= maxX;
  const fitsY = (y: number) => y >= HINT_INSET && y <= maxY;

  const right = point.x + HINT_OFFSET.x;
  const onRight = right <= maxX;
  let x = onRight ? right : Math.min(point.x, lift?.left ?? point.x) - HINT_OFFSET.x - width;
  const below = point.y + HINT_OFFSET.y;
  const onBelow = below <= maxY;
  let y = onBelow ? below : point.y - HINT_OFFSET.y - height;

  const box = (bx: number, by: number) => ({
    left: bx,
    top: by,
    right: bx + width,
    bottom: by + height,
  });
  if (lift && overlaps(box(x, y), lift)) {
    const clearBelow = lift.bottom + HINT_GAP;
    const clearAbove = lift.top - HINT_GAP - height;
    const vertical = (onBelow ? [clearBelow, clearAbove] : [clearAbove, clearBelow]).find(fitsY);
    if (vertical !== undefined) {
      y = vertical;
    } else {
      const besideRight = lift.right + HINT_OFFSET.x;
      const besideLeft = lift.left - HINT_OFFSET.x - width;
      const beside = (onRight ? [besideRight, besideLeft] : [besideLeft, besideRight]).find(fitsX);
      if (beside !== undefined) x = beside;
    }
  }
  return { x: Math.round(clamp(x, HINT_INSET, maxX)), y: Math.round(clamp(y, HINT_INSET, maxY)) };
}
