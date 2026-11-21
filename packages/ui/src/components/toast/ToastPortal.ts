import { ToastPortal as RekaToastPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const ToastPortal = createOverlayPortal({
  name: "RaftToastPortal",
  portal: RekaToastPortal,
  dataSlot: "toast-portal",
  to: "body",
});
