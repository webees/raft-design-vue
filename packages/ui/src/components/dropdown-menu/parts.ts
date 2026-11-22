import {
  DropdownMenuRadioGroup as RekaDropdownMenuRadioGroup,
  DropdownMenuSeparator as RekaDropdownMenuSeparator,
} from "reka-ui";

import { createRekaRadioGroup } from "../../lib/reka-radio-group";
import { fixedPartFactory, rekaPart } from "../../lib/slot-part";
import { dropdownMenu } from "./dropdown-menu.variants";

export const DropdownMenuRadioGroup = createRekaRadioGroup({
  name: "RaftDropdownMenuRadioGroup",
  component: RekaDropdownMenuRadioGroup,
  dataSlot: "dropdown-menu-radio-group",
  classes: (className) => dropdownMenu().radioGroup({ class: className }),
});
const part = fixedPartFactory(dropdownMenu);

export const DropdownMenuLabel = part("DropdownMenuLabel", "label");
export const DropdownMenuFooter = part("DropdownMenuFooter", "footer");
export const DropdownMenuItemCount = part("DropdownMenuItemCount", "itemCount", "span");
export const DropdownMenuItemDescription = part(
  "DropdownMenuItemDescription",
  "itemDescription",
  "span",
);
export const DropdownMenuItemIcon = part("DropdownMenuItemIcon", "itemIcon", "span", {
  rootProps: () => ({ "aria-hidden": "true" }),
});
export const DropdownMenuItemLabel = part("DropdownMenuItemLabel", "itemLabel", "span");
export const DropdownMenuShortcut = part("DropdownMenuShortcut", "shortcut", "span");

export const DropdownMenuSeparator = rekaPart(
  "RaftDropdownMenuSeparator",
  RekaDropdownMenuSeparator,
  "dropdown-menu-separator",
  (className) => dropdownMenu().separator({ class: className }),
);
