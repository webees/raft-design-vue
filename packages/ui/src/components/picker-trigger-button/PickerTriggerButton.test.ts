import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import PickerTriggerButton from "./PickerTriggerButton.vue";

describe("PickerTriggerButton", () => {
  it("renders an outlined filter trigger at 32px", () => {
    const wrapper = mount(PickerTriggerButton, { slots: { default: () => "Channel" } });
    const button = wrapper.find("[data-slot='picker-trigger-button']");
    expect(button.element.tagName).toBe("BUTTON");
    expect(button.attributes("type")).toBe("button");
    expect(button.classes()).toContain("h-8");
    expect(button.classes()).toContain("inset-ring-line-seam");
    expect(wrapper.text()).toBe("Channel");
  });

  it("fills an applied filter and marks an invalid trigger", () => {
    const wrapper = mount(PickerTriggerButton, {
      props: { hasValue: true, invalid: true },
      slots: { default: () => "#launch-week" },
    });
    const button = wrapper.find("[data-slot='picker-trigger-button']");
    expect(button.attributes("data-has-value")).toBe("");
    expect(button.attributes("data-invalid")).toBe("");
    expect(button.classes()).toContain("data-has-value:bg-info-soft");
  });

  it("forwards disabled and the caller class", () => {
    const wrapper = mount(PickerTriggerButton, {
      props: { disabled: true, class: "gap-2" },
      slots: { default: () => "Assignee" },
    });
    const button = wrapper.find("[data-slot='picker-trigger-button']");
    expect(button.attributes("disabled")).toBeDefined();
    expect(button.attributes("data-disabled")).toBe("");
    expect(button.classes()).toContain("gap-2");
  });
});
