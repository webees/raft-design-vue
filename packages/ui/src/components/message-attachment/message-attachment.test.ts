import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import {
  MessageAttachmentAction,
  MessageAttachmentCard,
  MessageAttachmentGroup,
  MessageAttachmentMeta,
  MessageAttachmentMetaEnd,
  MessageAttachmentMetaStart,
  MessageAttachmentTitle,
  MessageImageGallery,
  MessageImageGalleryItem,
  MessageImageGalleryMedia,
  MessageImageGalleryRow,
  MessageVideoPreview,
  MessageVideoPreviewAction,
  buildMessageImageGalleryRows,
} from ".";

describe("MessageAttachment", () => {
  it("renders a file card with its meta", () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(MessageAttachmentGroup, () =>
            h(MessageAttachmentCard, { href: "https://example.com/spec.pdf" }, () => [
              h(MessageAttachmentTitle, () => "spec.pdf"),
              h(MessageAttachmentMeta, () => [
                h(MessageAttachmentMetaStart, () => "PDF · 2.4 MB"),
                h(MessageAttachmentMetaEnd, () => "2d"),
              ]),
              h(MessageAttachmentAction, () => "⋯"),
            ]),
          );
        },
      }),
    );

    expect(wrapper.find('[data-slot="message-attachment-card"]').attributes("href")).toBe(
      "https://example.com/spec.pdf",
    );
    expect(wrapper.find('[data-slot="message-attachment-title"]').text()).toBe("spec.pdf");
    expect(wrapper.find('[data-slot="message-attachment-meta-start"]').text()).toBe("PDF · 2.4 MB");
    expect(wrapper.find('[data-slot="message-attachment-action"]').attributes("type")).toBe(
      "button",
    );
  });

  it("builds gallery rows from image proportions", () => {
    const rows = buildMessageImageGalleryRows([
      { width: 1200, height: 400 },
      { width: 300, height: 300 },
      { width: 300, height: 300 },
      { width: 300, height: 300 },
      { width: 200, height: 500 },
    ]);

    expect(rows.map((row) => row.items.length)).toEqual([1, 2, 2]);
    expect(rows[0]!.items[0]!.fit).toBe("contain");
    expect(rows[1]!.items[0]!.fit).toBe("cover");
    expect(rows[2]!.items[0]!.fit).toBe("cover");
    expect(rows[2]!.items[1]!.fit).toBe("contain");

    const single = buildMessageImageGalleryRows([{ width: 800, height: 600 }]);
    expect(single[0]!.items[0]!.reserved).toEqual({
      width: "min(384px, 100%)",
      aspectRatio: "800 / 600",
    });
  });

  it("renders a gallery row and its items", () => {
    const rows = buildMessageImageGalleryRows([
      { width: 300, height: 300 },
      { width: 300, height: 300 },
    ]);
    const wrapper = mount(
      defineComponent({
        render() {
          return h(MessageImageGallery, () =>
            h(MessageImageGalleryRow, { row: rows[0]! }, () =>
              rows[0]!.items.map((layout) =>
                h(MessageImageGalleryItem, { layout, key: layout.index }, () =>
                  h(MessageImageGalleryMedia, () =>
                    h("img", { src: `https://example.com/${layout.index}.png`, alt: "" }),
                  ),
                ),
              ),
            ),
          );
        },
      }),
    );

    expect(wrapper.find('[data-slot="message-image-gallery-row"]').attributes("data-count")).toBe(
      "2",
    );
    expect(wrapper.findAll('[data-slot="message-image-gallery-item"]')).toHaveLength(2);
  });

  it("renders the video preview frame and action", () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(MessageVideoPreview, () => h(MessageVideoPreviewAction, () => "⋮"));
        },
      }),
    );
    expect(wrapper.find('[data-slot="message-video-preview"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="message-video-preview-action"]').text()).toBe("⋮");
  });
});
