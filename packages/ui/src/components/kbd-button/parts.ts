import { recipePartFactory } from "../../lib/slot-part";
import { kbdButton } from "./kbd-button.variants";

const part = recipePartFactory(kbdButton);

export const KbdButtonPlaceholder = part("KbdButtonPlaceholder", "placeholder", "span");
