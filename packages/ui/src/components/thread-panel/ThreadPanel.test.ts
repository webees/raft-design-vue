import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  ThreadPanelActions,
  ThreadPanelBody,
  ThreadPanelFooter,
  ThreadPanelHeader,
  ThreadPanelOriginalMessage,
  ThreadPanelReplyCount,
  ThreadPanelReplySummary,
  ThreadPanelRoot,
  ThreadPanelSearch,
  ThreadPanelSearchCount,
  ThreadPanelSearchTrailing,
  ThreadPanelTitle,
  ThreadPanelTitleMeta,
} from ".";

const Thread = defineComponent({
  setup() {
    return () =>
      h(ThreadPanelRoot, () => [
        h(ThreadPanelHeader, () => [
          h(ThreadPanelTitle, () => ["Launch thread ", h(ThreadPanelTitleMeta, () => "#42")]),
          h(ThreadPanelActions, () => "Actions"),
        ]),
        h(ThreadPanelSearch, () => [
          "Search",
          h(ThreadPanelSearchTrailing, () => h(ThreadPanelSearchCount, () => "2 / 8")),
        ]),
        h(ThreadPanelBody, () => [
          h(ThreadPanelOriginalMessage, () => "Root"),
          h(ThreadPanelReplySummary, () => "Replies"),
          h(ThreadPanelReplyCount, () => "3 replies"),
        ]),
        h(ThreadPanelFooter, () => "Footer"),
      ]);
  },
});

describe("ThreadPanel", () => {
  it("renders the thread header and body hierarchy", () => {
    const wrapper = mount(Thread);
    expect(wrapper.attributes("data-slot")).toBe("thread-panel-root");
    expect(wrapper.attributes("data-edge")).toBe("attached");
    expect(wrapper.find("[data-slot=thread-panel-header]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=thread-panel-title]").text()).toContain("Launch thread");
    expect(wrapper.find("[data-slot=thread-panel-title-meta]").text()).toBe("#42");
    expect(wrapper.find("[data-slot=thread-panel-actions]").text()).toBe("Actions");
    expect(wrapper.find("[data-slot=thread-panel-reply-count]").text()).toBe("3 replies");
    expect(wrapper.find("[data-slot=thread-panel-footer]").text()).toBe("Footer");
  });

  it("exposes search composition and data slots", () => {
    const wrapper = mount(Thread);
    expect(wrapper.find("[data-slot=thread-panel-search]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=thread-panel-search-trailing]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=thread-panel-search-count]").text()).toBe("2 / 8");
  });

  it("supports asChild on a primitive part", () => {
    const wrapper = mount(ThreadPanelTitle, {
      props: { asChild: true },
      slots: { default: () => h("h1", "Title") },
    });
    expect(wrapper.element.tagName).toBe("H1");
    expect(wrapper.attributes("data-slot")).toBe("thread-panel-title");
  });
});
