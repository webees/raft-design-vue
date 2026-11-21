import { recipePart } from "../../lib/slot-part";
import { labelVariants } from "./label.variants";

export const LabelSub = recipePart("RaftLabelSub", "span", "label-sub", (className) =>
  labelVariants().sub({ className }),
);
