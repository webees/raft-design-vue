import type { SegmentedControlIconsOnlyPreset } from "./segmented-control.variants";

export { default as SegmentedControl } from "./SegmentedControl.vue";
export { default as SegmentedControlCount } from "./SegmentedControlCount.vue";
export { default as SegmentedControlItem } from "./SegmentedControlItem.vue";
export { default as SegmentedControlLabel } from "./SegmentedControlLabel.vue";

export type {
  SegmentedControlIconsOnlyPreset,
  SegmentedControlVariant,
} from "./segmented-control.variants";
export type SegmentedControlIconsOnlyBelow =
  | "auto"
  | SegmentedControlIconsOnlyPreset
  | `${number}px`
  | `${number}rem`
  | `${number}em`;
