export { default as Timeline } from "./Timeline.vue";
export { default as TimelineItem } from "./TimelineItem.vue";
export { TimelineContent, TimelineTime, TimelineTitle } from "./parts";

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineItemPlacement = "left" | "right";
export type TimelineItemVariant =
  | "default"
  | "information"
  | "success"
  | "warning"
  | "danger"
  | "accent";
export type TimelineLineType = "solid" | "dashed";
