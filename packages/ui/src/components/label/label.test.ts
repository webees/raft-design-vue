import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Label } from "./parts";
import LabelOptional from "./LabelOptional.vue";

describe("Label", () => {
  it("defaults to the md label recipe", () => {
    const wrapper = mount(Label, { slots: { default: "Name" } });
    expect(wrapper.element.tagName).toBe("LABEL");
    expect(wrapper.attributes("data-slot")).toBe("label");
    expect(wrapper.classes()).toContain("text-footnote");
  });

  it("marks disabled labels", () => {
    const wrapper = mount(Label, { props: { disabled: true }, slots: { default: "Name" } });
    expect(wrapper.attributes("data-disabled")).toBe("");
    expect(wrapper.attributes("aria-disabled")).toBe("true");
  });

  it("renders the optional marker", () => {
    const wrapper = mount(LabelOptional);
    expect(wrapper.text()).toBe("(optional)");
    expect(wrapper.attributes("data-slot")).toBe("label-optional");
  });
});
