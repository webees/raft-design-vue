import { createSlotComponent } from "../../lib/create-slot-component";
import { recipePart } from "../../lib/slot-part";
import { messageCard } from "../message-embed/message-embed.variants";
import { previewCard } from "./preview-card.variants";

export const PreviewCardDescription = recipePart(
  "RaftPreviewCardDescription",
  "p",
  "preview-card-description",
  (className) => previewCard().description({ className }),
);

export const PreviewCardSeparator = createSlotComponent({
  name: "RaftPreviewCardSeparator",
  tag: "div",
  dataSlot: "preview-card-separator",
  asChild: true,
  classes: (className) => previewCard().separator({ className }),
  staticAttrs: { role: "separator", "aria-orientation": "horizontal" },
});

export const PreviewCardActions = recipePart(
  "RaftPreviewCardActions",
  "div",
  "preview-card-actions",
  (className) => messageCard().actions({ className }),
);

export const PreviewCardBody = recipePart(
  "RaftPreviewCardBody",
  "div",
  "preview-card-body",
  (className) => messageCard().body({ className }),
);

export const PreviewCardEyebrow = recipePart(
  "RaftPreviewCardEyebrow",
  "p",
  "preview-card-eyebrow",
  (className) => messageCard().eyebrow({ className }),
);

export const PreviewCardFooter = recipePart(
  "RaftPreviewCardFooter",
  "p",
  "preview-card-footer",
  (className) => messageCard().sourceFooter({ className }),
);

export const PreviewCardHeader = recipePart(
  "RaftPreviewCardHeader",
  "div",
  "preview-card-header",
  (className) => previewCard().header({ className }),
);

export const PreviewCardMeta = recipePart(
  "RaftPreviewCardMeta",
  "p",
  "preview-card-meta",
  (className) => messageCard().meta({ className }),
);

export const PreviewCardTitle = recipePart(
  "RaftPreviewCardTitle",
  "p",
  "preview-card-title",
  (className) => previewCard().title({ className }),
);
