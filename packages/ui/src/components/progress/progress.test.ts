import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Progress from "./Progress.vue";

describe("Progress", () => {
  it("renders a determinate bar", () => {
    const wrapper = mount(Progress, { props: { modelValue: 40 } });
    expect(wrapper.attributes("data-slot")).toBe("progress");
    expect(wrapper.find("[data-slot=progress-track]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=progress-indicator]").exists()).toBe(true);
  });

  it("marks indeterminate progress", () => {
    const wrapper = mount(Progress, { props: { modelValue: null } });
    expect(wrapper.find("[data-slot=progress-indicator]").attributes("data-indeterminate")).toBe(
      "",
    );
  });
});
