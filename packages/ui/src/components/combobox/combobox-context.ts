import { computed, inject, provide, type InjectionKey, type Ref } from "vue";

export type ComboboxContext = {
  value: Ref<string | readonly string[] | null>;
  setValue: (value: string | readonly string[] | null) => void;
  clear: () => void;
  open: Ref<boolean>;
  setOpen: (open: boolean) => void;
  multiple: Ref<boolean>;
};

const COMBOBOX_KEY: InjectionKey<ComboboxContext> = Symbol("raft-combobox");

export function provideCombobox(context: ComboboxContext) {
  provide(COMBOBOX_KEY, context);
}

export function useCombobox() {
  return inject(COMBOBOX_KEY, null);
}

export function useComboboxSelection() {
  const context = useCombobox();
  const values = computed<readonly string[]>(() => {
    const value = context?.value.value;
    if (value == null) return [];
    return Array.isArray(value) ? value : [value as string];
  });
  return { context, values };
}

export type ComboboxInputOwner = "group" | "control";

const inputOwnerKey: InjectionKey<Ref<ComboboxInputOwner>> = Symbol("raft-combobox-input-owner");

export function provideComboboxInputOwner(owner: ComboboxInputOwner) {
  provide(
    inputOwnerKey,
    computed(() => owner),
  );
}

export function useComboboxInputOwner() {
  return inject(inputOwnerKey, undefined);
}
