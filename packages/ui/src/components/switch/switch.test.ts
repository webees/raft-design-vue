import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Switch from "./Switch.vue";

describe("Switch", () => {
  it("renders a thumb and the track recipe", () => {
    const wrapper = mount(Switch);
    expect(wrapper.find("[data-slot=switch]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=switch-thumb]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=switch]").classes()).toContain("rounded-full");
  });

  it("reflects the model state", () => {
    const wrapper = mount(Switch, { props: { modelValue: true } });
    expect(wrapper.find("[data-slot=switch]").attributes("data-state")).toBe("checked");
  });
});
