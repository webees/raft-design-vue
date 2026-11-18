import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuFooter,
  ContextMenuItem,
  ContextMenuItemLabel,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from ".";

const Example = defineComponent({
  render() {
    return h(ContextMenu, () => [
      h(ContextMenuTrigger, () => "Right-click me"),
    ]);
  },
});

const ContentExample = defineComponent({
  render() {
    return h(ContextMenu, { modal: false }, () => [
      h(ContextMenuTrigger, () => "Right-click me"),
      h(ContextMenuContent, { forceMount: true }, () => [
        h(ContextMenuLabel, () => "Actions"),
        h(ContextMenuItem, () => [h(ContextMenuItemLabel, () => "Open"), h(ContextMenuShortcut, () => "↵")]),
        h(ContextMenuSeparator),
        h(ContextMenuFooter, () => "raft.build"),
      ]),
    ]);
  },
});

describe("ContextMenu", () => {
  it("renders the trigger", () => {
    const wrapper = mount(Example);
    expect(wrapper.find('[data-slot="context-menu-trigger"]').text()).toBe("Right-click me");
  });

  it("renders the full menu surface when forced", () => {
    const wrapper = mount(ContentExample, { attachTo: document.body });
    const content = document.querySelector('[data-slot="context-menu-content"]');
    expect(content?.textContent).toContain("Actions");
    expect(content?.textContent).toContain("Open");
    expect(content?.textContent).toContain("↵");
    expect(content?.textContent).toContain("raft.build");
    wrapper.unmount();
  });
});
