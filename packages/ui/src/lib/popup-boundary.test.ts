import { describe, expect, it } from "vitest";

import { findPopupAnchor, resolvePopupAnchor, sheetPopupBoundary } from "./popup-boundary";

const rect = (top: number, bottom: number) => ({
  top,
  bottom,
  left: 0,
  right: 400,
  width: 400,
  height: bottom - top,
  x: 0,
  y: top,
  toJSON: () => ({}),
});

const fake = (top: number, bottom: number) =>
  ({ getBoundingClientRect: () => rect(top, bottom) }) as unknown as Element;

describe("resolvePopupAnchor", () => {
  it("unwraps refs and getters", () => {
    const element = fake(0, 10);
    expect(resolvePopupAnchor(element)).toBe(element);
    expect(resolvePopupAnchor({ current: element })).toBe(element);
    expect(resolvePopupAnchor(() => element)).toBe(element);
    expect(resolvePopupAnchor(null)).toBeNull();
  });
});

describe("sheetPopupBoundary", () => {
  const sheet = (head: Element, surface: Element) => ({
    head: () => head,
    surface: () => surface,
  });

  it("starts at the head's bottom and ends at the surface's", () => {
    const boundary = sheetPopupBoundary(sheet(fake(0, 56), fake(0, 700)));
    expect(boundary?.y).toBe(56);
    expect(boundary?.height).toBe(644);
    expect(boundary?.width).toBe(window.innerWidth);
  });

  it("leaves a popup anchored in the head unbounded", () => {
    const head = fake(0, 56);
    const boundary = sheetPopupBoundary(
      sheet(head, fake(0, 700)),
      () => null,
      () => head,
    );
    expect(boundary).toBeNull();
  });

  it("bounds a popup anchored in the body", () => {
    const boundary = sheetPopupBoundary(
      sheet(fake(0, 56), fake(0, 700)),
      () => null,
      () => fake(200, 240),
    );
    expect(boundary?.y).toBe(56);
    expect(boundary?.height).toBe(644);
  });

  it("is empty without a head or surface", () => {
    const boundary = sheetPopupBoundary({ head: () => null, surface: () => null });
    expect(boundary).toBeNull();
  });
});

describe("findPopupAnchor", () => {
  it("finds the open trigger that controls something in the positioner", () => {
    document.body.innerHTML = `
      <button data-popup-open data-state="open" aria-controls="panel">Open</button>
      <div id="positioner"><div id="panel"></div></div>`;
    expect(findPopupAnchor(document.getElementById("positioner"))).toBe(
      document.querySelector("[data-popup-open]"),
    );
  });

  it("returns null without a positioner", () => {
    expect(findPopupAnchor(null)).toBeNull();
  });
});
