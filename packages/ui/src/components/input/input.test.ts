import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Input from "./Input.vue";

describe("Input", () => {
  it("renders a field-height control", () => {
    const wrapper = mount(Input, { attrs: { placeholder: "Search" } });
    expect(wrapper.element.tagName).toBe("INPUT");
    expect(wrapper.attributes("data-slot")).toBe("input");
    expect(wrapper.classes()).toContain("h-control");
    expect(wrapper.classes()).toContain("border-line-field");
  });

  it("mirrors invalid onto aria-invalid", () => {
    const wrapper = mount(Input, { props: { invalid: true } });
    expect(wrapper.attributes("aria-invalid")).toBe("true");
    expect(wrapper.attributes("data-invalid")).toBe("");
  });

  it("adds password-manager opt-out hints when asked", () => {
    const wrapper = mount(Input, { props: { suppressPasswordManager: true } });
    expect(wrapper.attributes("data-1p-ignore")).toBe("true");
    expect(wrapper.attributes("data-lpignore")).toBe("true");
    expect(wrapper.classes()).toContain("keeper-ignore");
  });
});
