import { recipePart } from "../../lib/slot-part";
import { mobileNav } from "./mobile-nav.recipe";

export const MobileNavLabel = recipePart(
  "RaftMobileNavLabel",
  "span",
  "mobile-nav-item-label",
  (className) => mobileNav().itemLabel({ class: className }),
);
