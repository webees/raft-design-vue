import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders a native button by default", () => {
    const wrapper = mount(Button, { slots: { default: "Save" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("data-slot")).toBe("button");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.text()).toContain("Save");
  });

  it("keeps the primary sticker recipe", () => {
    const wrapper = mount(Button, {
      props: { variant: "primary", size: "md" },
      slots: { default: "Create" },
    });
    expect(wrapper.classes()).toContain("bg-attention-400");
    expect(wrapper.classes()).toContain("border-sticker-ink");
    expect(wrapper.classes()).toContain("text-control");
  });

  it("uses aria-disabled while loading and blocks activation", async () => {
    let clicks = 0;
    const wrapper = mount(Button, {
      props: { loading: true },
      attrs: { onClick: () => clicks++ },
      slots: { default: "Saving" },
    });

    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.attributes("disabled")).toBeUndefined();
    expect(wrapper.find("[data-slot=spinner]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=button-content]").attributes("data-loading")).toBe("true");

    await wrapper.trigger("click");
    expect(clicks).toBe(0);
  });

  it("accepts a custom element through as", () => {
    const wrapper = mount(Button, {
      props: { as: "a" },
      attrs: { href: "/docs" },
      slots: { default: "Docs" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/docs");
  });
});
