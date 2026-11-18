import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TextHeading from "./TextHeading.vue";
import TextSans from "./TextSans.vue";
import TextMono from "./TextMono.vue";

describe("Text", () => {
  it("renders headings at the matching level", () => {
    const wrapper = mount(TextHeading, { props: { level: 2 }, slots: { default: "Title" } });
    expect(wrapper.element.tagName).toBe("H2");
    expect(wrapper.attributes("data-slot")).toBe("text-heading");
    expect(wrapper.classes()).toContain("text-5xl");
  });

  it("renders sans text with color variants", () => {
    const wrapper = mount(TextSans, {
      props: { size: "small", variant: "danger" },
      slots: { default: "Careful" },
    });
    expect(wrapper.element.tagName).toBe("P");
    expect(wrapper.attributes("data-variant")).toBe("danger");
  });

  it("renders mono text", () => {
    const wrapper = mount(TextMono, { props: { size: "meta" }, slots: { default: "v0.1" } });
    expect(wrapper.classes()).toContain("font-mono");
  });
});
