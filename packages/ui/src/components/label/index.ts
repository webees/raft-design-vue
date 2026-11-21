import LabelRoot from "./Label.vue";
import LabelAsterisk from "./LabelAsterisk.vue";
import LabelOptional from "./LabelOptional.vue";
import { LabelSub } from "./parts";

export const Label = Object.assign(LabelRoot, {
  Asterisk: LabelAsterisk,
  Optional: LabelOptional,
  Sub: LabelSub,
});

export { LabelRoot, LabelAsterisk, LabelSub, LabelOptional };
export { labelVariants } from "./label.variants";
export type { LabelSize } from "./label.variants";
