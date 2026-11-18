import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SidebarSection from "./SidebarSection.vue";

describe("Sidebar", () => {
  it("applies a caller class once and keeps other attrs", () => {
    const wrapper = mount(SidebarSection, {
      attrs: { class: "x-sidebar", id: "section", "data-testid": "section" },
    });

    const root = wrapper.element as HTMLElement;
    expect(root.className.split(/\s+/).filter((name) => name === "x-sidebar")).toHaveLength(1);
    expect(root.id).toBe("section");
    expect(root.dataset.testid).toBe("section");
  });
});
