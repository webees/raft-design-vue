export { default as Timeline } from "./Timeline.vue";
export { default as TimelineContent } from "./TimelineContent.vue";
export { default as TimelineItem } from "./TimelineItem.vue";
export { default as TimelineTime } from "./TimelineTime.vue";
export { default as TimelineTitle } from "./TimelineTitle.vue";

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
