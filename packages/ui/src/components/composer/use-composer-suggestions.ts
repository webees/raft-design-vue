import { computed, onBeforeUnmount, ref, toValue, useId, watch, type MaybeRefOrGetter } from "vue";

export interface ComposerSuggestionTriggerMatch {
  /** The trigger marker that opened the list, e.g. "@" or "#". */
  marker: string;
  /** The query typed after the marker, excluding the marker. */
  query: string;
  /** Caret index in the value where the marker begins. */
  start: number;
}

export interface UseComposerSuggestionsParams<TItem extends object> {
  /** Controlled value of the composer input (Vue: ref/getter). */
  value: MaybeRefOrGetter<string>;
  /** Called when typing or an inserted suggestion changes the value. */
  onValueChange: (value: string) => void;
  /** Detect an active trigger in the text before the caret; null when inactive. */
  detectTrigger: (textBeforeCaret: string) => ComposerSuggestionTriggerMatch | null;
  /** Items offered for the active trigger. An empty list closes the popup. */
  getItems: (match: ComposerSuggestionTriggerMatch) => readonly TItem[];
  /** Text inserted in place of the trigger token when an item is chosen, e.g. "@handle ". */
  getItemText: (item: TItem) => string;
  /** Optional predicate marking an item as non-selectable. */
  isItemDisabled?: (item: TItem) => boolean;
}

export type ComposerSuggestionsInputProps = Record<string, unknown>;
export type ComposerSuggestionsListProps = Record<string, unknown>;
export type ComposerSuggestionsOptionProps = Record<string, unknown>;

function findNextEnabledIndex<TItem>(
  items: readonly TItem[],
  current: number,
  direction: 1 | -1,
  isItemDisabled: (item: TItem) => boolean,
) {
  if (items.length === 0) return -1;
  const start = current >= 0 ? current : direction === 1 ? -1 : 0;
  for (let offset = 1; offset <= items.length; offset += 1) {
    const index = (start + direction * offset + items.length) % items.length;
    if (!isItemDisabled(items[index]!)) return index;
  }
  return -1;
}

function normalizeHighlightedIndex<TItem>(
  items: readonly TItem[],
  highlightedIndex: number,
  isItemDisabled: (item: TItem) => boolean,
) {
  const highlightedItem = items[highlightedIndex];
  if (highlightedItem !== undefined && !isItemDisabled(highlightedItem)) return highlightedIndex;
  return findNextEnabledIndex(items, -1, 1, isItemDisabled);
}

/**
 * Headless behavior for an inline trigger-driven suggestion popup (@mention, #channel)
 * layered over a composer textarea. Owns open state, highlighted option, keyboard
 * navigation, IME guarding, and caret-preserving insertion. The consumer supplies
 * trigger detection, item data, insertion text, and textarea/listbox option semantics.
 */
export function useComposerSuggestions<TItem extends object>({
  value,
  onValueChange,
  detectTrigger,
  getItems,
  getItemText,
  isItemDisabled = () => false,
}: UseComposerSuggestionsParams<TItem>) {
  const listId = `composer-suggestions-${useId()}`;
  const inputRef = ref<HTMLTextAreaElement | null>(null);
  const listRef = ref<HTMLDivElement | null>(null);
  const composing = ref(false);
  let frame: number | null = null;
  let caret = toValue(value).length;

  const interaction = ref({
    highlightedIndex: (() => {
      const initialMatch = detectTrigger(toValue(value));
      return initialMatch
        ? findNextEnabledIndex(getItems(initialMatch), -1, 1, isItemDisabled)
        : -1;
    })(),
    match: detectTrigger(toValue(value)),
    value: toValue(value),
  });

  const match = computed(() =>
    interaction.value.value === toValue(value) ? interaction.value.match : null,
  );
  const items = computed<readonly TItem[]>(() => (match.value ? getItems(match.value) : []));
  const highlightedIndex = computed(() =>
    normalizeHighlightedIndex(items.value, interaction.value.highlightedIndex, isItemDisabled),
  );
  const hasActiveItem = computed(
    () => highlightedIndex.value >= 0 && highlightedIndex.value < items.value.length,
  );
  const activeItem = computed<TItem | undefined>(() =>
    hasActiveItem.value ? items.value[highlightedIndex.value] : undefined,
  );
  const open = computed(() => Boolean(match.value && items.value.length > 0));

  const syncTrigger = (nextValue: string, nextCaret: number) => {
    const nextMatch = detectTrigger(nextValue.slice(0, nextCaret));
    interaction.value = {
      highlightedIndex: nextMatch
        ? findNextEnabledIndex(getItems(nextMatch), -1, 1, isItemDisabled)
        : -1,
      match: nextMatch,
      value: nextValue,
    };
  };

  const commit = (nextValue: string, nextCaret: number) => {
    onValueChange(nextValue);
    interaction.value = { highlightedIndex: -1, match: null, value: nextValue };
    caret = nextCaret;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      inputRef.value?.focus({ preventScroll: true });
      inputRef.value?.setSelectionRange(nextCaret, nextCaret);
      frame = null;
    });
  };

  const select = (item: TItem) => {
    if (!match.value || isItemDisabled(item)) return;
    const current = toValue(value);
    const at = interaction.value.value === current ? caret : current.length;
    const insertion = getItemText(item);
    const nextValue = `${current.slice(0, match.value.start)}${insertion}${current.slice(at)}`;
    commit(nextValue, match.value.start + insertion.length);
  };

  const insert = (text: string) => {
    const current = toValue(value);
    const at = interaction.value.value === current ? caret : current.length;
    const nextValue = `${current.slice(0, at)}${text}${current.slice(at)}`;
    commit(nextValue, at + text.length);
  };

  const clear = () => {
    onValueChange("");
    interaction.value = { highlightedIndex: -1, match: null, value: "" };
    caret = 0;
  };

  const handleInput = (event: Event) => {
    const target = event.currentTarget as HTMLTextAreaElement;
    caret = target.selectionStart ?? 0;
    onValueChange(target.value);
    syncTrigger(target.value, caret);
  };

  const handleSelect = (event: Event) => {
    const target = event.currentTarget as HTMLTextAreaElement;
    caret = target.selectionStart ?? 0;
    syncTrigger(target.value, caret);
  };

  const handleCompositionEnd = (event: Event) => {
    composing.value = false;
    const target = event.currentTarget as HTMLTextAreaElement;
    caret = target.selectionStart ?? 0;
    syncTrigger(target.value, caret);
  };

  const handleBlur = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && listRef.value?.contains(next)) return;
    interaction.value = { highlightedIndex: -1, match: null, value: toValue(value) };
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (composing.value || event.isComposing || event.keyCode === 229) return;
    if (event.key === "Escape" && open.value) {
      event.preventDefault();
      interaction.value = { highlightedIndex: -1, match: null, value: toValue(value) };
      return;
    }
    if (!open.value) return;
    if (event.key === "Enter" && !event.shiftKey && !hasActiveItem.value) {
      event.preventDefault();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      interaction.value = {
        highlightedIndex: findNextEnabledIndex(
          items.value,
          highlightedIndex.value,
          event.key === "ArrowDown" ? 1 : -1,
          isItemDisabled,
        ),
        match: match.value,
        value: toValue(value),
      };
      return;
    }
    if (
      (event.key === "Tab" || (event.key === "Enter" && !event.shiftKey)) &&
      hasActiveItem.value &&
      activeItem.value !== undefined &&
      !isItemDisabled(activeItem.value)
    ) {
      event.preventDefault();
      select(activeItem.value);
    }
  };

  watch(
    [open, highlightedIndex],
    () => {
      if (!open.value || highlightedIndex.value < 0) return;
      const list = listRef.value;
      const option = list?.querySelector<HTMLElement>(
        `[data-composer-suggestion-index="${highlightedIndex.value}"]`,
      );
      if (!list || !option) return;
      const listRect = list.getBoundingClientRect();
      const optionRect = option.getBoundingClientRect();
      if (optionRect.top < listRect.top || optionRect.bottom > listRect.bottom) {
        option.scrollIntoView({ block: "nearest" });
      }
    },
    { flush: "post" },
  );

  onBeforeUnmount(() => {
    if (frame !== null) cancelAnimationFrame(frame);
  });

  function mergeProps(base: Record<string, unknown>, internal: Record<string, unknown>) {
    const out: Record<string, unknown> = { ...base, ...internal };
    for (const key of Object.keys(internal)) {
      const theirs = base[key];
      if (typeof theirs === "function" && typeof internal[key] === "function") {
        const ours = internal[key] as (...args: unknown[]) => void;
        out[key] = (...args: unknown[]) => {
          (theirs as (...args: unknown[]) => void)(...args);
          ours(...args);
        };
      }
    }
    return out;
  }

  const getInputProps = (props: ComposerSuggestionsInputProps = {}) =>
    mergeProps(props, {
      "aria-activedescendant":
        open.value && highlightedIndex.value >= 0
          ? `${listId}-option-${highlightedIndex.value}`
          : undefined,
      "aria-autocomplete": "list",
      "aria-controls": open.value ? listId : undefined,
      ref: inputRef,
      value: toValue(value),
      onBlur: handleBlur,
      onInput: handleInput,
      onCompositionEnd: handleCompositionEnd,
      onCompositionStart: () => {
        composing.value = true;
      },
      onKeydown: handleKeydown,
      onSelect: handleSelect,
    });

  const getListProps = (props: ComposerSuggestionsListProps = {}) =>
    mergeProps(props, { id: listId, ref: listRef, role: "listbox" });

  const getOptionProps = (
    item: TItem,
    index: number,
    props: ComposerSuggestionsOptionProps = {},
  ) => {
    const highlighted = index === highlightedIndex.value;
    const disabled = isItemDisabled(item);
    return mergeProps(props, {
      "aria-disabled": disabled,
      "aria-selected": highlighted,
      "data-disabled": disabled ? "" : undefined,
      "data-composer-suggestion-index": index,
      "data-highlighted": highlighted ? "" : undefined,
      id: `${listId}-option-${index}`,
      role: "option",
      onClick: () => select(item),
      onPointerdown: (event: PointerEvent) => {
        event.preventDefault();
      },
    });
  };

  return {
    open,
    items,
    highlightedIndex,
    activeItem,
    inputRef,
    listRef,
    getInputProps,
    getListProps,
    getOptionProps,
    select,
    insert,
    clear,
  };
}
