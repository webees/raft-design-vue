import { fixedPartFactory } from "../../lib/slot-part";
import { descriptionList } from "./description-list.variants";

const part = fixedPartFactory(descriptionList);

export const DescriptionItem = part("DescriptionItem", "item", "div");
export const DescriptionTerm = part("DescriptionTerm", "label", "dt");
export const DescriptionDetails = part("DescriptionDetails", "value", "dd");
