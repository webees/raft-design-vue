import { SelectArrow as RekaSelectArrow, SelectGroup as RekaSelectGroup } from "reka-ui";

import { recipePart, rekaPart } from "../../lib/slot-part";
import { select } from "./select.variants";

export const SelectArrow = rekaPart("RaftSelectArrow", RekaSelectArrow, "select-arrow");

export const SelectEmpty = recipePart("RaftSelectEmpty", "div", "select-empty", (className) =>
  select().empty({ className }),
);

export const SelectGroup = rekaPart(
  "RaftSelectGroup",
  RekaSelectGroup,
  "select-group",
  (className) => select().group({ className }),
);

export const SelectPopup = recipePart("RaftSelectPopup", "div", "select-content", (className) =>
  select().content({ className }),
);
