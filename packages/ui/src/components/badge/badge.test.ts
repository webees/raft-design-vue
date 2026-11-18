import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Badge from "./Badge.vue";

describe("Badge", () => {
  it("defaults to a solid sticker", () => {
    const wrapper = mount(Badge, { slots: { default: "3" } });
    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.attributes("data-slot")).toBe("badge");
    expect(wrapper.classes()).toContain("bg-sticker-paper");
    expect(wrapper.classes()).toContain("rounded-sticker");
  });

  it("maps soft tones", () => {
    const wrapper = mount(Badge, {
      props: { appearance: "soft", variant: "danger" },
      slots: { default: "Blocked" },
    });
    expect(wrapper.classes()).toContain("bg-danger-soft");
  });

  it("uses mono type for outline badges", () => {
    const wrapper = mount(Badge, {
      props: { appearance: "outline", variant: "information" },
      slots: { default: "beta" },
    });
    expect(wrapper.classes()).toContain("font-mono");
    expect(wrapper.classes()).toContain("text-info-strong");
  });
});
