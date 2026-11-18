import { createSlotComponent } from "../../lib/create-slot-component";
import { composerDropOverlay } from "./composer-drop-overlay.recipe";

export const ComposerDropOverlayLabel = createSlotComponent({
  name: "RaftComposerDropOverlayLabel",
  tag: "span",
  dataSlot: "composer-drop-overlay-label",
  classes: (className) => composerDropOverlay().dropOverlayLabel({ class: className }),
});

export const ComposerDropOverlayIconCluster = createSlotComponent({
  name: "RaftComposerDropOverlayIconCluster",
  tag: "span",
  dataSlot: "composer-drop-overlay-icon-cluster",
  classes: (className) => composerDropOverlay().dropOverlayIconCluster({ class: className }),
});

export const ComposerDropOverlayIcon = createSlotComponent({
  name: "RaftComposerDropOverlayIcon",
  tag: "span",
  dataSlot: "composer-drop-overlay-icon",
  classes: (className) => composerDropOverlay().dropOverlayIcon({ class: className }),
});
