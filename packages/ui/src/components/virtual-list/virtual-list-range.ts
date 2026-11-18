/*
 * The pure helpers of VirtualList's range update, list resize handler and layout styles.
 * Ported from raft-design `components/virtual-list/utils/range.ts`.
 */
import type { FenwickTree } from "./fenwick-tree";

export interface IndexRange {
  startIndex: number;
  endIndex: number;
}

/**
 * The items to render: from the item at `scrollTop - paddingTop` through as many items as fit in
 * `listHeight` at their minimum size, plus one (the overscan is `getOverscannedRange`'s). Emp
 */
export function getVerticalRange({
  fenwickTree,
  scrollTop,
  listHeight,
  itemMinSize,
  itemCount,
  paddingTop,
}: {
  fenwickTree: FenwickTree;
  scrollTop: number;
  listHeight: number | undefined;
  itemMinSize: number;
  itemCount: number;
  paddingTop: number;
}): IndexRange {
  if (listHeight === undefined || itemCount === 0) {
    return { startIndex: 0, endIndex: -1 };
  }
  const startIndex = Math.max(fenwickTree.getBound(scrollTop - paddingTop), 0);
  const endIndex = Math.min(startIndex + Math.ceil(listHeight / itemMinSize + 1), itemCount - 1);
  return { startIndex, endIndex };
}

/*
 * The overscan of the rendered range. Rows mounted above the view move every mounted row in the flow
 * (their offset is one CSS variable all of them inherit), so the top edge is moved ahead in batches:
 * rows are mounted below the view up to OVERSCAN_BELOW past it, a row or two at a time (rows mounted
 * at the bottom move nothing); while the view moves up the edge is moved back there once more rows
 * were mounted above than were discarded at the bottom (they must be mounted before they are needed).
 * The bottom edge is trimmed while the view moves down, and extended up to OVERSCAN_TARGET past the
 * view. A jump extends both edges to OVERSCAN_MAX. When the view moves more than OVERSCAN_MAX at
 * once, or the range in view does not touch the rendered one while the view did not move, the range
 * in view is rendered.
 *
 * While a jump settles (`settling`) the top edge is not moved ahead and no edge is trimmed: rows mounted
 * above a row inserted during the jump would move it.
 *
 * `moved` is how far the view moved since the rendered range was computed (px).
 */

const OVERSCAN_MIN = 0.25;
const OVERSCAN_TARGET = 1;
const OVERSCAN_MAX = 2.5;
const OVERSCAN_BELOW = 0.25;

/**
 * The last row needed to fill the view from row `startIndex` down: measured rows (`isMeasured`) count at
 * their size, the others at `itemMinSize`, so the view is filled even before they mount.
 */
export function getNeededEnd({
  fenwickTree,
  startIndex,
  viewTop,
  listHeight,
  itemMinSize,
  itemCount,
  isMeasured,
}: {
  fenwickTree: FenwickTree;
  startIndex: number;
  viewTop: number;
  listHeight: number;
  itemMinSize: number;
  itemCount: number;
  isMeasured: (index: number) => boolean;
}): number {
  const bottom = viewTop + listHeight;
  let offset = fenwickTree.sum(startIndex);
  let index = startIndex;
  for (; index < itemCount - 1; ++index) {
    offset += isMeasured(index) ? fenwickTree.get(index) : Math.max(itemMinSize, 1);
    if (offset >= bottom) {
      break;
    }
  }
  return index;
}

/**
 * The items to render with overscan (see above), from the range in view (`view`, as `getVerticalRange`
 * gives it), the last row needed to fill the view (`neededEnd`) and the rendered range (`prev`).
 * `viewTop` is the view's top in item offsets, `moved` how far it moved since the last range update,
 * `movingUp` whether it last moved up, `settling` whether a jump is settling, `plannedSize` the size a
 * row is counted at when planning how many rows to mount above the view. With a `listHeight` of 0
 * (not laid out) there is no overscan: `view` is returned.
 */
export function getOverscannedRange({
  fenwickTree,
  view,
  prev,
  neededEnd,
  viewTop,
  moved,
  movingUp,
  settling,
  plannedSize,
  listHeight,
  itemCount,
}: {
  fenwickTree: FenwickTree;
  view: IndexRange;
  prev: IndexRange;
  neededEnd: number;
  viewTop: number;
  moved: number;
  movingUp: boolean;
  settling: boolean;
  plannedSize: (index: number) => number;
  listHeight: number;
  itemCount: number;
}): IndexRange {
  const last = itemCount - 1;
  const min = OVERSCAN_MIN * listHeight;
  const target = OVERSCAN_TARGET * listHeight;
  const max = OVERSCAN_MAX * listHeight;
  const apart = view.startIndex > prev.endIndex || view.endIndex < prev.startIndex;
  if (
    listHeight <= 0 ||
    view.endIndex < view.startIndex ||
    prev.endIndex < prev.startIndex ||
    prev.endIndex > last ||
    moved > max ||
    (apart && moved === 0)
  ) {
    return view;
  }
  // The row `target` above the view's top, the rows not measured yet at the size rows typically are
  // (`plannedSize`), not the estimate: an estimate well below that would mount many more rows at once.
  let ahead = view.startIndex;
  for (let above = viewTop - fenwickTree.sum(ahead); ahead > 0 && above < target; ) {
    ahead -= 1;
    above += plannedSize(ahead);
  }
  let startIndex = prev.startIndex;
  if (prev.startIndex > view.startIndex) {
    startIndex = movingUp && !settling ? ahead : view.startIndex;
  } else if (!settling) {
    const above = viewTop - fenwickTree.sum(prev.startIndex);
    if (movingUp ? above < min : above > max) {
      startIndex = movingUp ? Math.min(ahead, prev.startIndex) : ahead;
    }
  }
  const needed = Math.min(neededEnd, view.endIndex);
  const neededBottom = fenwickTree.sum(needed + 1);
  let endIndex = prev.endIndex;
  if (
    prev.endIndex < needed ||
    (movingUp && !settling && fenwickTree.sum(prev.endIndex + 1) - neededBottom > max)
  ) {
    endIndex = Math.min(
      Math.max(fenwickTree.getBound(neededBottom + OVERSCAN_BELOW * listHeight), needed),
      last,
    );
  }
  return { startIndex, endIndex };
}

/** The columns to render: the ones in `scrollLeft .. scrollLeft + listWidth`, plus one on each side. */
export function getHorizontalRange({
  xFenwickTree,
  scrollLeft,
  listWidth,
  columnCount,
}: {
  xFenwickTree: FenwickTree | null;
  scrollLeft: number;
  listWidth: number;
  columnCount: number;
}): IndexRange {
  if (xFenwickTree === null || columnCount === 0) {
    return { startIndex: 0, endIndex: 0 };
  } else {
    return {
      startIndex: Math.max(xFenwickTree.getBound(scrollLeft) - 1, 0),
      endIndex: Math.min(xFenwickTree.getBound(scrollLeft + listWidth) + 1, columnCount - 1),
    };
  }
}

/** Whether `a` and `b` have the same length and every key of `a` is in `b`. */
export function haveSameKeys(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (const key of a) {
    if (!b.includes(key)) {
      return false;
    }
  }
  return true;
}

/** Whether `el` or one of its ancestors is hidden with an inline `display: none`. */
export function isHiddenByDisplayNone(el: HTMLElement): boolean {
  let current: HTMLElement | null = el;
  while (current !== null) {
    if (current.style.display === "none") {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}

/** A CSS pixel length, or `undefined` for `undefined`. */
export function px(value: number): string;
export function px(value: number | undefined): string | undefined;
export function px(value: number | undefined): string | undefined {
  if (value !== undefined) {
    return `${value}px`;
  }
}
