import { createSlotComponent } from "../../lib/create-slot-component";
import { comment } from "./comment.recipe";

export const CommentCard = createSlotComponent({
  name: "RaftCommentCard",
  tag: "div",
  dataSlot: "comment-card",
  classes: (className) => comment().card({ class: className }),
});

export const CommentCardTrigger = createSlotComponent({
  name: "RaftCommentCardTrigger",
  tag: "button",
  dataSlot: "comment-card-trigger",
  classes: (className) => comment().cardTrigger({ class: className }),
});

export const CommentCardMeta = createSlotComponent({
  name: "RaftCommentCardMeta",
  tag: "div",
  dataSlot: "comment-card-meta",
  classes: (className) => comment().cardMeta({ class: className }),
});

export const CommentCardQuote = createSlotComponent({
  name: "RaftCommentCardQuote",
  tag: "blockquote",
  dataSlot: "comment-card-quote",
  classes: (className) => comment().cardQuote({ class: className }),
});
