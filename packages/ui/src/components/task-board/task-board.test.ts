import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import { TaskBoardColumnChevron } from "./index";

describe("TaskBoardColumnChevron", () => {
  it("draws the default chevron", () => {
    const wrapper = mount(TaskBoardColumnChevron);
    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it("replaces the chevron when the caller renders its own", () => {
    const wrapper = mount(TaskBoardColumnChevron, {
      slots: { default: () => h("span", { "data-test": "own" }, "own") },
    });
    expect(wrapper.find("svg").exists()).toBe(false);
    expect(wrapper.find('[data-test="own"]').exists()).toBe(true);
  });
});
