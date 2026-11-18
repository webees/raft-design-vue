import { createSlotComponent } from "../../lib/create-slot-component";
import { composerAttachment } from "./composer-attachment.recipe";

const {
  attachments,
  attachment,
  attachmentFile,
  attachmentImage,
  attachmentBody,
  attachmentTitle,
  attachmentMeta,
  attachmentUploadingOverlay,
  attachmentFailedOverlay,
} = composerAttachment();

export const ComposerAttachments = createSlotComponent({
  name: "RaftComposerAttachments",
  tag: "div",
  dataSlot: "composer-attachments",
  classes: (className) => attachments({ class: className }),
});

export const ComposerAttachment = createSlotComponent({
  name: "RaftComposerAttachment",
  tag: "div",
  dataSlot: "composer-attachment",
  classes: (className) => attachment({ class: className }),
});

export const ComposerAttachmentFile = createSlotComponent({
  name: "RaftComposerAttachmentFile",
  tag: "span",
  dataSlot: "composer-attachment-file",
  classes: (className) => attachmentFile({ class: className }),
});

export const ComposerAttachmentImage = createSlotComponent({
  name: "RaftComposerAttachmentImage",
  tag: "span",
  dataSlot: "composer-attachment-image",
  classes: (className) => attachmentImage({ class: className }),
});

export const ComposerAttachmentBody = createSlotComponent({
  name: "RaftComposerAttachmentBody",
  tag: "span",
  dataSlot: "composer-attachment-body",
  classes: (className) => attachmentBody({ class: className }),
});

export const ComposerAttachmentTitle = createSlotComponent({
  name: "RaftComposerAttachmentTitle",
  tag: "span",
  dataSlot: "composer-attachment-title",
  classes: (className) => attachmentTitle({ class: className }),
});

export const ComposerAttachmentMeta = createSlotComponent({
  name: "RaftComposerAttachmentMeta",
  tag: "span",
  dataSlot: "composer-attachment-meta",
  classes: (className) => attachmentMeta({ class: className }),
});

export const ComposerAttachmentUploadingOverlay = createSlotComponent({
  name: "RaftComposerAttachmentUploadingOverlay",
  tag: "span",
  dataSlot: "composer-attachment-uploading-overlay",
  classes: (className) => attachmentUploadingOverlay({ class: className }),
});

export const ComposerAttachmentFailedOverlay = createSlotComponent({
  name: "RaftComposerAttachmentFailedOverlay",
  tag: "span",
  dataSlot: "composer-attachment-failed-overlay",
  classes: (className) => attachmentFailedOverlay({ class: className }),
});
