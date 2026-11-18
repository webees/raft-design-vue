import { tv } from "../../lib/tv";

/** The soft (washed) background for a status: the chip and the card status.
 *  Backlog's has no tint, only a `line-hairline` outline in its place. */
export const taskStatusSoft = tv({
  variants: {
    status: {
      backlog: "bg-transparent inset-ring inset-ring-line-hairline",
      todo: "bg-task-status-todo-soft",
      "in-progress": "bg-task-status-in-progress-soft",
      "in-review": "bg-task-status-in-review-soft",
      done: "bg-task-status-done-soft",
      closed: "bg-task-status-closed-soft",
    },
  },
});

/** The strong (readable-on-soft) ink slot for a status. Backlog, with no hue,
 *  reads in plain `foreground`. */
export const taskStatusStrong = tv({
  variants: {
    status: {
      backlog: "text-foreground",
      todo: "text-task-status-todo-strong",
      "in-progress": "text-task-status-in-progress-strong",
      "in-review": "text-task-status-in-review-strong",
      done: "text-task-status-done-strong",
      closed: "text-task-status-closed-strong",
    },
  },
});
