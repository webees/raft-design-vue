import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";

import MessageList from "./MessageList.vue";
import {
  MessageListJumpControls,
  MessageListJumpPill,
  MessageListJumpPillDismiss,
  MessageListNotice,
} from "./parts";

function stubMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const query = {
    matches,
    media: "(max-width: 767px)",
    onchange: null,
    addEventListener: (_: string, handler: (event: MediaQueryListEvent) => void) => {
      listeners.add(handler);
    },
    removeEventListener: (_: string, handler: (event: MediaQueryListEvent) => void) => {
      listeners.delete(handler);
    },
    addListener: (handler: (event: MediaQueryListEvent) => void) => listeners.add(handler),
    removeListener: (handler: (event: MediaQueryListEvent) => void) => listeners.delete(handler),
    dispatchEvent: () => false,
  };
  vi.stubGlobal("matchMedia", () => query);
  return query;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("MessageList", () => {
  it("uses a drawn ScrollArea viewport above the phone breakpoint", () => {
    stubMatchMedia(false);
    const wrapper = mount(MessageList, {
      attrs: { class: "custom-viewport", rootClassName: "custom-root" },
      slots: { default: () => h("p", "hello") },
    });

    expect(wrapper.attributes("data-slot")).toBe("message-list");
    expect(wrapper.classes()).toContain("custom-root");

    const viewport = wrapper.find('[data-slot="message-list-viewport"]');
    expect(viewport.exists()).toBe(true);
    expect(viewport.attributes("data-slot")).toBe("message-list-viewport");
    expect(viewport.classes()).toContain("custom-viewport");
    expect(wrapper.find('[data-slot="scroll-area-content"]').text()).toBe("hello");
  });

  it("uses a native scroller below the phone breakpoint", () => {
    stubMatchMedia(true);
    const wrapper = mount(MessageList, {
      slots: { default: () => h("p", "hello") },
    });

    const viewport = wrapper.find('[data-slot="message-list-viewport"]');
    expect(viewport.exists()).toBe(true);
    expect(viewport.classes()).toContain("overflow-y-auto");
    expect(wrapper.find('[data-slot="scroll-area"]').exists()).toBe(false);
    expect(wrapper.text()).toContain("hello");
  });

  it("floats the jump controls on the requested edge", () => {
    const wrapper = mount(MessageListJumpControls, {
      props: { side: "top" },
      attrs: { class: "custom" },
    });
    expect(wrapper.attributes("data-slot")).toBe("message-list-jump-controls");
    expect(wrapper.attributes("data-side")).toBe("top");
    expect(wrapper.classes()).toContain("custom");
    expect(wrapper.classes()).toContain("top-3");
  });

  it("renders jump pills with the outline button recipe and content slot", () => {
    const wrapper = mount(MessageListJumpPill, {
      slots: { default: () => "New messages" },
    });
    const pill = wrapper.get('[data-slot="message-list-jump-pill"]');
    expect(pill.element.tagName).toBe("BUTTON");
    expect(pill.classes()).toContain("h-8");
    expect(pill.find('[data-slot="message-list-jump-pill-content"]').text()).toBe("New messages");
  });

  it("renders the dismiss pill at icon size", () => {
    const wrapper = mount(MessageListJumpPillDismiss, {
      attrs: { "aria-label": "Dismiss" },
    });
    const pill = wrapper.get('[data-slot="message-list-jump-pill-dismiss"]');
    expect(pill.attributes("aria-label")).toBe("Dismiss");
    expect(pill.classes()).toContain("size-8");
    expect(pill.find('[data-slot="message-list-jump-pill-dismiss-content"]').exists()).toBe(true);
  });

  it("applies the requested notice tone", () => {
    const wrapper = mount(MessageListNotice, {
      props: { tone: "muted" },
      slots: { default: () => "Older messages are hidden" },
    });
    expect(wrapper.classes()).toContain("text-foreground-muted");
  });
});
