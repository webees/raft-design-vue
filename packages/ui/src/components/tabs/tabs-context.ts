import type { InjectionKey } from "vue";
import type { TabsPlacement, TabsVariant } from "./tabs.variants";

export interface TabsUiContextValue {
  placement: TabsPlacement;
  variant: TabsVariant;
}

export const tabsUiContextKey: InjectionKey<TabsUiContextValue> = Symbol("raft-tabs");
