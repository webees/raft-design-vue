import { PopoverPortal as RekaPopoverPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const PopoverPortal = createOverlayPortal({
  name: "RaftPopoverPortal",
  portal: RekaPopoverPortal,
  dataSlot: "popover-portal",
});
