import { createSlotComponent } from "../../lib/create-slot-component";
import { mobileNavServer } from "./mobile-nav-server.recipe";

export { default as MobileNavServerPopoverList } from "./MobileNavServerPopoverList.vue";

export const MobileNavServerPopoverGroup = createSlotComponent({
  name: "RaftMobileNavServerPopoverGroup",
  tag: "div",
  dataSlot: "mobile-nav-server-popover-group",
  classes: (className) => mobileNavServer().group({ class: className }),
});

export const MobileNavServerPopoverRow = createSlotComponent({
  name: "RaftMobileNavServerPopoverRow",
  tag: "button",
  dataSlot: "mobile-nav-server-popover-row",
  classes: (className) => mobileNavServer().row({ class: className }),
  defaultType: "button",
});

export const MobileNavServerPopoverRowLabel = createSlotComponent({
  name: "RaftMobileNavServerPopoverRowLabel",
  tag: "span",
  dataSlot: "mobile-nav-server-popover-row-label",
  classes: (className) => mobileNavServer().rowLabel({ class: className }),
});

export const MobileNavServerPopoverRowBody = createSlotComponent({
  name: "RaftMobileNavServerPopoverRowBody",
  tag: "span",
  dataSlot: "mobile-nav-server-popover-row-body",
  classes: (className) => mobileNavServer().rowBody({ class: className }),
});

export const MobileNavServerPopoverRowDescription = createSlotComponent({
  name: "RaftMobileNavServerPopoverRowDescription",
  tag: "span",
  dataSlot: "mobile-nav-server-popover-row-description",
  classes: (className) => mobileNavServer().rowDescription({ class: className }),
});

export { default as MobileNavServerPopoverDestinations } from "./MobileNavServerPopoverDestinations.vue";

export const MobileNavServerPopoverDestination = createSlotComponent({
  name: "RaftMobileNavServerPopoverDestination",
  tag: "button",
  dataSlot: "mobile-nav-server-popover-destination",
  classes: (className) => mobileNavServer().destination({ class: className }),
  defaultType: "button",
});
