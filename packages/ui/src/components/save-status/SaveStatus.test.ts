import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SaveStatus from "./SaveStatus.vue";
import SaveStatusError from "./SaveStatusError.vue";
import { SaveStatusSaved } from "./SaveStatusSaved";

describe("SaveStatus", () => {
  it("is empty and hidden when the setting saved", () => {
    const wrapper = mount(SaveStatus);
    expect(wrapper.attributes("data-slot")).toBe("save-status");
    expect(wrapper.classes()).toContain("empty:hidden");
    expect(wrapper.text()).toBe("");
  });

  it("announces a failure as an alert", () => {
    const wrapper = mount(SaveStatus, {
      slots: { default: () => "<span>Name is taken</span>" },
    });
    expect(wrapper.find("[role='alert']").exists()).toBe(false);

    const error = mount(SaveStatusError, { slots: { default: "Name is taken" } });
    expect(error.attributes("role")).toBe("alert");
    expect(error.attributes("data-slot")).toBe("save-status-error");
    expect(error.classes()).toContain("text-danger-strong");
  });

  it("keeps the deprecated Saved component silent", () => {
    const wrapper = mount(SaveStatusSaved);
    expect(wrapper.text()).toBe("");
  });
});
