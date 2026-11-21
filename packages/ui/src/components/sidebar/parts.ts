import { recipePart } from "../../lib/slot-part";
import { sidebarRecipe } from "./sidebar.recipe";
import { sidebarSectionRecipe } from "./sidebar-section.recipe";

export const SidebarRoot = recipePart("RaftSidebarRoot", "div", "sidebar-root", (className) =>
  sidebarRecipe().sidebarRoot({ class: className }),
);

export const SidebarBody = recipePart("RaftSidebarBody", "div", "sidebar-body", (className) =>
  sidebarRecipe().sidebarBody({ class: className }),
);

export const SidebarGroupLabel = recipePart(
  "RaftSidebarGroupLabel",
  "div",
  "sidebar-group-label",
  (className) => sidebarRecipe().sidebarGroupLabel({ class: className }),
);

export const SidebarHeaderTitle = recipePart(
  "RaftSidebarHeaderTitle",
  "div",
  "sidebar-header-title",
  (className) => sidebarRecipe().sidebarHeaderTitle({ class: className }),
);

export const SidebarSectionCount = recipePart(
  "RaftSidebarSectionCount",
  "span",
  "sidebar-section-count",
  (className) => sidebarSectionRecipe().sidebarSectionCount({ class: className }),
);

export const SidebarSectionTitle = recipePart(
  "RaftSidebarSectionTitle",
  "span",
  "sidebar-section-title",
  (className) => sidebarSectionRecipe().sidebarSectionTitle({ class: className }),
);
