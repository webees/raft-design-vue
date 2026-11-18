import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import MessageItem from "./MessageItem.vue";
import {
  MessageItemBadge,
  MessageItemBadgeSeparator,
  MessageItemSavedIndicator,
} from "./message-footer-parts";
import {
  MessageItemBody,
  MessageItemSenderButton,
  MessageItemTrailing,
} from "./message-item-parts";
import { MessageReactionChip } from "./message-reaction-parts";

describe("MessageItem", () => {
  it("renders the root slot contract", () => {
    const wrapper = mount(MessageItem, {
      attrs: { class: "custom-item", id: "item-1" },
      props: { compact: true, located: true },
      slots: { default: () => h("div", { class: "body" }, "hi") },
    });

    expect(wrapper.attributes("data-slot")).toBe("message-item");
    expect(wrapper.attributes("id")).toBe("item-1");
    expect(wrapper.attributes("data-compact")).toBe("true");
    expect(wrapper.attributes("data-located")).toBe("");
    expect(wrapper.classes()).toContain("custom-item");
    expect(wrapper.find(".body").text()).toBe("hi");
  });

  it("renders as a child element when asChild is set", () => {
    const wrapper = mount(MessageItem, {
      props: { asChild: true },
      slots: { default: () => h("article", { class: "article" }, "content") },
    });
    expect(wrapper.find("article.article").exists()).toBe(true);
  });

  it("registers a sender button as the row label", () => {
    const wrapper = mount(MessageItem, {
      slots: {
        default: () =>
          h(MessageItemSenderButton, { id: "sender-button" }, () => "Ada"),
      },
    });

    const button = wrapper.find('[data-slot="message-item-sender-button"]');
    expect(button.attributes("id")).toBe("sender-button");
    expect(button.attributes("type")).toBe("button");
    expect(wrapper.attributes("aria-labelledby")).toBe("sender-button");
    expect(wrapper.attributes("role")).toBe("article");
  });

  it("marks the last text line for the trailing slot", async () => {
    const wrapper = mount(MessageItem, {
      slots: {
        default: () =>
          h(MessageItemBody, null, () => [
            h("p", null, "First"),
            h("p", null, "Last"),
            h(MessageItemTrailing, null, () => "Read"),
          ]),
      },
    });
    await wrapper.vm.$nextTick();

    const body = wrapper.get('[data-slot="message-item-body"]');
    const lines = body.findAll("[data-trailing-line]");
    expect(lines).toHaveLength(1);
    expect(lines.at(-1)!.text()).toBe("Last");
    expect(body.attributes("data-trailing")).toBe("line");
  });

  it("marks a body ending in a block instead of a text line", async () => {
    const wrapper = mount(MessageItem, {
      slots: {
        default: () =>
          h(MessageItemBody, null, () => [
            h("pre", null, "code"),
            h(MessageItemTrailing, null, () => "Read"),
          ]),
      },
    });
    await wrapper.vm.$nextTick();

    const body = wrapper.get('[data-slot="message-item-body"]');
    expect(body.find("[data-trailing-line]").exists()).toBe(false);
    expect(body.attributes("data-trailing")).toBe("block");
  });
});

describe("MessageItem footer parts", () => {
  it("renders the badge with the soft muted badge recipe", () => {
    const wrapper = mount(MessageItemBadge, {
      props: { status: "unread" },
      slots: { default: () => "Unread" },
    });
    expect(wrapper.attributes("data-slot")).toBe("message-item-badge");
    expect(wrapper.classes()).toContain("text-foreground");
  });

  it("keeps the badge separator out of the accessibility tree", () => {
    const wrapper = mount(MessageItemBadgeSeparator);
    expect(wrapper.attributes("aria-hidden")).toBe("true");
  });

  it("switches the saved indicator to the icon-only recipe", () => {
    const wrapper = mount(MessageItemSavedIndicator, {
      props: { iconOnly: true },
      slots: { default: () => "Saved" },
    });
    expect(wrapper.classes()).toContain("size-8");
    expect(wrapper.classes()).toContain("justify-center");
  });
});

describe("MessageReactionChip", () => {
  it("toggles itself when it is uncontrolled", async () => {
    const wrapper = mount(MessageReactionChip, {
      slots: { default: () => "👍 2" },
    });
    const button = wrapper.get("button");
    expect(button.attributes("aria-pressed")).toBe("false");

    await button.trigger("click");
    expect(wrapper.emitted("update:pressed")?.at(-1)).toEqual([true]);
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("true");

    await wrapper.get("button").trigger("click");
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("false");
  });

  it("leaves the pressed state to its parent when controlled", async () => {
    const wrapper = mount(MessageReactionChip, {
      props: { pressed: false },
      slots: { default: () => "👍 2" },
    });

    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("update:pressed")?.at(-1)).toEqual([true]);
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("false");
  });
});
