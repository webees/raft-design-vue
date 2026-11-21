import { recipePart } from "../../lib/slot-part";
import { progress } from "./progress.recipe";

const part = (
  name: string,
  tag: string,
  dataSlot: string,
  slot: "header" | "label" | "track" | "value",
) => recipePart(`Raft${name}`, tag, dataSlot, (className) => progress()[slot]({ className }));

export const ProgressHeader = part("ProgressHeader", "div", "progress-header", "header");
export const ProgressLabel = part("ProgressLabel", "span", "progress-label", "label");
export const ProgressTrack = part("ProgressTrack", "div", "progress-track", "track");
export const ProgressValue = part("ProgressValue", "span", "progress-value", "value");
