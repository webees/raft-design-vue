import { DialogPortal as RekaDialogPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const DialogPortal = createOverlayPortal({
  name: "RaftDialogPortal",
  portal: RekaDialogPortal,
  dataSlot: "dialog-portal",
});
