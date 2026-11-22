import { fixedPartFactory } from "../../lib/slot-part";
import { popover } from "./popover.variants";

const part = fixedPartFactory(popover);

export const PopoverBackdrop = part("PopoverBackdrop", "backdrop");
export const PopoverBody = part("PopoverBody", "body");
export const PopoverHeader = part("PopoverHeader", "header");
export const PopoverTitle = part("PopoverTitle", "title", "h2");
