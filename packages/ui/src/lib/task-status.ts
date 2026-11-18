export type TaskStatusId =
  | "backlog"
  | "todo"
  | "in-progress"
  | "in-review"
  | "done"
  | "closed";

export const TASK_STATUS_IDS: readonly TaskStatusId[] = [
  "backlog",
  "todo",
  "in-progress",
  "in-review",
  "done",
  "closed",
];
