import { inject, type InjectionKey } from "vue";
import type { TabsPlacement, TabsVariant } from "./tabs.variants";

export interface TabsUiContextValue {
  placement: TabsPlacement;
  variant: TabsVariant;
}

export const tabsUiContextKey: InjectionKey<TabsUiContextValue> = Symbol("raft-tabs");

const fallback: TabsUiContextValue = { placement: "top", variant: "default" };

/** The nearest `Tabs` root's variant and placement, defaulted for lone parts. */
export const useTabsUi = () => inject(tabsUiContextKey, fallback);
