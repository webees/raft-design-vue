import { createPanelToggleAction } from "../../lib/panel-toggle-action";
import { panelSplitActionToggle } from "./panel.variants";

export const PanelSplitActionToggle = createPanelToggleAction(
  "RaftPanelSplitActionToggle",
  "panel-split-action-toggle",
  panelSplitActionToggle,
  { "data-split-action-main": "" },
);
