import { fixedPartFactory } from "../../lib/slot-part";
import { sidebarRecipe } from "./sidebar.recipe";
import { sidebarSectionRecipe } from "./sidebar-section.recipe";

const sidebar = fixedPartFactory(sidebarRecipe);
const section = fixedPartFactory(sidebarSectionRecipe);

export const SidebarRoot = sidebar("SidebarRoot", "sidebarRoot");
export const SidebarBody = sidebar("SidebarBody", "sidebarBody");
export const SidebarGroupLabel = sidebar("SidebarGroupLabel", "sidebarGroupLabel");
export const SidebarHeaderTitle = sidebar("SidebarHeaderTitle", "sidebarHeaderTitle");
export const SidebarSectionCount = section("SidebarSectionCount", "sidebarSectionCount", "span");
export const SidebarSectionTitle = section("SidebarSectionTitle", "sidebarSectionTitle", "span");
