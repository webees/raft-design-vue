import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { WebTopBarCenter, WebTopBarEnd, WebTopBarRoot, WebTopBarStart } from "./parts";

describe("WebTopBar", () => {
  it("renders a three-column frame bar", () => {
    const wrapper = mount(WebTopBarRoot, {
      slots: {
        default: () => [
          h(WebTopBarStart, () => "Start"),
          h(WebTopBarCenter, () => "Search"),
          h(WebTopBarEnd, () => "End"),
        ],
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("web-top-bar-root");
    expect(wrapper.classes().join(" ")).toContain("grid-cols-[1fr_auto_1fr]");
    expect(wrapper.get("[data-slot=web-top-bar-start]").text()).toBe("Start");
    expect(wrapper.get("[data-slot=web-top-bar-center]").text()).toBe("Search");
    expect(wrapper.get("[data-slot=web-top-bar-end]").text()).toBe("End");
  });
});
