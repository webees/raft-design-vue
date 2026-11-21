import { DropdownMenuPortal as RekaDropdownMenuPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const DropdownMenuPortal = createOverlayPortal({
  name: "RaftDropdownMenuPortal",
  portal: RekaDropdownMenuPortal,
  dataSlot: "dropdown-menu-portal",
});
