import { createSlotPart } from "../../lib/slot-part";
import {
  messageForwardedBundle,
  messageForwardedBundleItem,
} from "./message-forwarded-bundle.recipes";

function part(name: string, tag: string, dataSlot: string, style: () => string) {
  return createSlotPart({ name, tag, dataSlot, className: () => style() });
}

export const MessageForwardedBundleHeader = part(
  "RaftMessageForwardedBundleHeader",
  "div",
  "message-forwarded-bundle-header",
  () => messageForwardedBundle().header(),
);
export const MessageForwardedBundleHeaderContent = part(
  "RaftMessageForwardedBundleHeaderContent",
  "div",
  "message-forwarded-bundle-header-content",
  () => messageForwardedBundle().headerContent(),
);
export const MessageForwardedBundleHeaderLabel = part(
  "RaftMessageForwardedBundleHeaderLabel",
  "span",
  "message-forwarded-bundle-header-label",
  () => messageForwardedBundle().headerLabel(),
);
export const MessageForwardedBundleHeaderCount = part(
  "RaftMessageForwardedBundleHeaderCount",
  "span",
  "message-forwarded-bundle-header-count",
  () => messageForwardedBundle().headerCount(),
);
export const MessageForwardedBundleSource = part(
  "RaftMessageForwardedBundleSource",
  "button",
  "message-forwarded-bundle-source",
  () => messageForwardedBundle().source(),
);
export const MessageForwardedBundleSourceLabel = part(
  "RaftMessageForwardedBundleSourceLabel",
  "span",
  "message-forwarded-bundle-source-label",
  () => messageForwardedBundle().sourceLabel(),
);
export const MessageForwardedBundleItem = part(
  "RaftMessageForwardedBundleItem",
  "article",
  "message-forwarded-bundle-item",
  () => messageForwardedBundleItem().root(),
);
export const MessageForwardedBundleItemMeta = part(
  "RaftMessageForwardedBundleItemMeta",
  "div",
  "message-forwarded-bundle-item-meta",
  () => messageForwardedBundleItem().meta(),
);
export const MessageForwardedBundleItemAuthor = part(
  "RaftMessageForwardedBundleItemAuthor",
  "span",
  "message-forwarded-bundle-item-author",
  () => messageForwardedBundleItem().author(),
);
export const MessageForwardedBundleItemContent = part(
  "RaftMessageForwardedBundleItemContent",
  "div",
  "message-forwarded-bundle-item-content",
  () => messageForwardedBundleItem().itemContent(),
);
export const MessageForwardedBundleAttachments = part(
  "RaftMessageForwardedBundleAttachments",
  "div",
  "message-forwarded-bundle-attachments",
  () => messageForwardedBundleItem().attachments(),
);
export const MessageForwardedBundleAttachmentName = part(
  "RaftMessageForwardedBundleAttachmentName",
  "span",
  "message-forwarded-bundle-attachment-name",
  () => messageForwardedBundleItem().attachmentName(),
);
export const MessageForwardedBundleAttachmentMeta = part(
  "RaftMessageForwardedBundleAttachmentMeta",
  "span",
  "message-forwarded-bundle-attachment-meta",
  () => messageForwardedBundleItem().attachmentMeta(),
);
