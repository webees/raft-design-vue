import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import Drawer from "./Drawer.vue";
import DrawerClose from "./DrawerClose.vue";

function mountClose(props: Record<string, unknown> = {}) {
  return mount(Drawer, {
    props: { open: true },
    slots: { default: () => h(DrawerClose, props) },
  });
}

describe("DrawerClose", () => {
  it("uses the large icon control by default", () => {
    const wrapper = mountClose();
    const button = wrapper.get('[data-slot="drawer-close"]');

    expect(button.element.tagName).toBe("BUTTON");
    expect(button.attributes("aria-label")).toBe("Close");
    expect(button.classes()).toContain("size-control");
    expect(button.classes()).not.toContain("size-8");
    expect(button.get("svg").classes()).toContain("size-control-icon");
  });

  it("drops the default bar-button frame when a size is provided", () => {
    const wrapper = mountClose({ size: "icon-sm" });

    expect(wrapper.get("button").classes()).toContain("size-8");
  });
});
