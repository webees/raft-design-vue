import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Avatar from "./Avatar.vue";
import AvatarBadge from "./AvatarBadge.vue";

describe("Avatar", () => {
  it("renders the sticker frame with size and type data", () => {
    const wrapper = mount(Avatar, { props: { size: "lg", type: "human" } });
    expect(wrapper.attributes("data-slot")).toBe("avatar");
    expect(wrapper.attributes("data-size")).toBe("lg");
    expect(wrapper.classes()).toContain("size-[51px]");
    expect(wrapper.classes()).toContain("bg-palette-lavender");
  });

  it("renders a fallback icon by default", () => {
    const wrapper = mount(Avatar);
    expect(wrapper.find("[data-slot=avatar-fallback]").exists()).toBe(true);
  });
});

describe("AvatarBadge", () => {
  it("maps presence onto the status color variable", () => {
    const wrapper = mount(AvatarBadge, { props: { presence: "busy" } });
    expect(wrapper.find("[data-slot=avatar-badge-dot]").classes()).toContain(
      "[--status-color:var(--presence-busy)]",
    );
  });
});
