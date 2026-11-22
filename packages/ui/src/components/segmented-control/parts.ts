import { recipePart } from "../../lib/slot-part";
import { segmentedControlCount, segmentedControlLabel } from "./segmented-control.variants";

export const SegmentedControlLabel = recipePart(
  "RaftSegmentedControlLabel",
  "span",
  "segmented-control-label",
  segmentedControlLabel,
);
export const SegmentedControlCount = recipePart(
  "RaftSegmentedControlCount",
  "span",
  "segmented-control-count",
  segmentedControlCount,
);
