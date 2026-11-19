import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailItemLabel = createPrimitivePart(
  "RaftAppRailItemLabel",
  "app-rail-item-label",
  (className) => appRail().itemLabel({ class: className }),
  "span",
);
