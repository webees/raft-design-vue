import { createSlotPart } from "../../lib/slot-part";
import { messageImageGallery } from "./message-attachment.variants";

export const MessageImageGalleryMedia = createSlotPart({
  name: "RaftMessageImageGalleryMedia",
  tag: "div",
  dataSlot: "message-image-gallery-media",
  className: (className) => messageImageGallery().media({ className }),
});

export const MessageImageGalleryOverlay = createSlotPart({
  name: "RaftMessageImageGalleryOverlay",
  tag: "div",
  dataSlot: "message-image-gallery-overlay",
  className: (className) => messageImageGallery().overlay({ className }),
});

export const MessageImageGalleryPreview = createSlotPart({
  name: "RaftMessageImageGalleryPreview",
  tag: "button",
  dataSlot: "message-image-gallery-preview",
  className: (className) => messageImageGallery().preview({ className }),
  type: "button",
});

export const MessageImageGalleryAction = createSlotPart({
  name: "RaftMessageImageGalleryAction",
  tag: "button",
  dataSlot: "message-image-gallery-action",
  className: (className) => messageImageGallery().action({ className }),
  type: "button",
});
