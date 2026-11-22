import { SelectArrow as RekaSelectArrow, SelectGroup as RekaSelectGroup } from "reka-ui";

import { fixedPartFactory, rekaPart } from "../../lib/slot-part";
import { select } from "./select.variants";

const part = fixedPartFactory(select);

export const SelectArrow = rekaPart("RaftSelectArrow", RekaSelectArrow, "select-arrow");
export const SelectEmpty = part("SelectEmpty", "empty");
export const SelectGroup = rekaPart(
  "RaftSelectGroup",
  RekaSelectGroup,
  "select-group",
  (className) => select().group({ className }),
);
export const SelectPopup = part("SelectPopup", "content", "div", { dataSlot: "select-content" });
