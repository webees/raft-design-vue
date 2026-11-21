import {
  DropdownMenuRadioGroup as RekaDropdownMenuRadioGroup,
  DropdownMenuSeparator as RekaDropdownMenuSeparator,
} from "reka-ui";

import { createRekaRadioGroup } from "../../lib/reka-radio-group";
import { recipePart, rekaPart } from "../../lib/slot-part";
import { dropdownMenu } from "./dropdown-menu.variants";

export const DropdownMenuRadioGroup = createRekaRadioGroup({
  name: "RaftDropdownMenuRadioGroup",
  component: RekaDropdownMenuRadioGroup,
  dataSlot: "dropdown-menu-radio-group",
  classes: (className) => dropdownMenu().radioGroup({ class: className }),
});

export const DropdownMenuLabel = recipePart(
  "RaftDropdownMenuLabel",
  "div",
  "dropdown-menu-label",
  (className) => dropdownMenu().label({ class: className }),
);

export const DropdownMenuSeparator = rekaPart(
  "RaftDropdownMenuSeparator",
  RekaDropdownMenuSeparator,
  "dropdown-menu-separator",
  (className) => dropdownMenu().separator({ class: className }),
);
