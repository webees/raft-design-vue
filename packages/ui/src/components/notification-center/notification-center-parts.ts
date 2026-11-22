import { recipePartFactory } from "../../lib/slot-part";
import { notificationCenter } from "./notification-center.recipe";

const part = recipePartFactory(notificationCenter);

export const NotificationCenterHeader = part("NotificationCenterHeader", "header");
export const NotificationCenterTitle = part("NotificationCenterTitle", "title", "span");
export const NotificationCenterCount = part("NotificationCenterCount", "count", "span");
export const NotificationCenterList = part("NotificationCenterList", "list", "ul");
export const NotificationCenterItemRow = part("NotificationCenterItemRow", "itemRow");
export const NotificationCenterItemContent = part("NotificationCenterItemContent", "itemContent");
export const NotificationCenterItemTitle = part("NotificationCenterItemTitle", "itemTitle");
export const NotificationCenterItemBody = part("NotificationCenterItemBody", "itemBody");
export const NotificationCenterItemActions = part("NotificationCenterItemActions", "itemActions");
