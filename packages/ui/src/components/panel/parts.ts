import { recipePartFactory } from "../../lib/slot-part";
import { panel, panelHeader } from "./panel.variants";

const root = recipePartFactory(panel);
const header = recipePartFactory(panelHeader);

export const PanelHeaderRoot = root("PanelHeaderRoot", "header");
export const PanelBody = root("PanelBody", "body");
export const PanelFooter = root("PanelFooter", "footer");
export const PanelScrollContent = root("PanelScrollContent", "scrollContent");
export const PanelSection = root("PanelSection", "section", "section");
export const PanelNativeScrollViewport = root(
  "PanelNativeScrollViewport",
  "nativeScrollViewport",
  "div",
  { dataSlot: "panel-scroll-viewport" },
);

export const PanelActions = header("PanelActions", "actions", "div", {
  staticAttrs: { "data-icon-inset": "" },
});
export const PanelActivity = header("PanelActivity", "activity", "span");
export const PanelHeading = header("PanelHeading", "heading");
export const PanelHeaderContent = header("PanelHeaderContent", "headerContent");
export const PanelTitle = header("PanelTitle", "title");
export const PanelStatus = header("PanelStatus", "status", "span");
export const PanelSectionHeader = header("PanelSectionHeader", "sectionHeader");
export const PanelHeader = header("PanelHeader", "header", "div", {
  classes: (className) =>
    `${panelHeader().header({ className })} ${panel().header({ className: "" })}`.trim(),
  staticAttrs: { "data-panel-frame-header": "" },
});
