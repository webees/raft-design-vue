import { ContextMenuRadioGroup as RekaContextMenuRadioGroup } from "reka-ui";

import { createRekaRadioGroup } from "../../lib/reka-radio-group";
import { fixedPartFactory } from "../../lib/slot-part";
import { contextMenu } from "./context-menu.variants";

const part = fixedPartFactory(contextMenu);

export const ContextMenuRadioGroup = createRekaRadioGroup({
  name: "RaftContextMenuRadioGroup",
  component: RekaContextMenuRadioGroup,
  dataSlot: "context-menu-radio-group",
  classes: (className) => contextMenu().radioGroup({ className }),
});
export const ContextMenuFooter = part("ContextMenuFooter", "footer");
export const ContextMenuItemLabel = part("ContextMenuItemLabel", "itemLabel", "span");
export const ContextMenuPopup = part("ContextMenuPopup", "content", "div", {
  dataSlot: "context-menu-content",
});
export const ContextMenuShortcut = part("ContextMenuShortcut", "shortcut", "span");
