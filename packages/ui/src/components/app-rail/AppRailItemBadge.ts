import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailItemBadge = createPrimitivePart(
  "RaftAppRailItemBadge",
  "app-rail-item-badge",
  (className) => appRail().itemBadge({ class: className }),
  "span",
);
