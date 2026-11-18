import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import Ellipsis from "./Ellipsis.vue";
import EllipsisToggle from "./EllipsisToggle.vue";
import TooltipProvider from "../tooltip/TooltipProvider.vue";

describe("Ellipsis", () => {
  it("renders inline content with its line clamp style", () => {
    const wrapper = mount(TooltipProvider, {
      slots: {
        default: () => h(Ellipsis, { lines: 2 }, { default: () => "Long text" }),
      },
    });
    const root = wrapper.findComponent(Ellipsis);
    expect(root.attributes("data-slot")).toBe("ellipsis");
    expect(root.attributes("style")).toContain("--ellipsis-lines: 2");
  });

  it("toggles an after link through the shared context", async () => {
    const wrapper = mount(TooltipProvider, {
      slots: {
        default: () =>
          h(
            Ellipsis,
            { lines: 2 },
            {
              default: () => "Long text",
              after: () => h(EllipsisToggle, () => "More"),
            },
          ),
      },
    });
    const toggle = wrapper.find("[data-slot='text-link']");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
  });

  it("throws when a toggle is used outside an ellipsis", () => {
    expect(() => mount(EllipsisToggle)).toThrow(/inside an Ellipsis/);
  });
});
