import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import InlineCode from "./InlineCode.vue";

describe("InlineCode", () => {
  it("renders code with the inline recipe", () => {
    const wrapper = mount(InlineCode, { slots: { default: "bun install" } });
    expect(wrapper.element.tagName).toBe("CODE");
    expect(wrapper.text()).toBe("bun install");
    expect(wrapper.classes()).toContain("font-mono");
    expect(wrapper.attributes("data-slot")).toBe("inline-code");
  });

  it("renders the requested element with asChild", () => {
    const wrapper = mount(InlineCode, {
      props: { asChild: true },
      slots: { default: "<kbd class='custom'>⌘K</kbd>" },
    });
    expect(wrapper.element.tagName).toBe("KBD");
    expect(wrapper.classes()).toContain("custom");
  });

  it("renders the in-message treatment with appearance=message", () => {
    const wrapper = mount(InlineCode, {
      props: { appearance: "message" },
      slots: { default: "bun install" },
    });
    expect(wrapper.classes()).toContain("align-baseline");
    expect(wrapper.classes()).toContain("[font-size:0.875em]");
  });
});
