import { fixedPartFactory } from "../../lib/slot-part";
import { taskCard } from "./task-card.variants";

const createPart = fixedPartFactory(taskCard);

export const TaskCardRow = createPart("TaskCardRow", "row");
export const TaskCardBody = createPart("TaskCardBody", "body");
export const TaskCardMeta = createPart("TaskCardMeta", "meta");
export const TaskCardChannel = createPart("TaskCardChannel", "channel", "span");
export const TaskCardNumber = createPart("TaskCardNumber", "number", "span");
export const TaskCardLegacy = createPart("TaskCardLegacy", "legacy", "span");
export const TaskCardTitle = createPart("TaskCardTitle", "title", "p");
export const TaskCardDescription = createPart("TaskCardDescription", "description", "p");
