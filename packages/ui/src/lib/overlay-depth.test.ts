import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { OverlayLayer, useEnclosingOverlayKind, useParentOverlayKind } from "./overlay-depth";

const ParentProbe = defineComponent({
  setup() {
    return () => h("i", { "data-parent": useParentOverlayKind() ?? "" });
  },
});

const EnclosingProbe = defineComponent({
  setup() {
    return () => h("i", { "data-enclosing": useEnclosingOverlayKind() ?? "" });
  },
});

describe("overlay depth", () => {
  it("has no parent at the top level", () => {
    const wrapper = mount(OverlayLayer, {
      props: { kind: "dialog", modal: true },
      slots: { default: () => h(ParentProbe) },
    });
    expect(wrapper.get("i").attributes("data-parent")).toBe("");
  });

  it("reports the surface a nested popup is drawn in", () => {
    const wrapper = mount(OverlayLayer, {
      props: { kind: "drawer", modal: true },
      slots: {
        default: () =>
          h(OverlayLayer, { kind: "dialog", modal: true }, { default: () => h(ParentProbe) }),
      },
    });
    expect(wrapper.get("i").attributes("data-parent")).toBe("drawer");
  });

  it("lets a root read the surface it is written in", () => {
    const wrapper = mount(OverlayLayer, {
      props: { kind: "drawer", modal: true },
      slots: { default: () => h(EnclosingProbe) },
    });
    expect(wrapper.get("i").attributes("data-enclosing")).toBe("drawer");
  });
});
