import { recipePartFactory } from "../../lib/slot-part";
import { mobileNavServer } from "./mobile-nav-server.recipe";

export { default as MobileNavServerPopoverList } from "./MobileNavServerPopoverList.vue";
export { default as MobileNavServerPopoverDestinations } from "./MobileNavServerPopoverDestinations.vue";

const part = recipePartFactory(mobileNavServer);

export const MobileNavServerPopoverGroup = part("MobileNavServerPopoverGroup", "group");
export const MobileNavServerPopoverRow = part("MobileNavServerPopoverRow", "row", "button", {
  defaultType: "button",
});
export const MobileNavServerPopoverRowLabel = part(
  "MobileNavServerPopoverRowLabel",
  "rowLabel",
  "span",
);
export const MobileNavServerPopoverRowBody = part(
  "MobileNavServerPopoverRowBody",
  "rowBody",
  "span",
);
export const MobileNavServerPopoverRowDescription = part(
  "MobileNavServerPopoverRowDescription",
  "rowDescription",
  "span",
);
export const MobileNavServerPopoverDestination = part(
  "MobileNavServerPopoverDestination",
  "destination",
  "button",
  { defaultType: "button" },
);
