import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { TabsRoot } from "reka-ui";

import SortableTabsList from "./SortableTabsList.vue";
import SortableTabsTab from "./SortableTabsTab.vue";

const tabs = ["a", "b", "c"];

function mountTabs() {
  return mount(
    {
      components: { TabsRoot, SortableTabsList, SortableTabsTab },
      setup: () => ({ tabs, selected: ref("a") }),
      template: `
        <TabsRoot :model-value="selected" @update:model-value="selected = $event">
          <SortableTabsList :value="tabs" aria-label="Sections">
            <SortableTabsTab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</SortableTabsTab>
          </SortableTabsList>
        </TabsRoot>
      `,
    },
    { attachTo: document.body },
  );
}

describe("SortableTabs", () => {
  it("renders the tabs", () => {
    const wrapper = mountTabs();
    expect(wrapper.findAll("[data-slot=tabs-tab]")).toHaveLength(3);
    wrapper.unmount();
  });

  it("reorders with the keyboard and emits the new order", async () => {
    const wrapper = mountTabs();
    const first = wrapper.findAll("[data-slot=tabs-tab]")[0]!;

    await first.trigger("keydown", { code: "Space" });
    await first.trigger("keydown", { code: "ArrowRight" });
    await first.trigger("keydown", { code: "Space" });

    const list = wrapper.findComponent(SortableTabsList);
    expect(list.emitted("reorder")?.at(-1)).toEqual([["b", "a", "c"]]);
    wrapper.unmount();
  });
});
