import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { Fragment, h, type VNodeChild } from "vue";

import FitToolbar from "../fit-toolbar/FitToolbar.vue";
import TooltipProvider from "../tooltip/TooltipProvider.vue";
import SelectionToolbarAction from "./SelectionToolbarAction.vue";

const mountInToolbar = (node: () => VNodeChild) =>
  mount(TooltipProvider, {
    slots: {
      default: () => h(FitToolbar, {}, { default: () => h(Fragment, null, [node()]) }),
    },
  });

describe("SelectionToolbarAction", () => {
  it("keeps the label mounted so the button always has an accessible name", () => {
    const wrapper = mountInToolbar(() =>
      h(SelectionToolbarAction, { id: "copy" }, {
        default: () => "Copy",
        icon: () => h("span", { "data-icon": "" }),
      }),
    );

    const label = wrapper.find('[data-slot="selection-toolbar-action-label"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Copy");
  });

  it("warns once when a menu action has no moreItem", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mountInToolbar(() => [
      h(SelectionToolbarAction, { id: "format", menu: true }, { default: () => "Format" }),
      h(SelectionToolbarAction, { id: "more", menu: true }, { default: () => "More" }),
    ]);

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it("renders the icon next to the label", () => {
    const wrapper = mountInToolbar(() =>
      h(SelectionToolbarAction, { id: "copy" }, {
        default: () => "Copy",
        icon: () => h("span", { "data-icon": "" }),
      }),
    );

    expect(wrapper.find("[data-selection-toolbar-action] [data-icon]").exists()).toBe(true);
  });
});
