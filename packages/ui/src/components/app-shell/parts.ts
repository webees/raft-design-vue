import { recipePartFactory } from "../../lib/slot-part";
import { appShell } from "./app-shell.variants";

const part = recipePartFactory(appShell);

export const AppShellOverlaySlot = part("AppShellOverlaySlot", "overlaySlot");
export const AppShellPanelSlot = part("AppShellPanelSlot", "panelSlot", "aside");
export const AppShellRailSlot = part("AppShellRailSlot", "railSlot", "aside");
