import { defineComponent, h } from "vue";
import { tasksPanel } from "./tasks-panel.variants";

type PanelSlot =
  | "toolbar"
  | "toolbarGroup"
  | "toolbarNewTask"
  | "toolbarFilters"
  | "toolbarView"
  | "toolbarLabel"
  | "empty";

function createPart(name: string, slot: PanelSlot, tag: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () => {
        const slotClass = tasksPanel()[slot]({ className: attrs.class as string });
        return h(
          tag,
          {
            ...attrs,
            "data-slot":
              slot === "toolbarLabel"
                ? "tasks-panel-toolbar-label"
                : `tasks-panel-${toKebab(slot)}`,
            class: slotClass,
          },
          slots.default?.(),
        );
      };
    },
  });
}

function toKebab(value: string) {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

export const TasksPanelToolbar = createPart("RaftTasksPanelToolbar", "toolbar", "div");
export const TasksPanelToolbarGroup = createPart(
  "RaftTasksPanelToolbarGroup",
  "toolbarGroup",
  "div",
);
export const TasksPanelToolbarNewTask = createPart(
  "RaftTasksPanelToolbarNewTask",
  "toolbarNewTask",
  "div",
);
export const TasksPanelToolbarFilters = createPart(
  "RaftTasksPanelToolbarFilters",
  "toolbarFilters",
  "div",
);
export const TasksPanelToolbarView = createPart("RaftTasksPanelToolbarView", "toolbarView", "div");
export const TasksPanelToolbarLabel = createPart(
  "RaftTasksPanelToolbarLabel",
  "toolbarLabel",
  "span",
);
export const TasksPanelEmpty = createPart("RaftTasksPanelEmpty", "empty", "div");
