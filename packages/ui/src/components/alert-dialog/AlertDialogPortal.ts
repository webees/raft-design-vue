import { AlertDialogPortal as RekaAlertDialogPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const AlertDialogPortal = createOverlayPortal({
  name: "RaftAlertDialogPortal",
  portal: RekaAlertDialogPortal,
  dataSlot: "alert-dialog-portal",
});
