import { defineComponent, h } from "vue";
import type { SVGAttributes } from "vue";
import TaskStatusIcon from "./TaskStatusIcon.vue";
import type { TaskStatusId } from "../../lib/task-status";

function createStatusIcon(name: string, status: TaskStatusId) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h(TaskStatusIcon, { ...(attrs as SVGAttributes), status });
    },
  });
}

export const TaskBacklogIcon = createStatusIcon("RaftTaskBacklogIcon", "backlog");
export const TaskTodoIcon = createStatusIcon("RaftTaskTodoIcon", "todo");
export const TaskInProgressIcon = createStatusIcon(
  "RaftTaskInProgressIcon",
  "in-progress",
);
export const TaskInReviewIcon = createStatusIcon("RaftTaskInReviewIcon", "in-review");
export const TaskDoneIcon = createStatusIcon("RaftTaskDoneIcon", "done");
export const TaskClosedIcon = createStatusIcon("RaftTaskClosedIcon", "closed");
