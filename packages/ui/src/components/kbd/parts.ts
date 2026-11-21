import { cn } from "../../lib/cn";
import { recipePart } from "../../lib/slot-part";

export const KbdGroup = recipePart("RaftKbdGroup", "span", "kbd-group", (className) =>
  cn("inline-flex items-center gap-1", className),
);
