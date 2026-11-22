import type { PropType } from "vue";

import { createSlotComponent } from "../../lib/create-slot-component";
import {
  headingVariants,
  monoVariants,
  sansVariants,
  type HeadingLevel,
  type TextMonoSize,
  type TextSansSize,
  type TextVariant,
} from "./text.variants";

export interface TextProps<Size extends string> extends Record<string, unknown> {
  variant?: TextVariant;
  size?: Size;
}

const text = <Size extends string>(
  name: string,
  dataSlot: string,
  defaultSize: Size,
  recipe: (variants: { size?: Size; variant?: TextVariant; class?: string }) => string,
) =>
  createSlotComponent<undefined, TextProps<Size>>({
    name: `Raft${name}`,
    tag: "p",
    dataSlot,
    asChild: true,
    props: {
      variant: { type: String as PropType<TextVariant> },
      size: { type: String as unknown as PropType<Size>, default: defaultSize },
    },
    classes: (className, _, props) => recipe({ ...props, class: className }),
    rootProps: (props) => ({
      "data-size": props.size,
      "data-variant": props.variant,
    }),
  });

export const TextSans = text<TextSansSize>("TextSans", "text-sans", "body", sansVariants);
export const TextMono = text<TextMonoSize>("TextMono", "text-mono", "code", monoVariants);

export const TextHeading = createSlotComponent<
  undefined,
  { level?: HeadingLevel; variant?: TextVariant }
>({
  name: "RaftTextHeading",
  tag: (props) => `h${props.level ?? 1}`,
  dataSlot: "text-heading",
  asChild: true,
  props: {
    level: { type: Number as PropType<HeadingLevel>, default: 1 },
    variant: { type: String as PropType<TextVariant> },
  },
  classes: (className, _, props) => headingVariants({ ...props, class: className }),
  rootProps: (props) => ({
    "data-level": props.level,
    "data-variant": props.variant,
  }),
});
