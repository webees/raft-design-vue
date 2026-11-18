import { createSlotComponent } from "../../lib/create-slot-component";
import { notificationCenter } from "./notification-center.recipe";

export const NotificationCenterHeader = createSlotComponent({
  name: "RaftNotificationCenterHeader",
  tag: "header",
  dataSlot: "notification-center-header",
  classes: (className) => notificationCenter().header({ class: className }),
});

export const NotificationCenterTitle = createSlotComponent({
  name: "RaftNotificationCenterTitle",
  tag: "span",
  dataSlot: "notification-center-title",
  classes: (className) => notificationCenter().title({ class: className }),
});

export const NotificationCenterCount = createSlotComponent({
  name: "RaftNotificationCenterCount",
  tag: "span",
  dataSlot: "notification-center-count",
  classes: (className) => notificationCenter().count({ class: className }),
});

export const NotificationCenterList = createSlotComponent({
  name: "RaftNotificationCenterList",
  tag: "ul",
  dataSlot: "notification-center-list",
  classes: (className) => notificationCenter().list({ class: className }),
});

export const NotificationCenterItemRow = createSlotComponent({
  name: "RaftNotificationCenterItemRow",
  tag: "div",
  dataSlot: "notification-center-item-row",
  classes: (className) => notificationCenter().itemRow({ class: className }),
});

export const NotificationCenterItemContent = createSlotComponent({
  name: "RaftNotificationCenterItemContent",
  tag: "div",
  dataSlot: "notification-center-item-content",
  classes: (className) => notificationCenter().itemContent({ class: className }),
});

export const NotificationCenterItemTitle = createSlotComponent({
  name: "RaftNotificationCenterItemTitle",
  tag: "div",
  dataSlot: "notification-center-item-title",
  classes: (className) => notificationCenter().itemTitle({ class: className }),
});

export const NotificationCenterItemBody = createSlotComponent({
  name: "RaftNotificationCenterItemBody",
  tag: "div",
  dataSlot: "notification-center-item-body",
  classes: (className) => notificationCenter().itemBody({ class: className }),
});

export const NotificationCenterItemActions = createSlotComponent({
  name: "RaftNotificationCenterItemActions",
  tag: "div",
  dataSlot: "notification-center-item-actions",
  classes: (className) => notificationCenter().itemActions({ class: className }),
});
