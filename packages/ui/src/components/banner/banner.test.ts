import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Banner from "./Banner.vue";
import BannerAction from "./BannerAction.vue";
import BannerClose from "./BannerClose.vue";
import BannerTitle from "./BannerTitle.vue";

describe("Banner", () => {
  it("renders status and size data attributes", () => {
    const wrapper = mount(Banner, {
      props: { status: "warning", size: "sm" },
      slots: { default: "Heads up" },
    });
    expect(wrapper.attributes("data-status")).toBe("warning");
    expect(wrapper.attributes("data-size")).toBe("sm");
    expect(wrapper.classes()).toContain("bg-warning-soft");
  });

  it("composes content, action and close", async () => {
    const wrapper = mount({
      components: { Banner, BannerTitle, BannerClose },
      data: () => ({ closed: 0 }),
      template: `
        <Banner @close="closed++">
          <BannerTitle>Notice</BannerTitle>
          <BannerClose label="Dismiss banner" @click="closed++" />
        </Banner>
      `,
    });

    expect(wrapper.find("[data-slot=banner-title]").text()).toBe("Notice");
    const close = wrapper.find("[data-banner-close]");
    expect(close.attributes("aria-label")).toBe("Dismiss banner");
    await close.trigger("click");
    expect(wrapper.vm.closed).toBe(1);
  });

  it("keeps action layout hooks", () => {
    const wrapper = mount(BannerAction, { slots: { default: "Undo" } });
    expect(wrapper.attributes("data-slot")).toBe("banner-action");
    expect(wrapper.classes()).toContain("justify-end");
  });
});
