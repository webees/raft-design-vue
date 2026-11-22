import { fixedPartFactory } from "../../lib/slot-part";
import { listRow } from "./list-row.variants";

const part = fixedPartFactory(listRow);

export const ListRowBody = part("ListRowBody", "body", "span");
export const ListRowBottom = part("ListRowBottom", "line", "span");
export const ListRowDescription = part("ListRowDescription", "description", "span");
export const ListRowGroup = part("ListRowGroup", "group", "div");
export const ListRowIcon = part("ListRowIcon", "icon", "span");
export const ListRowMeta = part("ListRowMeta", "meta", "span");
export const ListRowSubtitle = part("ListRowSubtitle", "subtitle", "span");
export const ListRowTitle = part("ListRowTitle", "title", "span");
export const ListRowTop = part("ListRowTop", "line", "span");
export const ListRowValue = part("ListRowValue", "value", "span");
