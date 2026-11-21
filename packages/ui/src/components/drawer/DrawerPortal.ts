import { DrawerPortal as RekaDrawerPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const DrawerPortal = createOverlayPortal({
  name: "RaftDrawerPortal",
  portal: RekaDrawerPortal,
  dataSlot: "drawer-portal",
  to: "body",
});
