import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailItemIcon = createPrimitivePart(
  "RaftAppRailItemIcon",
  "app-rail-item-icon",
  (className) => appRail().itemIcon({ class: className }),
  "span",
);
