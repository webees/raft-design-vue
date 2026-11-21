import { DialogPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const LightboxPortal = createOverlayPortal({
  name: "RaftLightboxPortal",
  portal: DialogPortal,
  dataSlot: "lightbox-portal",
  to: "body",
});
