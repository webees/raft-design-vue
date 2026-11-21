import { createSlotPart, recipePart } from "../../lib/slot-part";
import { taskLoading } from "./task-loading.variants";
import { tasksPanel } from "./tasks-panel.variants";

export const TaskLoadingRow = createSlotPart({
  name: "RaftTaskLoadingRow",
  tag: "div",
  dataSlot: "task-loading-row",
  className: (className) => taskLoading().row({ className }),
  rootProps: () => ({ "aria-hidden": "true" }),
});

export const TasksPanelRoot = recipePart(
  "RaftTasksPanelRoot",
  "section",
  "tasks-panel-root",
  (className) => tasksPanel().root({ className }),
);
