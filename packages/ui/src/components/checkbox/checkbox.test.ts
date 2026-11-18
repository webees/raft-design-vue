import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Checkbox from "./Checkbox.vue";

describe("Checkbox", () => {
  it("exposes the checkbox slot and 20px box", () => {
    const wrapper = mount(Checkbox);
    const root = wrapper.find("[data-slot=checkbox]");
    expect(root.exists()).toBe(true);
    expect(root.classes()).toContain("size-5");
  });

  it("supports the indeterminate visual", () => {
    const wrapper = mount(Checkbox, { props: { modelValue: "indeterminate" } });
    expect(wrapper.find("[data-slot=checkbox-indicator-graphic]").exists()).toBe(true);
  });

  it("emits updates", async () => {
    const wrapper = mount(Checkbox);
    await wrapper.find("[data-slot=checkbox]").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
