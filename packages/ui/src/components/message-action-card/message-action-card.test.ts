import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import MessageActionCard from "./MessageActionCard.vue";
import MessageActionCardCollapseTrigger from "./MessageActionCardCollapseTrigger.vue";
import MessageActionCardContent from "./MessageActionCardContent.vue";

describe("MessageActionCard", () => {
  it("puts the collapsible state and the group on the card itself", () => {
    const wrapper = mount(MessageActionCard, {
      slots: {
        default: `
          <MessageActionCardCollapseTrigger />
          <MessageActionCardContent><p>Details</p></MessageActionCardContent>
        `,
      },
      global: { components: { MessageActionCardCollapseTrigger, MessageActionCardContent } },
    });

    const card = wrapper.find("[data-slot=message-action-card]");
    expect(card.classes()).toContain("group/action-card");
    expect(card.attributes("data-state")).toBe("open");
  });

  it("toggles the card state from the collapse trigger", async () => {
    const wrapper = mount(MessageActionCard, {
      slots: {
        default: `
          <MessageActionCardCollapseTrigger />
          <MessageActionCardContent><p>Details</p></MessageActionCardContent>
        `,
      },
      global: { components: { MessageActionCardCollapseTrigger, MessageActionCardContent } },
    });

    await wrapper.find("[data-slot=message-action-card-collapse-trigger]").trigger("click");
    await nextTick();

    expect(wrapper.find("[data-slot=message-action-card]").attributes("data-state")).toBe("closed");
  });
});
