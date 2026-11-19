import { createCollapsibleSection } from "../../lib/collapsible-section";
import { taskListSection } from "./task-list.variants";

export const TaskSection = createCollapsibleSection(
  "RaftTaskSection",
  "task-section",
  taskListSection,
);
