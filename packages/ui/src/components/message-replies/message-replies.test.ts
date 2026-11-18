import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MessageReplies from "./MessageReplies.vue";
import MessageRepliesItem from "./MessageRepliesItem.vue";
import MessageRepliesItemContent from "./MessageRepliesItemContent.vue";
import MessageRepliesItemSender from "./MessageRepliesItemSender.vue";
import MessageRepliesItemTime from "./MessageRepliesItemTime.vue";
import MessageRepliesSummary from "./MessageRepliesSummary.vue";
import MessageRepliesSummaryItem from "./MessageRepliesSummaryItem.vue";

describe("message-replies", () => {
  it("renders the replies face as a message embed button", () => {
    const wrapper = mount(MessageReplies, { slots: { default: "3 replies" } });

    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("data-slot")).toBe("message-embed");
    expect(wrapper.classes()).toContain("bg-fill-muted");
    expect(wrapper.text()).toBe("3 replies");
  });

  it("renders the summary with a sticker count", () => {
    const summary = mount(MessageRepliesSummary, {
      slots: { default: "<strong>3</strong> replies" },
    });
    const item = mount(MessageRepliesSummaryItem, { slots: { default: "replies" } });

    expect(summary.attributes("data-slot")).toBe("message-replies-summary");
    expect(summary.classes()).toContain("text-footnote");
    expect(item.classes()).toContain("gap-0.5");
  });

  it("renders a reply row with sender, content and time", () => {
    const wrapper = mount({
      components: {
        MessageRepliesItem,
        MessageRepliesItemSender,
        MessageRepliesItemContent,
        MessageRepliesItemTime,
      },
      template: `
        <MessageRepliesItem>
          <MessageRepliesItemSender>Ada</MessageRepliesItemSender>
          <MessageRepliesItemContent>Ship it</MessageRepliesItemContent>
          <MessageRepliesItemTime>09:41</MessageRepliesItemTime>
        </MessageRepliesItem>
      `,
    });

    expect(wrapper.get("[data-slot=message-replies-item-sender]").classes()).toContain(
      "text-foreground-muted",
    );
    expect(wrapper.get("[data-slot=message-replies-item-content]").text()).toBe("Ship it");
    expect(wrapper.get("[data-slot=message-replies-item-time]").element.tagName).toBe("TIME");
  });
});
