import type { InjectionKey, Ref } from "vue";

export type ComposerSortableContextValue = {
  activeId: Ref<string | null>;
  /** The dragged attachment is drawn where it would drop. */
  home: Ref<boolean>;
  /** Announcement labels, registered by each attachment. */
  labels: Map<string, string>;
};

export const composerSortableContextKey: InjectionKey<ComposerSortableContextValue> = Symbol(
  "raft-sortable-composer-attachments",
);
