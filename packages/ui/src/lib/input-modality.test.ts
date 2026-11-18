import { afterEach, describe, expect, it } from "vitest";

import { installInputModality } from "./input-modality";

const attribute = () => document.documentElement.getAttribute("data-input-modality");

describe("installInputModality", () => {
  afterEach(() => document.documentElement.removeAttribute("data-input-modality"));

  it("marks a pointer press", () => {
    const uninstall = installInputModality();
    document.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerType: "mouse",
        width: 12,
        height: 12,
      }),
    );
    expect(attribute()).toBe("pointer");
    uninstall();
    expect(attribute()).toBeNull();
  });

  it("marks keyboard navigation", () => {
    const uninstall = installInputModality();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    expect(attribute()).toBe("keyboard");
    uninstall();
  });

  it("keeps the attribute until the last installation leaves", () => {
    const first = installInputModality();
    const second = installInputModality();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    first();
    expect(attribute()).toBe("keyboard");
    second();
    expect(attribute()).toBeNull();
  });
});
