import { recipePartFactory } from "../../lib/slot-part";
import { composerAttachment } from "./composer-attachment.recipe";

const part = recipePartFactory(composerAttachment);

export const ComposerAttachments = part("ComposerAttachments", "attachments");
export const ComposerAttachment = part("ComposerAttachment", "attachment");
export const ComposerAttachmentFile = part("ComposerAttachmentFile", "attachmentFile", "span");
export const ComposerAttachmentImage = part("ComposerAttachmentImage", "attachmentImage", "span");
export const ComposerAttachmentBody = part("ComposerAttachmentBody", "attachmentBody", "span");
export const ComposerAttachmentTitle = part("ComposerAttachmentTitle", "attachmentTitle", "span");
export const ComposerAttachmentMeta = part("ComposerAttachmentMeta", "attachmentMeta", "span");
export const ComposerAttachmentUploadingOverlay = part(
  "ComposerAttachmentUploadingOverlay",
  "attachmentUploadingOverlay",
  "span",
);
export const ComposerAttachmentFailedOverlay = part(
  "ComposerAttachmentFailedOverlay",
  "attachmentFailedOverlay",
  "span",
);
