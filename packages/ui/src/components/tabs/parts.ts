import { recipePart } from "../../lib/slot-part";
import { tabs } from "./tabs.variants";

export const TabsLabel = recipePart("RaftTabsLabel", "span", "tabs-label", (className) =>
  tabs().label({ className }),
);
