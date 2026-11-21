import { recipePart } from "../../lib/slot-part";
import { taskList } from "./task-list.variants";

export const TaskListRoot = recipePart("RaftTaskListRoot", "div", "task-list-root", (className) =>
  taskList().root({ className }),
);
