import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailHeader = createPrimitivePart(
  "RaftAppRailHeader",
  "app-rail-header",
  (className) => appRail().header({ class: className }),
);
