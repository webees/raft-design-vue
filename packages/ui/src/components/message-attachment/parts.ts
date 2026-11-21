import { cn } from "../../lib/cn";
import { recipePart } from "../../lib/slot-part";
import { messageImageGallery, messageVideoPreview } from "./message-attachment.variants";

export const MessageImageGallery = recipePart(
  "RaftMessageImageGallery",
  "div",
  "message-image-gallery",
  (className) => messageImageGallery().root({ className: cn(className) }),
);

export const MessageVideoPreview = recipePart(
  "RaftMessageVideoPreview",
  "div",
  "message-video-preview",
  (className) => messageVideoPreview().root({ className: cn(className) }),
);
