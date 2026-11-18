import type { VNodeChild } from "vue";

export type ComboboxSelectValue = string | number;
export type ComboboxSelectSelection<Multiple extends boolean | undefined = false> =
  Multiple extends true ? ComboboxSelectValue[] : ComboboxSelectValue | null;

export interface ComboboxSelectOption {
  value: ComboboxSelectValue;
  label: string;
  disabled?: boolean;
}

export interface ComboboxSelectGroup<Option = ComboboxSelectOption> {
  type: "group";
  key: string | number;
  label: VNodeChild;
  children: readonly Option[];
}

export interface ComboboxSelectMessages {
  clear: string;
  toggle: string;
  selected: string;
  chipDescription: string;
  inputDescription: string;
  remove: (label: string) => string;
}

export type ComboboxSelectProps<Option = ComboboxSelectOption> = {
  options: readonly (Option | ComboboxSelectGroup<Option>)[];
  multiple?: boolean;
  modelValue?: ComboboxSelectSelection<boolean>;
  defaultValue?: ComboboxSelectSelection<boolean>;
  labelField?: keyof Option;
  valueField?: keyof Option;
  disabledField?: keyof Option;
  fallbackOption?: (value: ComboboxSelectValue) => Option;
  filterable?: boolean;
  filter?: false | ((query: string, option: Option) => boolean);
  remote?: boolean;
  onSearch?: (query: string) => void;
  loading?: boolean;
  create?: boolean;
  creatable?: boolean;
  onCreate?: (query: string) => Option | null;
  clearable?: boolean;
  showArrow?: boolean;
  clearFilterAfterSelect?: boolean;
  onClear?: () => void;
  maxTagCount?: number;
  size?: "sm" | "md" | "lg";
  status?: "error" | "warning";
  placeholder?: string;
  renderLabel?: (option: Option) => VNodeChild;
  renderOption?: (option: Option, info: { selected: boolean }) => VNodeChild;
  renderTag?: (option: Option) => VNodeChild;
  renderCreateLabel?: (query: string) => VNodeChild;
  emptyContent?: VNodeChild;
  loadingContent?: VNodeChild;
  messages?: Partial<ComboboxSelectMessages>;
  listMaxHeight?: number | string;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  autoHighlight?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};
