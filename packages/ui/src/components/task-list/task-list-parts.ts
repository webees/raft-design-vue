import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import TaskStatusIcon from "../tasks/TaskStatusIcon.vue";
import { cn } from "../../lib/cn";
import { ChevronDown } from "lucide-vue-next";
import type { TaskStatusId } from "../../lib/task-status";
import { taskListSection } from "./task-list.variants";

type SectionSlot = "heading" | "badge" | "count" | "chevron" | "panel" | "items" | "empty";

function createSectionPart(name: string, slot: SectionSlot, tag: string, slotName: string) {
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
            class: taskListSection()[slot]({ className: attrs.class as string }),
          },
          slots.default?.(),
        );
    },
  });
}

export const TaskSectionHeading = createSectionPart(
  "RaftTaskSectionHeading",
  "heading",
  "span",
  "task-section-heading",
);
export const TaskSectionCount = createSectionPart(
  "RaftTaskSectionCount",
  "count",
  "span",
  "task-section-count",
);
export const TaskSectionItems = createSectionPart(
  "RaftTaskSectionItems",
  "items",
  "div",
  "task-section-items",
);
export const TaskSectionEmpty = createSectionPart(
  "RaftTaskSectionEmpty",
  "empty",
  "div",
  "task-section-empty",
);

export const TaskSectionBadge = defineComponent({
  name: "RaftTaskSectionBadge",
  inheritAttrs: false,
  props: { status: { type: String as PropType<TaskStatusId>, required: true } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "task-section-badge",
          class: cn(taskListSection().badge(), attrs.class as string),
        },
        [h(TaskStatusIcon, { status: props.status }), slots.default?.()],
      );
  },
});

export const TaskSectionChevron = defineComponent({
  name: "RaftTaskSectionChevron",
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          "data-slot": "task-section-chevron",
          class: taskListSection().chevron({ className: attrs.class as string }),
        },
        slots.default?.() ?? [h(ChevronDown, { "aria-hidden": "true" })],
      );
  },
});
