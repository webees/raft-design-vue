export { default as Ellipsis } from "./Ellipsis.vue";
export { default as EllipsisToggle } from "./EllipsisToggle.vue";
export { ellipsis } from "./ellipsis.variants";
export { useTruncated } from "../../lib/use-truncated";
export type { Truncation } from "../../lib/truncation";
/** What the `after` slot and its render functions receive. */
export type EllipsisState = {
  truncated: boolean;
  expanded: boolean;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
};
