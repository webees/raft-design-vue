import { cn } from "../../lib/cn";
import { recipePart } from "../../lib/slot-part";
import { workspaceButton } from "./workspace-button.variants";

export const WorkspaceButtonName = recipePart(
  "RaftWorkspaceButtonName",
  "span",
  "workspace-button-name",
  (className) => cn(workspaceButton().name(), className),
);
