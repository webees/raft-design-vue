import { recipePartFactory } from "../../lib/slot-part";
import { composerDropOverlay } from "./composer-drop-overlay.recipe";

const part = recipePartFactory(composerDropOverlay);

export const ComposerDropOverlayLabel = part(
  "ComposerDropOverlayLabel",
  "dropOverlayLabel",
  "span",
);
export const ComposerDropOverlayIconCluster = part(
  "ComposerDropOverlayIconCluster",
  "dropOverlayIconCluster",
  "span",
);
export const ComposerDropOverlayIcon = part("ComposerDropOverlayIcon", "dropOverlayIcon", "span");
