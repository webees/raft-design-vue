import TextHeading from "./TextHeading.vue";
import TextSans from "./TextSans.vue";
import TextMono from "./TextMono.vue";

export const Text = { Heading: TextHeading, Sans: TextSans, Mono: TextMono };
export { TextHeading, TextSans, TextMono };
export { headingVariants, sansVariants, monoVariants } from "./text.variants";
export type {
  HeadingLevel,
  TextVariant,
  TextSansSize,
  TextMonoSize,
} from "./text.variants";
