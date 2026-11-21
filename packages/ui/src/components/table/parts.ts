import { recipePart } from "../../lib/slot-part";
import { table } from "./table.variants";

const part = (
  name: string,
  tag: string,
  dataSlot: string,
  slot: "root" | "body" | "caption" | "column" | "header" | "row",
) => recipePart(`Raft${name}`, tag, dataSlot, (className) => table()[slot]({ className }));

export const Table = part("Table", "table", "table", "root");
export const TableBody = part("TableBody", "tbody", "table-body", "body");
export const TableCaption = part("TableCaption", "caption", "table-caption", "caption");
export const TableColumn = part("TableColumn", "col", "table-column", "column");
export const TableHeader = part("TableHeader", "thead", "table-header", "header");
export const TableRow = part("TableRow", "tr", "table-row", "row");
