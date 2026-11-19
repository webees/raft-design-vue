import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MessageEmbed from "./MessageEmbed.vue";
import MessageEmbedHeader from "./MessageEmbedHeader.vue";
import MessageEmbedContent from "./MessageEmbedContent.vue";
import MessageEmbedFooter from "./MessageEmbedFooter.vue";

describe("MessageEmbed", () => {
  it("renders header, content and footer", () => {
    const wrapper = mount(MessageEmbed, {
      props: { size: "item", interactive: true },
      slots: {
        default: () => [
          h(MessageEmbedHeader, () => "Raft"),
          h(MessageEmbedContent, () => "A link preview"),
          h(MessageEmbedFooter, () => "raft.build"),
        ],
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("message-embed");
    expect(wrapper.attributes("data-interactive")).toBe("true");
    expect(wrapper.classes().join(" ")).toContain("max-w-[400px]");
    expect(wrapper.find("[data-slot=message-embed-header]").text()).toBe("Raft");
    expect(wrapper.find("[data-slot=message-embed-content]").text()).toBe("A link preview");
    expect(wrapper.find("[data-slot=message-embed-footer]").text()).toBe("raft.build");
  });

  it("sets the content width", () => {
    const wrapper = mount(MessageEmbed, { props: { size: "content" } });
    expect(wrapper.classes().join(" ")).toContain("max-w-[560px]");
    expect(wrapper.attributes("data-interactive")).toBeUndefined();
  });
});
