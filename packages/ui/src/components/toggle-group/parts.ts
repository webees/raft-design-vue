import { recipePartFactory } from "../../lib/slot-part";
import { toggleGroup } from "./toggle-group.variants";

const part = recipePartFactory(toggleGroup);

export const ToggleGroupLabel = part("ToggleGroupLabel", "label", "span");
