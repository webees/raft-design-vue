import { recipePartFactory } from "../../lib/slot-part";
import { composer } from "./composer.recipe";

const part = recipePartFactory(composer);

export const ComposerToolbar = part("ComposerToolbar", "toolbar");
export const ComposerActions = part("ComposerActions", "actions");
export const ComposerMeta = part("ComposerMeta", "meta");
