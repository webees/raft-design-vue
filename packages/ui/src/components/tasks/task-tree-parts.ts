import { defineComponent, h, type PropType } from "vue";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import type { TaskStatusId } from "../../lib/task-status";
import TaskStatusIcon from "./TaskStatusIcon.vue";

type Slot = (options?: { className?: string }) => string;

interface TaskTreePartsOptions {
  /** Component name prefix, e.g. `RaftTaskBoardColumn`. */
  prefix: string;
  /** `data-slot` prefix, e.g. `task-board-column`. */
  namespace: string;
  recipe: () => Record<string, Slot>;
}

const kebab = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

/** The parts shared by a task board column and a task list section. */
export function createTaskTreeParts({ prefix, namespace, recipe }: TaskTreePartsOptions) {
  const part = (name: string, slot: string, tag: string) =>
    defineComponent({
      name: `${prefix}${name}`,
      inheritAttrs: false,
      setup(_, { slots, attrs }) {
        return () =>
          h(
            tag,
            {
              ...attrs,
              "data-slot": `${namespace}-${kebab(name)}`,
              class: recipe()[slot]!({ className: attrs.class as string }),
            },
            slots.default?.(),
          );
      },
    });

  const Badge = defineComponent({
    name: `${prefix}Badge`,
    inheritAttrs: false,
    props: { status: { type: String as PropType<TaskStatusId>, required: true } },
    setup(props, { slots, attrs }) {
      return () =>
        h(
          "span",
          {
            ...attrs,
            "data-slot": `${namespace}-badge`,
            class: cn(recipe().badge!(), attrs.class as string),
          },
          [h(TaskStatusIcon, { status: props.status }), slots.default?.()],
        );
    },
  });

  const Chevron = defineComponent({
    name: `${prefix}Chevron`,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () =>
        h(
          "span",
          {
            ...attrs,
            "data-slot": `${namespace}-chevron`,
            class: recipe().chevron!({ className: attrs.class as string }),
          },
          slots.default?.() ?? [h(ChevronDown, { "aria-hidden": "true" })],
        );
    },
  });

  return {
    Heading: part("Heading", "heading", "span"),
    Count: part("Count", "count", "span"),
    Items: part("Items", "items", "div"),
    Empty: part("Empty", "empty", "div"),
    EmptyIdle: part("EmptyIdle", "emptyIdle", "span"),
    EmptyAllowed: part("EmptyAllowed", "emptyAllowed", "span"),
    EmptyBlocked: part("EmptyBlocked", "emptyBlocked", "span"),
    Panel: part("Panel", "panel", "div"),
    Badge,
    Chevron,
  };
}
