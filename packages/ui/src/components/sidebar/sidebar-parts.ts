import { createSlotPart } from "../../lib/slot-part";
import { sidebarMenuRecipe } from "./sidebar-menu.recipe";
import { sidebarItemRecipe } from "./sidebar-item.recipe";

export { default as SidebarMenu } from "./SidebarMenu.vue";

export const SidebarMenuIcon = createSlotPart({
  name: "RaftSidebarMenuIcon",
  tag: "span",
  dataSlot: "sidebar-menu-icon",
  className: (className) => sidebarMenuRecipe().sidebarMenuIcon({ class: className }),
});

export const SidebarMenuTitle = createSlotPart({
  name: "RaftSidebarMenuTitle",
  tag: "span",
  dataSlot: "sidebar-menu-title",
  className: (className) => sidebarMenuRecipe().sidebarMenuTitle({ class: className }),
});

export const SidebarMenuAside = createSlotPart({
  name: "RaftSidebarMenuAside",
  tag: "span",
  dataSlot: "sidebar-menu-aside",
  className: (className) => sidebarMenuRecipe().sidebarMenuAside({ class: className }),
});

export const SidebarMenuCount = createSlotPart({
  name: "RaftSidebarMenuCount",
  tag: "span",
  dataSlot: "sidebar-menu-count",
  className: (className) => sidebarMenuRecipe().sidebarMenuCount({ class: className }),
});

export { default as SidebarItem } from "./SidebarItem.vue";

export const SidebarItemIcon = createSlotPart({
  name: "RaftSidebarItemIcon",
  tag: "span",
  dataSlot: "sidebar-item-icon",
  className: (className) => sidebarItemRecipe().sidebarItemIcon({ class: className }),
});

export const SidebarItemChannelIcon = createSlotPart({
  name: "RaftSidebarItemChannelIcon",
  tag: "span",
  dataSlot: "sidebar-item-channel-icon",
  className: (className) => sidebarItemRecipe().sidebarItemChannelIcon({ class: className }),
});

export const SidebarItemContent = createSlotPart({
  name: "RaftSidebarItemContent",
  tag: "span",
  dataSlot: "sidebar-item-content",
  className: (className) => sidebarItemRecipe().sidebarItemContent({ class: className }),
});

export const SidebarItemTitle = createSlotPart({
  name: "RaftSidebarItemTitle",
  tag: "span",
  dataSlot: "sidebar-item-title",
  className: (className) => sidebarItemRecipe().sidebarItemTitle({ class: className }),
});

export const SidebarItemSubtitle = createSlotPart({
  name: "RaftSidebarItemSubtitle",
  tag: "span",
  dataSlot: "sidebar-item-subtitle",
  className: (className) => sidebarItemRecipe().sidebarItemSubtitle({ class: className }),
});

export const SidebarItemMeta = createSlotPart({
  name: "RaftSidebarItemMeta",
  tag: "span",
  dataSlot: "sidebar-item-meta",
  className: (className) => sidebarItemRecipe().sidebarItemMeta({ class: className }),
});

export const SidebarItemStatus = createSlotPart({
  name: "RaftSidebarItemStatus",
  tag: "span",
  dataSlot: "sidebar-item-status",
  className: (className) => sidebarItemRecipe().sidebarItemStatus({ class: className }),
});

export const SidebarItemIndicator = createSlotPart({
  name: "RaftSidebarItemIndicator",
  tag: "span",
  dataSlot: "sidebar-item-indicator",
  className: (className) => sidebarItemRecipe().sidebarItemIndicator({ class: className }),
});

export const SidebarItemMetaIcon = createSlotPart({
  name: "RaftSidebarItemMetaIcon",
  tag: "span",
  dataSlot: "sidebar-item-meta-icon",
  className: (className) => sidebarItemRecipe().sidebarItemMetaIcon({ class: className }),
});

export const SidebarItemAside = createSlotPart({
  name: "RaftSidebarItemAside",
  tag: "span",
  dataSlot: "sidebar-item-aside",
  className: (className) => sidebarItemRecipe().sidebarItemAside({ class: className }),
});

export const SidebarItemCount = createSlotPart({
  name: "RaftSidebarItemCount",
  tag: "span",
  dataSlot: "sidebar-item-count",
  className: (className) => sidebarItemRecipe().sidebarItemCount({ class: className }),
});

export const SidebarItemCountSeparator = createSlotPart({
  name: "RaftSidebarItemCountSeparator",
  tag: "span",
  dataSlot: "sidebar-item-count-separator",
  className: (className) => sidebarItemRecipe().sidebarItemCountSeparator({ class: className }),
});

export { default as SidebarItemThreadCount } from "./SidebarItemThreadCount.vue";
