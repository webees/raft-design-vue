import { SwitchThumb as RekaSwitchThumb } from "reka-ui";

import { rekaPart } from "../../lib/slot-part";
import { switchRecipe } from "./switch.recipe";

export const SwitchThumb = rekaPart(
  "RaftSwitchThumb",
  RekaSwitchThumb,
  "switch-thumb",
  (className) => switchRecipe().thumb({ className }),
);
