import { describe, expect, it } from "vitest";

import { frameCollisionPadding, NO_FRAME_INSETS } from "./frame-insets";

describe("frameCollisionPadding", () => {
  it("returns the caller's padding untouched without insets", () => {
    expect(frameCollisionPadding(8, NO_FRAME_INSETS)).toBe(8);
    const padding = { top: 4, bottom: 12 };
    expect(frameCollisionPadding(padding, NO_FRAME_INSETS)).toBe(padding);
  });

  it("widens only the inset sides", () => {
    expect(frameCollisionPadding(8, { ...NO_FRAME_INSETS, top: 44, left: 10 })).toEqual({
      top: 52,
      right: 8,
      bottom: 8,
      left: 18,
    });
  });

  it("never shrinks a caller's larger padding", () => {
    expect(
      frameCollisionPadding({ top: 80, right: 2 }, { ...NO_FRAME_INSETS, top: 12 }),
    ).toMatchObject({ top: 80, right: 2 });
  });
});
