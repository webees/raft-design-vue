import { recipePartFactory } from "../../lib/slot-part";
import { conversationPanel, conversationPanelEmptyState } from "./conversation-panel.variants";

const part = recipePartFactory(conversationPanel);
const empty = recipePartFactory(conversationPanelEmptyState);

export const ConversationPanelContent = part("ConversationPanelContent", "content");
export const ConversationPanelTabs = part("ConversationPanelTabs", "tabs");
export const ConversationPanelEmptyState = empty("ConversationPanelEmptyState", "root");
export const ConversationPanelEmptyStateBrand = empty("ConversationPanelEmptyStateBrand", "brand");
export const ConversationPanelEmptyStateBrandMark = empty(
  "ConversationPanelEmptyStateBrandMark",
  "brandMark",
);
