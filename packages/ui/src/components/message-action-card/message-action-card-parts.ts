import { recipePart as part } from "../../lib/slot-part";
import { messageActionCard, messageActionCardContent } from "./message-action-card.recipes";

export const MessageActionCardHeader = part(
  "RaftMessageActionCardHeader",
  "div",
  "message-action-card-header",
  () => messageActionCard().header(),
);
export const MessageActionCardHeaderIcon = part(
  "RaftMessageActionCardHeaderIcon",
  "span",
  "message-action-card-header-icon",
  () => messageActionCard().headerIcon(),
);
export const MessageActionCardHeaderTitle = part(
  "RaftMessageActionCardHeaderTitle",
  "span",
  "message-action-card-header-title",
  () => messageActionCard().headerTitle(),
);
export const MessageActionCardHeaderDescription = part(
  "RaftMessageActionCardHeaderDescription",
  "span",
  "message-action-card-header-description",
  () => messageActionCard().headerDescription(),
);
export const MessageActionCardHeaderMeta = part(
  "RaftMessageActionCardHeaderMeta",
  "span",
  "message-action-card-header-meta",
  () => messageActionCard().headerMeta(),
);
export const MessageActionCardHeaderStatus = part(
  "RaftMessageActionCardHeaderStatus",
  "span",
  "message-action-card-header-status",
  () => messageActionCard().headerStatus(),
);
export { default as MessageActionCardProperties } from "./MessageActionCardProperties.vue";
export const MessageActionCardProperty = part(
  "RaftMessageActionCardProperty",
  "div",
  "message-action-card-property",
  () => messageActionCardContent().property(),
);
export const MessageActionCardPropertyLabel = part(
  "RaftMessageActionCardPropertyLabel",
  "dt",
  "message-action-card-property-label",
  () => messageActionCardContent().propertyLabel(),
);
export const MessageActionCardPropertyValue = part(
  "RaftMessageActionCardPropertyValue",
  "dd",
  "message-action-card-property-value",
  () => messageActionCardContent().propertyValue(),
);
export const MessageActionCardScope = part(
  "RaftMessageActionCardScope",
  "div",
  "message-action-card-scope",
  () => messageActionCardContent().scope(),
);
export const MessageActionCardScopeName = part(
  "RaftMessageActionCardScopeName",
  "div",
  "message-action-card-scope-name",
  () => messageActionCardContent().scopeName(),
);
export const MessageActionCardScopeDescription = part(
  "RaftMessageActionCardScopeDescription",
  "div",
  "message-action-card-scope-description",
  () => messageActionCardContent().scopeDescription(),
);
export const MessageActionCardScopeList = part(
  "RaftMessageActionCardScopeList",
  "div",
  "message-action-card-scope-list",
  () => messageActionCardContent().scopeList(),
);
export const MessageActionCardScopeListLabel = part(
  "RaftMessageActionCardScopeListLabel",
  "div",
  "message-action-card-scope-list-label",
  () => messageActionCardContent().scopeListLabel(),
);
export const MessageActionCardHintLabel = part(
  "RaftMessageActionCardHintLabel",
  "div",
  "message-action-card-hint-label",
  () => messageActionCardContent().hintLabel(),
);
export const MessageActionCardHint = part(
  "RaftMessageActionCardHint",
  "div",
  "message-action-card-hint",
  () => messageActionCardContent().hint(),
);
export const MessageActionCardNotice = part(
  "RaftMessageActionCardNotice",
  "div",
  "message-action-card-notice",
  () => messageActionCardContent().notice(),
);
export const MessageActionCardCompletion = part(
  "RaftMessageActionCardCompletion",
  "div",
  "message-action-card-completion",
  () => messageActionCardContent().completion(),
);
export const MessageActionCardActions = part(
  "RaftMessageActionCardActions",
  "div",
  "message-action-card-actions",
  () => messageActionCardContent().actions(),
);
export const MessageActionCardActionsNote = part(
  "RaftMessageActionCardActionsNote",
  "div",
  "message-action-card-actions-note",
  () => messageActionCardContent().actionsNote(),
);
export const MessageActionCardScopeListViewport = part(
  "RaftMessageActionCardScopeListViewport",
  "div",
  "message-action-card-scope-list-viewport",
  () => messageActionCardContent().scopeListViewport(),
);
