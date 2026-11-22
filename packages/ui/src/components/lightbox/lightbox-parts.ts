import { recipePartFactory } from "../../lib/slot-part";
import { lightbox } from "./lightbox.recipe";

const part = recipePartFactory(lightbox);

export const LightboxHeader = part("LightboxHeader", "header");
export const LightboxToolbar = part("LightboxToolbar", "toolbar");
export const LightboxHeaderMeta = part("LightboxHeaderMeta", "headerMeta");
export const LightboxHeaderLabel = part("LightboxHeaderLabel", "headerLabel", "span");
export const LightboxTitle = part("LightboxTitle", "title");
export const LightboxActions = part("LightboxActions", "actions");
export const LightboxStage = part("LightboxStage", "stage");
export const LightboxMedia = part("LightboxMedia", "media");
export const LightboxInfoDock = part("LightboxInfoDock", "infoDock");
export const LightboxInfoBar = part("LightboxInfoBar", "infoBar");
export const LightboxInfoTitle = part("LightboxInfoTitle", "infoTitle");
export const LightboxInfoActions = part("LightboxInfoActions", "infoActions");
export const LightboxThumbnailStrip = part("LightboxThumbnailStrip", "thumbnailStrip");
