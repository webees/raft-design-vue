import { ContextMenuRadioGroup as RekaContextMenuRadioGroup } from "reka-ui";

import { createRekaRadioGroup } from "../../lib/reka-radio-group";
import { recipePart } from "../../lib/slot-part";
import { contextMenu } from "./context-menu.variants";

export const ContextMenuRadioGroup = createRekaRadioGroup({
  name: "RaftContextMenuRadioGroup",
  component: RekaContextMenuRadioGroup,
  dataSlot: "context-menu-radio-group",
  classes: (className) => contextMenu().radioGroup({ className }),
});

export const ContextMenuFooter = recipePart(
  "RaftContextMenuFooter",
  "div",
  "context-menu-footer",
  (className) => contextMenu().footer({ class: className }),
);

export const ContextMenuPopup = recipePart(
  "RaftContextMenuPopup",
  "div",
  "context-menu-content",
  (className) => contextMenu().content({ class: className }),
);
