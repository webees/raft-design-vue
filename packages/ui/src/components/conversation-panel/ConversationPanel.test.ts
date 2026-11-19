import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  ConversationPanelBody,
  ConversationPanelContent,
  ConversationPanelEmptyState,
  ConversationPanelEmptyStateBrand,
  ConversationPanelEmptyStateBrandMark,
  ConversationPanelFooter,
  ConversationPanelRoot,
  ConversationPanelTabs,
} from ".";

describe("ConversationPanel", () => {
  it("composes a full-height conversation column", () => {
    const wrapper = mount(ConversationPanelRoot, {
      slots: {
        default: () => [
          h(ConversationPanelTabs, () => "Tabs"),
          h(ConversationPanelContent, () => [
            h(ConversationPanelBody, () => "Messages"),
            h(ConversationPanelFooter, () => "Composer"),
          ]),
        ],
      },
    });
    expect(wrapper.attributes("data-slot")).toBe("conversation-panel-root");
    expect(wrapper.attributes("data-edge")).toBe("inset");
    expect(wrapper.find("[data-slot=conversation-panel-tabs]").text()).toBe("Tabs");
    expect(wrapper.find("[data-slot=conversation-panel-body]").text()).toBe("Messages");
    expect(wrapper.find("[data-slot=conversation-panel-footer]").text()).toBe("Composer");
  });

  it("renders the upstream empty state hierarchy", () => {
    const wrapper = mount(ConversationPanelEmptyState, {
      slots: {
        default: () => [
          h(ConversationPanelEmptyStateBrand, () => [
            h(ConversationPanelEmptyStateBrandMark, () => h("svg", { "data-test": "mark" })),
          ]),
          h("span", "Pick a conversation"),
        ],
      },
    });
    expect(wrapper.find("[data-slot=conversation-panel-empty-state]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=conversation-panel-empty-state-brand]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=conversation-panel-empty-state-brand-mark]").exists()).toBe(
      true,
    );
    expect(wrapper.text()).toContain("Pick a conversation");
  });

  it("forwards class and supports asChild", () => {
    const wrapper = mount(ConversationPanelContent, {
      attrs: { class: "custom" },
      props: { asChild: true },
      slots: { default: () => h("main", "Content") },
    });
    expect(wrapper.element.tagName).toBe("MAIN");
    expect(wrapper.classes()).toContain("custom");
  });
});
