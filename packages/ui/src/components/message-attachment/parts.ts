import { fixedPartFactory } from "../../lib/slot-part";
import { messageImageGallery, messageVideoPreview } from "./message-attachment.variants";

export const MessageImageGallery = fixedPartFactory(messageImageGallery)(
  "MessageImageGallery",
  "root",
);
export const MessageVideoPreview = fixedPartFactory(messageVideoPreview)(
  "MessageVideoPreview",
  "root",
);
