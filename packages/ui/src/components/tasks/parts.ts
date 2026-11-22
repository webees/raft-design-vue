import { fixedPartFactory } from "../../lib/slot-part";
import { taskLoading } from "./task-loading.variants";
import { tasksPanel } from "./tasks-panel.variants";

export const TaskLoadingRow = fixedPartFactory(taskLoading)("TaskLoadingRow", "row", "div", {
  rootProps: () => ({ "aria-hidden": "true" }),
});
export const TasksPanelRoot = fixedPartFactory(tasksPanel)("TasksPanelRoot", "root", "section");
