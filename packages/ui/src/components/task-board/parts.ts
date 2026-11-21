import { recipePart } from "../../lib/slot-part";
import { taskBoard } from "./task-board.variants";

export const TaskBoardRoot = recipePart(
  "RaftTaskBoardRoot",
  "div",
  "task-board-root",
  (className) => taskBoard().root({ className }),
);
