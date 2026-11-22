import { recipePartFactory } from "../../lib/slot-part";
import { composerSuggestionList } from "./composer-suggestion.recipe";

const part = recipePartFactory(composerSuggestionList);

export const ComposerSuggestionGroupLabel = part("ComposerSuggestionGroupLabel", "groupLabel");
export const ComposerSuggestionOption = part("ComposerSuggestionOption", "item");
export const ComposerSuggestionContent = part("ComposerSuggestionContent", "content", "span");
export const ComposerSuggestionTitle = part("ComposerSuggestionTitle", "title", "span");
export const ComposerSuggestionAside = part("ComposerSuggestionAside", "aside", "span");
export const ComposerSuggestionMeta = part("ComposerSuggestionMeta", "meta", "span");
