import { fixedPartFactory } from "../../lib/slot-part";
import { messageEmbed } from "./message-embed.variants";

const part = fixedPartFactory(messageEmbed);

export const MessageEmbedContent = part("MessageEmbedContent", "content");
export const MessageEmbedHeader = part("MessageEmbedHeader", "header");
