import type { InjectionKey, Ref } from "vue";

export type SortableTabsContextValue = {
  /** The order the tabs are drawn in, before and during a drag. */
  value: Ref<readonly (string | number)[]>;
  activeId: Ref<string | null>;
  overId: Ref<string | null>;
  /** The dragged tab's size along `axis`, for the sibling slide. */
  activeSize: Ref<number>;
  axis: Ref<"x" | "y">;
  /** The dragged tab's content, for the lifted copy. */
  copies: Map<string, () => unknown>;
};

export const sortableTabsContextKey: InjectionKey<SortableTabsContextValue> =
  Symbol("raft-sortable-tabs");
