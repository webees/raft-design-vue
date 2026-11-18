import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconTile from "./IconTile.vue";

describe("IconTile", () => {
  it("renders a decorative neutral tile by default", () => {
    const wrapper = mount(IconTile, { slots: { default: "<svg />" } });
    expect(wrapper.attributes("data-slot")).toBe("icon-tile");
    expect(wrapper.attributes("data-size")).toBe("md");
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.classes()).toContain("bg-fill-muted");
  });

  it("is announced when given an accessible role", () => {
    const wrapper = mount(IconTile, {
      attrs: { role: "img", "aria-label": "Workspace" },
      slots: { default: "<svg />" },
    });
    expect(wrapper.attributes("aria-hidden")).toBeUndefined();
    expect(wrapper.attributes("aria-label")).toBe("Workspace");
  });

  it("maps warning tone and large size", () => {
    const wrapper = mount(IconTile, {
      props: { variant: "warning", size: "lg" },
      slots: { default: "<svg />" },
    });
    expect(wrapper.classes()).toContain("bg-warning-soft");
    expect(wrapper.classes()).toContain("size-[51px]");
  });
});
