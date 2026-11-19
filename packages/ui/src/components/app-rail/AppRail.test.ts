import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  AppRailFooter,
  AppRailHeader,
  AppRailItem,
  AppRailItemAttention,
  AppRailItemBadge,
  AppRailItemIcon,
  AppRailItemLabel,
  AppRailNav,
  AppRailRoot,
} from ".";

const Rail = defineComponent({
  setup() {
    return () =>
      h(AppRailRoot, () => [
        h(AppRailHeader, () => h(AppRailItem, { selected: true }, () => "R")),
        h(AppRailNav, () => [
          h(AppRailItem, { selected: true, "aria-label": "Tasks" }, () => [
            h(AppRailItemIcon, () => h("svg", { "data-testid": "tasks-icon" })),
            h(AppRailItemLabel, () => "Tasks"),
            h(AppRailItemBadge, () => "3"),
            h(AppRailItemAttention, { title: "Needs review" }),
          ]),
          h(AppRailItem, { disabled: true }, () => "D"),
        ]),
        h(AppRailFooter, () => "F"),
      ]);
  },
});

describe("AppRail", () => {
  it("renders the rail regions", () => {
    const wrapper = mount(Rail);
    expect(wrapper.find("[data-slot=app-rail-root]").classes()).toContain("w-(--rail-width)");
    expect(wrapper.find("nav[data-slot=app-rail-nav]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=app-rail-header]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=app-rail-footer]").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot=app-rail-item]")).toHaveLength(3);
  });

  it("reports selection and disabled state", () => {
    const wrapper = mount(Rail);
    const items = wrapper.findAll("[data-slot=app-rail-item]");
    expect(items[1]?.attributes("data-selected")).toBe("true");
    expect(items[1]?.attributes("aria-pressed")).toBe("true");
    expect(items[2]?.attributes("disabled")).toBeDefined();
    expect(items[2]?.attributes("data-disabled")).toBe("true");
  });

  it("keeps labels screen-reader only and exposes the badge and attention", () => {
    const wrapper = mount(Rail);
    expect(wrapper.find("[data-slot=app-rail-item-label]").classes()).toContain("sr-only");
    expect(wrapper.find("[data-slot=app-rail-item-badge]").text()).toBe("3");
    expect(wrapper.text()).toContain("Needs review");
    expect(wrapper.find("[data-testid=tasks-icon]").exists()).toBe(true);
  });

  it("renders indicators as decorative status pixels", () => {
    const wrapper = mount(Rail);
    const indicator = wrapper.find("[data-slot=app-rail-item-indicator]");
    expect(indicator.attributes("aria-hidden")).toBe("true");
    expect(indicator.attributes("data-variant")).toBe("accent");
    expect(indicator.attributes("data-size")).toBe("sm");
  });

  it("supports rendering an anchor instead of a button", () => {
    const wrapper = mount(AppRailItem, {
      props: { nativeButton: false, as: "a", href: "#tasks" },
      attrs: { href: "#tasks" },
      slots: { default: () => "Tasks" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("aria-pressed")).toBeUndefined();
  });
});
