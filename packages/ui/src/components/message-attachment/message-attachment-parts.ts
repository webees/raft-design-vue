import { createSlotPart } from "../../lib/slot-part";
import { messageAttachment } from "./message-attachment.variants";

export const MessageAttachmentGroup = createSlotPart({
  name: "RaftMessageAttachmentGroup",
  tag: "div",
  dataSlot: "message-attachment-group",
  className: (className) => messageAttachment().group({ className }),
});

export const MessageAttachmentCard = createSlotPart({
  name: "RaftMessageAttachmentCard",
  tag: "a",
  dataSlot: "message-attachment-card",
  className: (className) => messageAttachment().card({ className }),
});

export const MessageAttachmentTitle = createSlotPart({
  name: "RaftMessageAttachmentTitle",
  tag: "span",
  dataSlot: "message-attachment-title",
  className: (className) => messageAttachment().title({ className }),
});

export const MessageAttachmentMeta = createSlotPart({
  name: "RaftMessageAttachmentMeta",
  tag: "span",
  dataSlot: "message-attachment-meta",
  className: (className) => messageAttachment().meta({ className }),
});

export const MessageAttachmentMetaStart = createSlotPart({
  name: "RaftMessageAttachmentMetaStart",
  tag: "span",
  dataSlot: "message-attachment-meta-start",
  className: (className) => messageAttachment().metaStart({ className }),
});

export const MessageAttachmentMetaEnd = createSlotPart({
  name: "RaftMessageAttachmentMetaEnd",
  tag: "span",
  dataSlot: "message-attachment-meta-end",
  className: (className) => messageAttachment().metaEnd({ className }),
});

export const MessageAttachmentSummary = createSlotPart({
  name: "RaftMessageAttachmentSummary",
  tag: "span",
  dataSlot: "message-attachment-summary",
  className: (className) => messageAttachment().summary({ className }),
});

export const MessageAttachmentCommentSummary = createSlotPart({
  name: "RaftMessageAttachmentCommentSummary",
  tag: "span",
  dataSlot: "message-attachment-comment-summary",
  className: (className) => messageAttachment().commentSummary({ className }),
});

export const MessageAttachmentDiffSummary = createSlotPart({
  name: "RaftMessageAttachmentDiffSummary",
  tag: "span",
  dataSlot: "message-attachment-diff-summary",
  className: (className) => messageAttachment().diffSummary({ className }),
});

export const MessageAttachmentDiffAddition = createSlotPart({
  name: "RaftMessageAttachmentDiffAddition",
  tag: "span",
  dataSlot: "message-attachment-diff-addition",
  className: (className) => messageAttachment().diffAddition({ className }),
});

export const MessageAttachmentDiffDeletion = createSlotPart({
  name: "RaftMessageAttachmentDiffDeletion",
  tag: "span",
  dataSlot: "message-attachment-diff-deletion",
  className: (className) => messageAttachment().diffDeletion({ className }),
});

export const MessageAttachmentAction = createSlotPart({
  name: "RaftMessageAttachmentAction",
  tag: "button",
  dataSlot: "message-attachment-action",
  className: (className) => messageAttachment().action({ className }),
  type: "button",
});
