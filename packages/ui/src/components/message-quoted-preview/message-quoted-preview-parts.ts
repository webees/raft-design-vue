import { fixedPartFactory } from "../../lib/slot-part";
import { messageQuotedPreview } from "./message-quoted-preview.variants";

const part = fixedPartFactory(messageQuotedPreview);

export const MessageQuotedPreviewChannel = part("MessageQuotedPreviewChannel", "channel", "span");
export const MessageQuotedPreviewThread = part("MessageQuotedPreviewThread", "thread", "span");
export const MessageQuotedPreviewAuthor = part("MessageQuotedPreviewAuthor", "author", "span");
export const MessageQuotedPreviewAuthorName = part(
  "MessageQuotedPreviewAuthorName",
  "authorName",
  "span",
);
export const MessageQuotedPreviewAuthorMeta = part(
  "MessageQuotedPreviewAuthorMeta",
  "authorMeta",
  "span",
);
export const MessageQuotedPreviewAuthorDelegatedBy = part(
  "MessageQuotedPreviewAuthorDelegatedBy",
  "authorDelegatedBy",
  "span",
);
export const MessageQuotedPreviewTimestamp = part(
  "MessageQuotedPreviewTimestamp",
  "timestamp",
  "span",
);
export const MessageQuotedPreviewText = part("MessageQuotedPreviewText", "text");
export const MessageQuotedPreviewAttachments = part(
  "MessageQuotedPreviewAttachments",
  "attachments",
);
export const MessageQuotedPreviewAttachment = part(
  "MessageQuotedPreviewAttachment",
  "attachment",
  "span",
);
export const MessageQuotedPreviewUnavailable = part(
  "MessageQuotedPreviewUnavailable",
  "unavailable",
);
