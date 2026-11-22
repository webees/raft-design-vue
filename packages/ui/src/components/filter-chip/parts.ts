import { recipePartFactory } from "../../lib/slot-part";
import { filterChip } from "./filter-chip.variants";

const part = recipePartFactory(filterChip);

export const FilterChip = part("FilterChip", "root", "span");
export const FilterChipLabel = part("FilterChipLabel", "label", "span");
