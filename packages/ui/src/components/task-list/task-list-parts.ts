import { createTaskTreeParts } from "../tasks/task-tree-parts";
import { taskListSection } from "./task-list.variants";

const parts = createTaskTreeParts({
  prefix: "RaftTaskSection",
  namespace: "task-section",
  recipe: taskListSection,
});

export const TaskSectionHeading = parts.Heading;
export const TaskSectionCount = parts.Count;
export const TaskSectionItems = parts.Items;
export const TaskSectionEmpty = parts.Empty;
export const TaskSectionBadge = parts.Badge;
export const TaskSectionChevron = parts.Chevron;
