import { SelectPortal as RekaSelectPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const SelectPortal = createOverlayPortal({
  name: "RaftSelectPortal",
  portal: RekaSelectPortal,
  dataSlot: "select-portal",
});
