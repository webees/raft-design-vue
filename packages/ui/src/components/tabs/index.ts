import TabsRoot from "./Tabs.vue";
import TabsListRoot from "./TabsList.vue";
import TabsTabRoot from "./TabsTab.vue";
import TabsPanelRoot from "./TabsPanel.vue";

export const Tabs = TabsRoot;
export const TabsList = TabsListRoot;
export const TabsTab = TabsTabRoot;
export const TabsPanel = TabsPanelRoot;
export { TabsLabel } from "./parts";
export { default as SortableTabsList } from "./SortableTabsList.vue";
export { default as SortableTabsTab } from "./SortableTabsTab.vue";

export { tabs } from "./tabs.variants";
export type { TabsPlacement, TabsVariant } from "./tabs.variants";
export type { SortableTabsContextValue } from "./tabs-sortable-context";
export { reconcileTabOrder, useOrderedTabs } from "./use-ordered-tabs";
export type { OrderedTabItem } from "./use-ordered-tabs";
