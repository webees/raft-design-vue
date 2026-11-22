import { fixedPartFactory } from "../../lib/slot-part";
import { taskList } from "./task-list.variants";

export const TaskListRoot = fixedPartFactory(taskList)("TaskListRoot", "root");
