import { describe, expect, it } from "vitest";

import { FenwickTree } from "./fenwick-tree";
import { getNeededEnd, getOverscannedRange, getVerticalRange } from "./virtual-list-range";

/*
 * A 100px view over rows of 10px (the estimate and the minimum size) unless a test says otherwise, so
 * a viewport is 10 rows, the trim threshold (2.5 viewports) 250px and the jump threshold the same.
 */
const LIST_HEIGHT = 100;
const MIN_SIZE = 10;

const rows = (count: number, size = MIN_SIZE) => new FenwickTree(count, size);

/** The range in view at `viewTop`, as the list computes it. */
function viewAt(fenwickTree: FenwickTree, viewTop: number, itemCount = fenwickTree.l) {
  return getVerticalRange({
    fenwickTree,
    scrollTop: viewTop,
    listHeight: LIST_HEIGHT,
    itemMinSize: MIN_SIZE,
    itemCount,
    paddingTop: 0,
  });
}

/** `getOverscannedRange` with the range in view and the rows needed to fill it computed at `viewTop`. */
function overscan({
  fenwickTree,
  viewTop,
  prev,
  moved = 10,
  movingUp = false,
  settling = false,
  isMeasured = () => true,
  plannedSize = (index: number) => fenwickTree.get(index),
  itemCount = fenwickTree.l,
}: {
  fenwickTree: FenwickTree;
  viewTop: number;
  prev: { startIndex: number; endIndex: number };
  moved?: number;
  movingUp?: boolean;
  settling?: boolean;
  isMeasured?: (index: number) => boolean;
  plannedSize?: (index: number) => number;
  itemCount?: number;
}) {
  const view = viewAt(fenwickTree, viewTop, itemCount);
  return getOverscannedRange({
    fenwickTree,
    view,
    prev,
    neededEnd: getNeededEnd({
      fenwickTree,
      startIndex: view.startIndex,
      viewTop,
      listHeight: LIST_HEIGHT,
      itemMinSize: MIN_SIZE,
      itemCount,
      isMeasured,
    }),
    viewTop,
    moved,
    movingUp,
    settling,
    plannedSize,
    listHeight: LIST_HEIGHT,
    itemCount,
  });
}

describe("getNeededEnd", () => {
  const needed = (fenwickTree: FenwickTree, isMeasured: (index: number) => boolean, minSize = 20) =>
    getNeededEnd({
      fenwickTree,
      startIndex: 0,
      viewTop: 0,
      listHeight: LIST_HEIGHT,
      itemMinSize: minSize,
      itemCount: fenwickTree.l,
      isMeasured,
    });

  it("is the only row of a single-item list", () => {
    expect(needed(rows(1), () => true)).toBe(0);
    expect(needed(rows(1), () => false)).toBe(0);
  });

  it("counts measured rows at their size", () => {
    expect(needed(rows(50, 40), () => true)).toBe(2);
  });

  it("counts rows not measured yet at the minimum size, not the estimate", () => {
    expect(needed(rows(50, 72), () => false)).toBe(4);
  });
});

describe("getOverscannedRange", () => {
  it("renders nothing for an empty list, whatever was rendered before", () => {
    expect(
      overscan({ fenwickTree: rows(0), viewTop: 0, prev: { startIndex: 0, endIndex: 9 } }),
    ).toEqual({ startIndex: 0, endIndex: -1 });
  });

  it("renders the only row of a single-item list", () => {
    expect(
      overscan({ fenwickTree: rows(1), viewTop: 0, prev: { startIndex: 0, endIndex: 0 } }),
    ).toEqual({ startIndex: 0, endIndex: 0 });
  });

  it("mounts no row past the last one at the end of the list", () => {
    expect(
      overscan({ fenwickTree: rows(25), viewTop: 150, prev: { startIndex: 10, endIndex: 20 } }),
    ).toEqual({ startIndex: 10, endIndex: 24 });
  });

  it("renders the range in view when the rendered range is out of bounds", () => {
    const fenwickTree = rows(100);
    expect(overscan({ fenwickTree, viewTop: 900, prev: { startIndex: 85, endIndex: 120 } })).toEqual(
      viewAt(fenwickTree, 900),
    );
  });

  it("renders the range in view after a move of more than 2.5 viewports", () => {
    const fenwickTree = rows(1000);
    const prev = { startIndex: 0, endIndex: 30 };
    expect(overscan({ fenwickTree, viewTop: 260, prev, moved: 260 })).toEqual(
      viewAt(fenwickTree, 260),
    );
    expect(overscan({ fenwickTree, viewTop: 240, prev, moved: 240 })).toEqual({
      startIndex: 0,
      endIndex: 36,
    });
  });

  it("renders the range in view when it is apart from the rendered one and the view did not move", () => {
    const fenwickTree = rows(1000);
    expect(
      overscan({ fenwickTree, viewTop: 500, prev: { startIndex: 0, endIndex: 10 }, moved: 0 }),
    ).toEqual(viewAt(fenwickTree, 500));
  });

  describe("while a jump settles", () => {
    it("mounts no rows ahead above the view", () => {
      const range = overscan({
        fenwickTree: rows(1000),
        viewTop: 450,
        prev: { startIndex: 50, endIndex: 70 },
        moved: 50,
        movingUp: true,
        settling: true,
      });
      expect(range.startIndex).toBe(45);
    });

    it("trims no edge", () => {
      const fenwickTree = rows(1000);
      expect(
        overscan({
          fenwickTree,
          viewTop: 300,
          prev: { startIndex: 0, endIndex: 70 },
          moved: 50,
          settling: true,
        }),
      ).toEqual({ startIndex: 0, endIndex: 70 });
      expect(
        overscan({
          fenwickTree,
          viewTop: 300,
          prev: { startIndex: 0, endIndex: 100 },
          moved: 50,
          movingUp: true,
          settling: true,
        }),
      ).toEqual({ startIndex: 0, endIndex: 100 });
    });
  });

  describe("the trim threshold", () => {
    const fenwickTree = rows(1000);

    it("keeps the rows the view has passed until 2.5 viewports of them, then keeps one viewport", () => {
      const prev = { startIndex: 0, endIndex: 40 };
      expect(overscan({ fenwickTree, viewTop: 240, prev }).startIndex).toBe(0);
      expect(overscan({ fenwickTree, viewTop: 260, prev }).startIndex).toBe(16);
    });

    it("keeps the rows below the view while moving up until 2.5 viewports of them", () => {
      const at = (endIndex: number) =>
        overscan({
          fenwickTree,
          viewTop: 300,
          prev: { startIndex: 0, endIndex },
          movingUp: true,
        }).endIndex;
      expect(at(64)).toBe(64);
      expect(at(65)).toBe(42);
    });

    it("mounts a viewport of rows above once fewer than a quarter viewport are left", () => {
      const prev = { startIndex: 30, endIndex: 60 };
      expect(overscan({ fenwickTree, viewTop: 330, prev, movingUp: true }).startIndex).toBe(30);
      expect(overscan({ fenwickTree, viewTop: 320, prev, movingUp: true }).startIndex).toBe(22);
    });
  });

  it("mounts below the view only the rows that fill it, plus a quarter viewport", () => {
    const fenwickTree = rows(1000);
    for (let i = 0; i < 100; ++i) {
      fenwickTree.add(i, 40);
    }
    const range = overscan({
      fenwickTree,
      viewTop: 1000,
      prev: { startIndex: 18, endIndex: 20 },
      isMeasured: (index: number) => index < 100,
    });
    expect(range).toEqual({ startIndex: 18, endIndex: 22 });
  });

  it("plans the rows above the view at the planned size, not the estimate", () => {
    const range = overscan({
      fenwickTree: rows(1000),
      viewTop: 450,
      prev: { startIndex: 50, endIndex: 70 },
      moved: 50,
      movingUp: true,
      isMeasured: () => false,
      plannedSize: () => 50,
    });
    expect(range.startIndex).toBe(43);
  });
});
