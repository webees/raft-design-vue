import { inject, provide, type InjectionKey, type Ref } from "vue";
import type { SelectChrome } from "./select.variants";

const SELECT_CHROME_KEY: InjectionKey<Ref<SelectChrome>> = Symbol("raft-select-chrome");
const SELECT_FIT_KEY: InjectionKey<Ref<boolean>> = Symbol("raft-select-fit");
const SELECT_ITEMS_KEY: InjectionKey<Ref<SelectItems | undefined>> = Symbol("raft-select-items");
const SELECT_ITEM_PARTS_KEY: InjectionKey<SelectItemParts> = Symbol("raft-select-item-parts");

export interface SelectItemParts {
  textId: Ref<string | undefined>;
  descriptionId: Ref<string | undefined>;
}

export function provideSelectItemParts(parts: SelectItemParts) {
  provide(SELECT_ITEM_PARTS_KEY, parts);
}

export function useSelectItemParts() {
  return inject(SELECT_ITEM_PARTS_KEY, undefined);
}

export type SelectItemLabel = string | number;
export type SelectItems =
  | Record<string, SelectItemLabel>
  | readonly { label?: SelectItemLabel; items?: readonly { label?: SelectItemLabel }[] }[];

export function provideSelectChrome(chrome: Ref<SelectChrome>) {
  provide(SELECT_CHROME_KEY, chrome);
}

export function useSelectChrome() {
  return inject(SELECT_CHROME_KEY, { value: "default" } as Ref<SelectChrome>);
}

export function provideSelectFit(fit: Ref<boolean>) {
  provide(SELECT_FIT_KEY, fit);
}

export function useSelectFit() {
  return inject(SELECT_FIT_KEY, { value: false } as Ref<boolean>);
}

export function provideSelectItems(items: Ref<SelectItems | undefined>) {
  provide(SELECT_ITEMS_KEY, items);
}

export function useSelectItems() {
  return inject(SELECT_ITEMS_KEY, { value: undefined } as Ref<SelectItems | undefined>);
}

/** Every label in `items`, groups flattened: what a `fit` trigger may show. */
export function selectItemLabels(items: SelectItems | undefined): SelectItemLabel[] {
  if (items == null) return [];
  if (!Array.isArray(items)) return Object.values(items);
  return (
    items as readonly { label?: SelectItemLabel; items?: readonly { label?: SelectItemLabel }[] }[]
  )
    .flatMap((entry) => (Array.isArray(entry.items) ? entry.items : [entry]))
    .map((item) => item.label)
    .filter((label): label is SelectItemLabel => label != null);
}
