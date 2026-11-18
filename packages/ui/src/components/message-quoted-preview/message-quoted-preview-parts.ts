import { computed, defineComponent, h, useAttrs } from "vue";

import { messageQuotedPreview } from "./message-quoted-preview.variants";

const parts = {
  Channel: { tag: "span", slot: "channel" },
  Thread: { tag: "span", slot: "thread" },
  Author: { tag: "span", slot: "author" },
  AuthorName: { tag: "span", slot: "authorName" },
  AuthorMeta: { tag: "span", slot: "authorMeta" },
  AuthorDelegatedBy: { tag: "span", slot: "authorDelegatedBy" },
  Timestamp: { tag: "span", slot: "timestamp" },
  Text: { tag: "div", slot: "text" },
  Attachments: { tag: "div", slot: "attachments" },
  Attachment: { tag: "span", slot: "attachment" },
  Unavailable: { tag: "div", slot: "unavailable" },
} as const;

type PartName = keyof typeof parts;

export function createMessageQuotedPreviewPart(name: PartName) {
  const { tag, slot } = parts[name];
  const kebab = name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`).replace(/^-/, "");
  return defineComponent({
    name: `RaftMessageQuotedPreview${name}`,
    inheritAttrs: false,
    setup(_, { slots }) {
      const attrs = useAttrs();
      const rootClass = computed(() =>
        messageQuotedPreview()[slot]({ className: attrs.class as string | undefined }),
      );
      return () => {
        const { class: _class, ...rest } = attrs;
        return h(
          tag,
          {
            ...rest,
            "data-slot": `message-quoted-preview-${kebab}`,
            class: rootClass.value,
          },
          slots.default?.(),
        );
      };
    },
  });
}

export const MessageQuotedPreviewChannel = createMessageQuotedPreviewPart("Channel");
export const MessageQuotedPreviewThread = createMessageQuotedPreviewPart("Thread");
export const MessageQuotedPreviewAuthor = createMessageQuotedPreviewPart("Author");
export const MessageQuotedPreviewAuthorName = createMessageQuotedPreviewPart("AuthorName");
export const MessageQuotedPreviewAuthorMeta = createMessageQuotedPreviewPart("AuthorMeta");
export const MessageQuotedPreviewAuthorDelegatedBy =
  createMessageQuotedPreviewPart("AuthorDelegatedBy");
export const MessageQuotedPreviewTimestamp = createMessageQuotedPreviewPart("Timestamp");
export const MessageQuotedPreviewText = createMessageQuotedPreviewPart("Text");
export const MessageQuotedPreviewAttachments = createMessageQuotedPreviewPart("Attachments");
export const MessageQuotedPreviewAttachment = createMessageQuotedPreviewPart("Attachment");
export const MessageQuotedPreviewUnavailable = createMessageQuotedPreviewPart("Unavailable");
