import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailFooter = createPrimitivePart(
  "RaftAppRailFooter",
  "app-rail-footer",
  (className) => appRail().footer({ class: className }),
);
