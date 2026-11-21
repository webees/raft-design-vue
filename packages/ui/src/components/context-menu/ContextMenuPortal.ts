import { ContextMenuPortal as RekaContextMenuPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const ContextMenuPortal = createOverlayPortal({
  name: "RaftContextMenuPortal",
  portal: RekaContextMenuPortal,
  dataSlot: "context-menu-portal",
});
