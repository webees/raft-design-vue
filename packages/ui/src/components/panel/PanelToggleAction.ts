import { createPanelToggleAction } from "../../lib/panel-toggle-action";
import { panelToggleAction } from "./panel.variants";

export const PanelToggleAction = createPanelToggleAction(
  "RaftPanelToggleAction",
  "panel-toggle-action",
  panelToggleAction,
);
