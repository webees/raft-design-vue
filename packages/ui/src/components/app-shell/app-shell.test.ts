import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, ref } from "vue";

import {
  AppShellMainSlot,
  AppShellPanelSlot,
  AppShellRailSlot,
  AppShellRoot,
  AppShellSidebarSlot,
  AppShellSidebarTrigger,
} from ".";

const Example = defineComponent({
  props: {
    collapsible: { type: Boolean, default: true },
  },
  setup(props) {
    const open = ref(true);
    return { open, props };
  },
  render() {
    return h(
      AppShellRoot,
      {
        sidebarCollapsible: this.props.collapsible,
        sidebarOpen: this.open,
        onSidebarOpenChange: (next: boolean) => {
          this.open = next;
        },
      },
      {
        default: () => [
          h(AppShellRailSlot, () => "Rail"),
          h(AppShellSidebarSlot, () => [
            h(AppShellSidebarTrigger, () => "Toggle"),
            h("span", "Sidebar"),
          ]),
          h(AppShellMainSlot, () => "Main"),
          h(AppShellPanelSlot, () => "Panel"),
        ],
      },
    );
  },
});

describe("AppShell", () => {
  it("renders slots and exposes the expanded state", () => {
    const wrapper = mount(Example);
    expect(wrapper.find('[data-slot="app-shell-rail-slot"]').text()).toBe("Rail");
    expect(wrapper.find('[data-slot="app-shell-main-slot"]').text()).toBe("Main");
    expect(wrapper.find('[data-slot="app-shell-root"]').attributes("data-state")).toBe(
      "expanded",
    );
  });

  it("toggles the sidebar from the trigger and links aria-controls", async () => {
    const wrapper = mount(Example);
    const trigger = wrapper.find('[aria-label="Collapse sidebar"]');
    const sidebar = wrapper.find('[data-slot="app-shell-sidebar-slot"]');

    expect(trigger.attributes("aria-expanded")).toBe("true");
    expect(trigger.attributes("aria-controls")).toBe(sidebar.attributes("id"));

    await trigger.trigger("click");

    expect(trigger.attributes("aria-expanded")).toBe("false");
    expect(sidebar.attributes("inert")).toBeDefined();
    expect(wrapper.find('[data-slot="app-shell-root"]').attributes("data-state")).toBe(
      "collapsed",
    );
  });

  it("renders no trigger when the sidebar is not collapsible", () => {
    const wrapper = mount(Example, { props: { collapsible: false } });
    expect(wrapper.find('[data-slot="app-shell-sidebar-trigger"]').exists()).toBe(false);
    expect(wrapper.find('[data-slot="app-shell-root"]').attributes("data-state")).toBeUndefined();
  });
});
