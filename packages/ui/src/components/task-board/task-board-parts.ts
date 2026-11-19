import { createTaskTreeParts } from "../tasks/task-tree-parts";
import { taskBoardColumn } from "./task-board.variants";

const parts = createTaskTreeParts({
  prefix: "RaftTaskBoardColumn",
  namespace: "task-board-column",
  recipe: taskBoardColumn,
});

export const TaskBoardColumnHeading = parts.Heading;
export const TaskBoardColumnCount = parts.Count;
export const TaskBoardColumnItems = parts.Items;
export const TaskBoardColumnEmpty = parts.Empty;
export const TaskBoardColumnEmptyIdle = parts.EmptyIdle;
export const TaskBoardColumnEmptyAllowed = parts.EmptyAllowed;
export const TaskBoardColumnEmptyBlocked = parts.EmptyBlocked;
export const TaskBoardColumnBadge = parts.Badge;
export const TaskBoardColumnChevron = parts.Chevron;
