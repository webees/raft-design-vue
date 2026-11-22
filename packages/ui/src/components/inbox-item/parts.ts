import { fixedPartFactory } from "../../lib/slot-part";
import { inboxItemRecipe } from "./inbox-item.recipe";

const part = fixedPartFactory(inboxItemRecipe);

export const InboxItemLine = part("InboxItemLine", "itemLine");
export const InboxItemListGroup = part("InboxItemListGroup", "itemListGroup");
