import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import SystemMessage from "./SystemMessage.vue";
import SystemMessageTime from "./SystemMessageTime.vue";
import SystemMessageContent from "./SystemMessageContent.vue";
import SystemMessageGroup from "./SystemMessageGroup.vue";
import SystemMessageGroupHeader from "./SystemMessageGroupHeader.vue";
import SystemMessageGroupDisclosure from "./SystemMessageGroupDisclosure.vue";
import SystemMessageGroupChevron from "./SystemMessageGroupChevron.vue";
import SystemMessageGroupSummary from "./SystemMessageGroupSummary.vue";
import SystemMessageGroupPanel from "./SystemMessageGroupPanel.vue";

describe("SystemMessage", () => {
  it("renders a system note with time and content", () => {
    const wrapper = mount(SystemMessage, {
      slots: {
        default: () => [
          h(SystemMessageTime, () => "09:41"),
          h(SystemMessageContent, () => "Channel renamed to #launch"),
        ],
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("system-message-item");
    expect(wrapper.get("[data-slot=system-message-item-time]").text()).toBe("09:41");
    expect(wrapper.get("[data-slot=system-message-item-content]").text()).toBe(
      "Channel renamed to #launch",
    );
    expect(wrapper.classes().join(" ")).toContain("font-mono");
  });

  it("exposes a title on string content", () => {
    const wrapper = mount(SystemMessageContent, {
      slots: { default: () => "A very long system note" },
    });
    expect(wrapper.attributes("title")).toBe("A very long system note");
  });

  it("collapses a system message group", async () => {
    const wrapper = mount(SystemMessageGroup, {
      props: { defaultOpen: true },
      slots: {
        default: () => [
          h(SystemMessageGroupHeader, () => [
            h(SystemMessageGroupDisclosure, () => [
              h(SystemMessageGroupChevron),
              h(SystemMessageGroupSummary, () => "3 system messages"),
            ]),
          ]),
          h(SystemMessageGroupPanel, () => [
            h(SystemMessage, () => [h(SystemMessageContent, () => "Joined")]),
          ]),
        ],
      },
    });

    const disclosure = wrapper.get("[data-slot=system-message-group-disclosure]");
    expect(disclosure.attributes("data-state")).toBe("open");
    expect(wrapper.find("[data-slot=system-message-group-panel]").exists()).toBe(true);

    await disclosure.trigger("click");
    await wrapper.vm.$nextTick();

    expect(disclosure.attributes("data-state")).toBe("closed");
    expect(wrapper.get("[data-slot=system-message-group-panel]").attributes("data-state")).toBe(
      "closed",
    );
  });
});
