import { cn } from "../../lib/cn";
import { recipePart } from "../../lib/slot-part";

export const TimelineContent = recipePart(
  "RaftTimelineContent",
  "div",
  "timeline-content",
  (className) => cn("r-timeline-content", className),
);
export const TimelineTime = recipePart("RaftTimelineTime", "div", "timeline-time", (className) =>
  cn("r-timeline-time", className),
);
export const TimelineTitle = recipePart("RaftTimelineTitle", "div", "timeline-title", (className) =>
  cn("r-timeline-title", className),
);
