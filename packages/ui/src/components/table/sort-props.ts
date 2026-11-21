import type { TableAlign } from "./table.variants";

export type TableSortDirection = "ascending" | "descending";

/** Props shared by the sortable header and the button it wraps. */
export interface TableSortProps {
  sort?: TableSortDirection;
  firstSort?: TableSortDirection;
  align?: TableAlign;
}
