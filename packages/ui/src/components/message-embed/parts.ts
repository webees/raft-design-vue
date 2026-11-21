import { recipePart } from "../../lib/slot-part";
import { messageEmbed } from "./message-embed.variants";

export const MessageEmbedContent = recipePart(
  "RaftMessageEmbedContent",
  "div",
  "message-embed-content",
  (className) => messageEmbed().content({ className }),
);

export const MessageEmbedHeader = recipePart(
  "RaftMessageEmbedHeader",
  "div",
  "message-embed-header",
  (className) => messageEmbed().header({ className }),
);
