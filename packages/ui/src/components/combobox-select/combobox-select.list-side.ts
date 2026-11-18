export const ROW = 36;
export const LIST_PADDING = 8;
export const SIDE_OFFSET = 4;

export function roomBelowIsShort(
  field: Pick<DOMRect, "bottom">,
  viewport: { top: number; height: number },
  rows = 3,
): boolean {
  const below = viewport.top + viewport.height - field.bottom - SIDE_OFFSET;
  return below < rows * ROW + LIST_PADDING;
}
