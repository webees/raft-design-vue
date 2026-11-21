import { recipePart } from "../../lib/slot-part";
import { popover } from "./popover.variants";

export const PopoverBackdrop = recipePart(
  "RaftPopoverBackdrop",
  "div",
  "popover-backdrop",
  (className) => popover().backdrop({ className }),
);

export const PopoverBody = recipePart("RaftPopoverBody", "div", "popover-body", (className) =>
  popover().body({ class: className }),
);

export const PopoverHeader = recipePart("RaftPopoverHeader", "div", "popover-header", (className) =>
  popover().header({ class: className }),
);

export const PopoverTitle = recipePart("RaftPopoverTitle", "h2", "popover-title", (className) =>
  popover().title({ class: className }),
);
