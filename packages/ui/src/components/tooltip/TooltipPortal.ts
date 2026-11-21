import { TooltipPortal as RekaTooltipPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const TooltipPortal = createOverlayPortal({
  name: "RaftTooltipPortal",
  portal: RekaTooltipPortal,
  dataSlot: "tooltip-portal",
});
