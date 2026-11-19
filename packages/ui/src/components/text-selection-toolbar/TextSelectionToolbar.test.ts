import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TextSelectionToolbar from "./TextSelectionToolbar.vue";
import TextSelectionToolbarButton from "./TextSelectionToolbarButton.vue";
import TextSelectionToolbarSeparator from "./TextSelectionToolbarSeparator.vue";

describe("TextSelectionToolbar", () => {
  it("renders a floating toolbar with buttons and a separator", () => {
    const wrapper = mount(TextSelectionToolbar, {
      slots: {
        default: () => [
          h(TextSelectionToolbarButton, () => "Quote"),
          h(TextSelectionToolbarSeparator),
          h(TextSelectionToolbarButton, () => "Copy"),
        ],
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("text-selection-toolbar");
    expect(wrapper.attributes("role")).toBe("toolbar");
    expect(wrapper.classes().join(" ")).toContain("shadow-float");

    const buttons = wrapper.findAll("[data-slot=text-selection-toolbar-button]");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.element.getAttribute("type")).toBe("button");
    expect(wrapper.find("[data-slot=text-selection-toolbar-separator]").exists()).toBe(true);
  });

  it("merges consumer classes", () => {
    const wrapper = mount(TextSelectionToolbar, {
      slots: {
        default: () => h(TextSelectionToolbarButton, { class: "rounded-none" }, () => "Comment"),
      },
    });
    expect(wrapper.get("[data-slot=text-selection-toolbar-button]").classes().join(" ")).toContain(
      "rounded-none",
    );
  });
});
