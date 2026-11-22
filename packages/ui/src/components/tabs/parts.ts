import { fixedPartFactory } from "../../lib/slot-part";
import { tabs } from "./tabs.variants";

export const TabsLabel = fixedPartFactory(tabs)("TabsLabel", "label", "span");
