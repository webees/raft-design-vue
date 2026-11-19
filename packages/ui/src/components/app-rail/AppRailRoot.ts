import { createPrimitivePart } from "../../lib/create-primitive-part";
import { appRail } from "./app-rail.variants";

export const AppRailRoot = createPrimitivePart("RaftAppRailRoot", "app-rail-root", (className) =>
  appRail().root({ class: className }),
);
