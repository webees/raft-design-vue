export {
  CommentCard,
  CommentCardMeta,
  CommentCardQuote,
  CommentCardTrigger,
} from "./comment-card-parts";
export { default as CommentEntryBody } from "./CommentEntryBody.vue";
export {
  CommentEntry,
  CommentEntryAuthor,
  CommentEntryHeader,
  CommentEntryTime,
} from "./comment-entry-parts";
export { default as CommentMargin } from "./CommentMargin.vue";
export { default as CommentMarginItem } from "./CommentMarginItem.vue";
export { default as CommentMarker } from "./CommentMarker.vue";
export { comment } from "./comment.recipe";
export {
  COMMENT_HIGHLIGHT,
  COMMENT_HIGHLIGHT_ACTIVE,
  setCommentHighlights,
} from "./comment-highlight";
export {
  resolveCommentMarginLayout,
  type CommentMarginLayout,
  type CommentMarginLayoutItem,
  type CommentMarginLayoutOptions,
} from "./comment-margin-layout";
export {
  useCommentMarginFits,
  type UseCommentMarginFitsOptions,
} from "./use-comment-margin-fits";
