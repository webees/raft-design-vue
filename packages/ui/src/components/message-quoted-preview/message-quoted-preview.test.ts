import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import {
  MessageQuotedPreview,
  MessageQuotedPreviewAttachment,
  MessageQuotedPreviewAttachments,
  MessageQuotedPreviewAuthor,
  MessageQuotedPreviewAuthorName,
  MessageQuotedPreviewChannel,
  MessageQuotedPreviewContent,
  MessageQuotedPreviewHeader,
  MessageQuotedPreviewText,
  MessageQuotedPreviewTimestamp,
  MessageQuotedPreviewUnavailable,
} from ".";

describe("MessageQuotedPreview", () => {
  it("renders a quoted bar with header, text and attachments", () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(MessageQuotedPreview, () => [
            h(MessageQuotedPreviewHeader, () => [
              h(MessageQuotedPreviewChannel, () => "#design"),
              h(MessageQuotedPreviewAuthor, () => [
                h(MessageQuotedPreviewAuthorName, () => "Mira"),
              ]),
              h(MessageQuotedPreviewTimestamp, () => "12:04"),
            ]),
            h(MessageQuotedPreviewContent, () => [
              h(MessageQuotedPreviewText, () => "Earlier note"),
              h(MessageQuotedPreviewAttachments, () => [
                h(MessageQuotedPreviewAttachment, () => "spec.pdf"),
              ]),
            ]),
          ]);
        },
      }),
    );

    expect(wrapper.find('[data-slot="message-embed"]').attributes("data-frame")).toBe("bar");
    expect(wrapper.find('[data-slot="message-quoted-preview-channel"]').text()).toBe("#design");
    expect(wrapper.find('[data-slot="message-quoted-preview-text"]').text()).toBe("Earlier note");
    expect(wrapper.find('[data-slot="message-quoted-preview-attachment"]').text()).toBe("spec.pdf");
  });

  it("renders the unavailable note as a focusable block", () => {
    const wrapper = mount(MessageQuotedPreviewUnavailable, {
      attrs: { tabindex: "0" },
      slots: { default: "Message deleted" },
    });
    expect(wrapper.attributes("tabindex")).toBe("0");
    expect(wrapper.text()).toBe("Message deleted");
  });
});
