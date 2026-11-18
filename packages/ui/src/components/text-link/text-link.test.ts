import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TextLink from "./TextLink.vue";
import TextLinkExternalIcon from "./TextLinkExternalIcon.vue";

describe("TextLink", () => {
  it("renders a native button by default", () => {
    const wrapper = mount(TextLink, {
      props: { variant: "strong" },
      slots: { default: "Create" },
    });

    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("data-slot")).toBe("text-link");
    expect(wrapper.classes()).toContain("font-semibold");
  });

  it("renders inline text with button semantics when nativeButton is false", async () => {
    const wrapper = mount(TextLink, {
      props: { nativeButton: false },
      slots: { default: "Create" },
      attrs: { "aria-disabled": "true" },
    });

    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.attributes("role")).toBe("button");
    expect(wrapper.attributes("tabindex")).toBeUndefined();
    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.classes()).toContain("box-decoration-clone");
  });

  it("activates with Enter and Space", async () => {
    const wrapper = mount(TextLink, {
      props: { nativeButton: false },
      slots: { default: "Create" },
      attachTo: document.body,
    });

    let clicks = 0;
    wrapper.element.addEventListener("click", () => clicks++);
    await wrapper.trigger("keydown", { key: "Enter" });
    await wrapper.trigger("keydown", { key: " " });
    expect(clicks).toBe(2);
    wrapper.unmount();
  });

  it("renders an accessible external-link marker", () => {
    const wrapper = mount(TextLinkExternalIcon, { props: { label: "opens in a new tab" } });
    expect(wrapper.attributes("aria-hidden")).toBeUndefined();
    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
    expect(wrapper.find(".sr-only").text()).toBe("opens in a new tab");
  });
});
