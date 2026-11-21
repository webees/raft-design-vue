import { recipePart } from "../../lib/slot-part";
import { messageSystem } from "./system-message.variants";

export const SystemMessage = recipePart(
  "RaftSystemMessage",
  "div",
  "system-message-item",
  (className) => messageSystem().systemRoot({ className }),
);
