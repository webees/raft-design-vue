import { createCollapsibleSection } from "../../lib/collapsible-section";
import { taskBoardColumn } from "./task-board.variants";

export const TaskBoardColumn = createCollapsibleSection(
  "RaftTaskBoardColumn",
  "task-board-column",
  taskBoardColumn,
);
