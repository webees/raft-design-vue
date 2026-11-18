import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, ref } from "vue";
import Tabs from "./Tabs.vue";
import TabsList from "./TabsList.vue";
import TabsPanel from "./TabsPanel.vue";
import TabsTab from "./TabsTab.vue";

describe("Tabs", () => {
  const Harness = defineComponent({
    components: { Tabs, TabsList, TabsTab, TabsPanel },
    setup: () => ({ value: ref("overview") }),
    template: `
      <Tabs v-model="value" aria-label="Project sections">
        <TabsList aria-label="Project sections">
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="activity">Activity</TabsTab>
        </TabsList>
        <TabsPanel value="overview">Overview panel</TabsPanel>
        <TabsPanel value="activity">Activity panel</TabsPanel>
      </Tabs>
    `,
  });

  it("renders tabs and only the active panel", () => {
    const wrapper = mount(Harness);
    expect(wrapper.find("[data-slot='tabs']").attributes("data-orientation")).toBe("horizontal");
    expect(wrapper.findAll("[data-slot='tabs-tab']")).toHaveLength(2);
    expect(wrapper.text()).toContain("Overview panel");
    expect(wrapper.text()).not.toContain("Activity panel");
  });

  it("moves the active marker with the model", async () => {
    const wrapper = mount(Harness);
    const tabs = wrapper.findAll("[data-slot='tabs-tab']");
    expect(tabs[0]?.attributes("data-active")).toBe("");
    await tabs[1]?.trigger("mousedown");
    expect(wrapper.vm.value).toBe("activity");
    expect(wrapper.text()).toContain("Activity panel");
  });
});
