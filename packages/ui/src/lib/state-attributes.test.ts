import { describe, expect, it } from "vitest";

import { syncStateAttributes } from "./state-attributes";

const element = (state: string): HTMLElement => {
  const node = document.createElement("div");
  node.setAttribute("data-state", state);
  return node;
};

describe("syncStateAttributes", () => {
  it("mirrors checked and unchecked", () => {
    const checked = element("checked");
    syncStateAttributes(checked);
    expect(checked.hasAttribute("data-checked")).toBe(true);

    checked.setAttribute("data-state", "unchecked");
    syncStateAttributes(checked);
    expect(checked.hasAttribute("data-checked")).toBe(false);
    expect(checked.hasAttribute("data-unchecked")).toBe(true);
  });

  it("mirrors open onto data-open and data-popup-open", () => {
    const open = element("open");
    syncStateAttributes(open);
    expect(open.hasAttribute("data-open")).toBe(true);
    expect(open.hasAttribute("data-popup-open")).toBe(true);

    open.setAttribute("data-state", "closed");
    syncStateAttributes(open);
    expect(open.hasAttribute("data-open")).toBe(false);
    expect(open.hasAttribute("data-popup-open")).toBe(false);
  });

  it("mirrors toggle state and clears stale mirrors", () => {
    const toggle = element("on");
    syncStateAttributes(toggle);
    expect(toggle.hasAttribute("data-pressed")).toBe(true);
    toggle.setAttribute("data-state", "off");
    syncStateAttributes(toggle);
    expect(toggle.hasAttribute("data-pressed")).toBe(false);
    expect(toggle.hasAttribute("data-unchecked")).toBe(true);
  });
});
