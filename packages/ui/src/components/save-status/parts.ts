import { recipePartFactory } from "../../lib/slot-part";
import { saveStatus } from "./save-status.variants";

const part = recipePartFactory(saveStatus);

export const SaveStatus = part("SaveStatus", "root", "span");
