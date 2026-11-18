import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Separator from "./Separator.vue";

describe("Separator", () => {
  it("renders a horizontal hairline by default", () => {
    const wrapper = mount(Separator);
    expect(wrapper.attributes("data-slot")).toBe("separator");
    expect(wrapper.attributes("data-orientation")).toBe("horizontal");
    expect(wrapper.classes()).toContain("h-px");
  });

  it("supports vertical orientation", () => {
    const wrapper = mount(Separator, { props: { orientation: "vertical" } });
    expect(wrapper.classes()).toContain("w-px");
  });

  it("renders a labeled separator", () => {
    const wrapper = mount(Separator, { slots: { default: "or" } });
    expect(wrapper.find("[data-slot=separator-content]").text()).toBe("or");
  });
});
