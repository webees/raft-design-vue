import { ComboboxPortal as RekaComboboxPortal } from "reka-ui";
import { createOverlayPortal } from "../../lib/overlay-portal";

export const ComboboxPortal = createOverlayPortal({
  name: "RaftComboboxPortal",
  portal: RekaComboboxPortal,
  dataSlot: "combobox-portal",
});
