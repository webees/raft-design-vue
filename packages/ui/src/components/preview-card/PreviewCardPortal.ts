import { HoverCardPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const PreviewCardPortal = createOverlayPortal({
  name: "RaftPreviewCardPortal",
  portal: HoverCardPortal,
  dataSlot: "preview-card-portal",
});
