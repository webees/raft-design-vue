import type { VNodeChild } from "vue";

/** One selectable row. `label` also names the radio or checkbox. */
export type ChoiceListItem = {
  value: string;
  label: VNodeChild;
  /** What the search matches, case-insensitively. Defaults to a string label. */
  searchText?: string;
  description?: VNodeChild | readonly VNodeChild[];
  meta?: VNodeChild | readonly VNodeChild[];
  media?: VNodeChild;
  /** A button or switch laid at the row's trailing edge. */
  action?: VNodeChild;
  /** A status line under the name, on its own line. */
  status?: VNodeChild;
  /** Text after the meta, on the row's last line. */
  note?: VNodeChild;
  /** A section name; must match a `groups` entry to get a heading. */
  group?: string;
  disabled?: boolean;
};

/** A section heading. Rows name it through their `group`. */
export type ChoiceListGroup = {
  value: string;
  label: VNodeChild;
};

export type ChoiceListSingleProps = {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
};

export type ChoiceListMultipleProps = {
  multiple: true;
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: readonly string[]) => void;
};

export type ChoiceListProps = {
  items?: readonly ChoiceListItem[];
  groups?: readonly ChoiceListGroup[];
  /** `"auto"` shows the search past five items; `"always"` always shows it. */
  search?: "auto" | "always";
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  matchedValues?: readonly string[];
  clearSearchLabel?: string;
  noMatchLabel?: string;
  empty?: VNodeChild;
  footer?: VNodeChild;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  disabled?: boolean;
  scroll?: boolean;
  fill?: boolean;
  className?: string;
} & (ChoiceListSingleProps | ChoiceListMultipleProps);
