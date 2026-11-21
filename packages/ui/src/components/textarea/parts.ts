import { recipePart } from "../../lib/slot-part";
import { textareaGroup } from "./textarea.variants";

const { root } = textareaGroup();

export const TextareaGroup = recipePart("RaftTextareaGroup", "div", "textarea-group", (className) =>
  root({ className }),
);
