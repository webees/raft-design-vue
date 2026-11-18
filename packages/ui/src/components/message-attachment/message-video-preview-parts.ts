import { createSlotPart } from "../../lib/slot-part";
import { messageVideoPreview } from "./message-attachment.variants";

export const MessageVideoPreviewMedia = createSlotPart({
  name: "RaftMessageVideoPreviewMedia",
  tag: "video",
  dataSlot: "message-video-preview-media",
  className: (className) => messageVideoPreview().media({ className }),
});

export const MessageVideoPreviewFallback = createSlotPart({
  name: "RaftMessageVideoPreviewFallback",
  tag: "div",
  dataSlot: "message-video-preview-fallback",
  className: (className) => messageVideoPreview().fallback({ className }),
});

export const MessageVideoPreviewFailureContent = createSlotPart({
  name: "RaftMessageVideoPreviewFailureContent",
  tag: "div",
  dataSlot: "message-video-preview-failure-content",
  className: (className) => messageVideoPreview().failureContent({ className }),
});

export const MessageVideoPreviewFailureIcon = createSlotPart({
  name: "RaftMessageVideoPreviewFailureIcon",
  tag: "span",
  dataSlot: "message-video-preview-failure-icon",
  className: (className) => messageVideoPreview().failureIcon({ className }),
});

export const MessageVideoPreviewFailureTitle = createSlotPart({
  name: "RaftMessageVideoPreviewFailureTitle",
  tag: "p",
  dataSlot: "message-video-preview-failure-title",
  className: (className) => messageVideoPreview().failureTitle({ className }),
});

export const MessageVideoPreviewFailureAction = createSlotPart({
  name: "RaftMessageVideoPreviewFailureAction",
  tag: "button",
  dataSlot: "message-video-preview-failure-action",
  className: (className) => messageVideoPreview().failureAction({ className }),
  type: "button",
});

export const MessageVideoPreviewAction = createSlotPart({
  name: "RaftMessageVideoPreviewAction",
  tag: "button",
  dataSlot: "message-video-preview-action",
  className: (className) => messageVideoPreview().action({ className }),
  type: "button",
});
