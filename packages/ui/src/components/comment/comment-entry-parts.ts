import { createSlotComponent } from "../../lib/create-slot-component";
import { comment } from "./comment.recipe";

export const CommentEntry = createSlotComponent({
  name: "RaftCommentEntry",
  tag: "article",
  dataSlot: "comment-entry",
  classes: (className) => comment().entry({ class: className }),
});

export const CommentEntryHeader = createSlotComponent({
  name: "RaftCommentEntryHeader",
  tag: "header",
  dataSlot: "comment-entry-header",
  classes: (className) => comment().entryHeader({ class: className }),
});

export const CommentEntryAuthor = createSlotComponent({
  name: "RaftCommentEntryAuthor",
  tag: "span",
  dataSlot: "comment-entry-author",
  classes: (className) => comment().entryAuthor({ class: className }),
});

export const CommentEntryTime = createSlotComponent({
  name: "RaftCommentEntryTime",
  tag: "time",
  dataSlot: "comment-entry-time",
  classes: (className) => comment().entryTime({ class: className }),
});
