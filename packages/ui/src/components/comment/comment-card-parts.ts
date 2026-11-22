import { recipePartFactory } from "../../lib/slot-part";
import { comment } from "./comment.recipe";

const part = recipePartFactory(comment);

export const CommentCard = part("CommentCard", "card");
export const CommentCardTrigger = part("CommentCardTrigger", "cardTrigger", "button");
export const CommentCardMeta = part("CommentCardMeta", "cardMeta");
export const CommentCardQuote = part("CommentCardQuote", "cardQuote", "blockquote");
