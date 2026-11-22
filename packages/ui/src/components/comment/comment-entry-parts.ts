import { recipePartFactory } from "../../lib/slot-part";
import { comment } from "./comment.recipe";

const part = recipePartFactory(comment);

export const CommentEntry = part("CommentEntry", "entry", "article");
export const CommentEntryHeader = part("CommentEntryHeader", "entryHeader");
export const CommentEntryAuthor = part("CommentEntryAuthor", "entryAuthor", "span");
export const CommentEntryTime = part("CommentEntryTime", "entryTime", "time");
