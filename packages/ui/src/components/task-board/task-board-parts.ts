import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { ChevronDown } from "lucide-vue-next";
import TaskStatusIcon from "../tasks/TaskStatusIcon.vue";
import { cn } from "../../lib/cn";
import type { TaskStatusId } from "../../lib/task-status";
import { taskBoardColumn } from "./task-board.variants";

type ColumnSlot =
  | "heading"
  | "badge"
  | "count"
  | "chevron"
  | "items"
  | "empty"
  | "emptyIdle"
  | "emptyAllowed"
  | "emptyBlocked";

function createColumnPart(name: string, slot: ColumnSlot, tag: string, slotName: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () =>
        h(
          tag,
          {
            ...attrs,
            "data-slot": slotName,
            class: taskBoardColumn()[slot]({ className: attrs.class as string }),
          },
          slots.default?.(),
        );
    },
  });
}

export const TaskBoardColumnHeading = createColumnPart(
  "RaftTaskBoardColumnHeading",
  "heading",
  "span",
  "task-board-column-heading",
);
export const TaskBoardColumnCount = createColumnPart(
  "RaftTaskBoardColumnCount",
  "count",
  "span",
  "task-board-column-count",
);
export const TaskBoardColumnItems = createColumnPart(
  "RaftTaskBoardColumnItems",
  "items",
  "div",
  "task-board-column-items",
);
export const TaskBoardColumnEmpty = createColumnPart(
  "RaftTaskBoardColumnEmpty",
  "empty",
  "div",
  "task-board-column-empty",
);
export const TaskBoardColumnEmptyIdle = createColumnPart(
  "RaftTaskBoardColumnEmptyIdle",
  "emptyIdle",
  "span",
  "task-board-column-empty-idle",
);
export const TaskBoardColumnEmptyAllowed = createColumnPart(
  "RaftTaskBoardColumnEmptyAllowed",
  "emptyAllowed",
  "span",
  "task-board-column-empty-allowed",
);
export const TaskBoardColumnEmptyBlocked = createColumnPart(
  "RaftTaskBoardColumnEmptyBlocked",
  "emptyBlocked",
  "span",
  "task-board-column-empty-blocked",
);

export const TaskBoardColumnBadge = defineComponent({
  name: "RaftTaskBoardColumnBadge",
  inheritAttrs: false,
  props: { status: { type: String as PropType<TaskStatusId>, required: true } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "task-board-column-badge",
          class: cn(taskBoardColumn().badge(), attrs.class as string),
        },
        [h(TaskStatusIcon, { status: props.status }), slots.default?.()],
      );
  },
});

export const TaskBoardColumnChevron = defineComponent({
  name: "RaftTaskBoardColumnChevron",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "task-board-column-chevron",
          class: taskBoardColumn().chevron({ className: attrs.class as string }),
        },
        slots.default?.() ?? [h(ChevronDown, { "aria-hidden": "true" })],
      );
  },
});
