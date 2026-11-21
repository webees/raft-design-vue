import { recipePart } from "../../lib/slot-part";
import { inboxItemRecipe } from "./inbox-item.recipe";

export const InboxItemLine = recipePart(
  "RaftInboxItemLine",
  "div",
  "inbox-item-line",
  (className) => inboxItemRecipe().itemLine({ class: className }),
);

export const InboxItemListGroup = recipePart(
  "RaftInboxItemListGroup",
  "div",
  "inbox-item-list-group",
  (className) => inboxItemRecipe().itemListGroup({ class: className }),
);
