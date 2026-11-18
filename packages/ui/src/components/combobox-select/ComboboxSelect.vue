<script setup lang="ts">
import { Check, ChevronDown, LoaderCircle, Plus, X } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import { useMobileViewport } from "../../lib/use-mobile-viewport";
import ComboboxSelectList from "./ComboboxSelectList.vue";
import { roomBelowIsShort } from "./combobox-select.list-side";
import {
  isOptionGroup,
  normalizeOption,
  optionKey,
  type OptionRecord,
} from "./combobox-select.options";
import type {
  ComboboxSelectMessages,
  ComboboxSelectOption,
  ComboboxSelectProps,
  ComboboxSelectValue,
} from "./combobox-select.types";

defineOptions({ name: "RaftComboboxSelect", inheritAttrs: false });

const props = withDefaults(defineProps<ComboboxSelectProps>(), {
  open: undefined,
  multiple: false,
  defaultValue: undefined,
  labelField: "label",
  valueField: "value",
  disabledField: "disabled",
  filterable: true,
  remote: false,
  loading: false,
  create: false,
  creatable: false,
  clearable: false,
  showArrow: true,
  clearFilterAfterSelect: true,
  size: "md",
  placeholder: "Select an option",
  emptyContent: "No options found",
  loadingContent: "Loading…",
  listMaxHeight: "16rem",
  autoHighlight: true,
  defaultOpen: false,
  defaultInputValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: ComboboxSelectValue | ComboboxSelectValue[] | null];
  "update:open": [open: boolean];
  "update:inputValue": [value: string];
  "value-change": [value: ComboboxSelectValue | ComboboxSelectValue[] | null];
  search: [query: string];
  clear: [];
}>();

const attrs = useAttrs();
const root = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const listId = useId();
const phone = useMobileViewport();
const fieldBox = ref({ left: 0, top: 0, bottom: 0, width: 0 });
const available = ref({ width: 0, height: 0, top: 0 });

function measureField() {
  const element = root.value;
  if (!element) return;
  const rect = element.getBoundingClientRect();
  fieldBox.value = { left: rect.left, top: rect.top, bottom: rect.bottom, width: rect.width };
  const visual = element.ownerDocument.defaultView?.visualViewport;
  available.value = {
    width: visual?.width ?? element.ownerDocument.defaultView?.innerWidth ?? 0,
    height: visual?.height ?? element.ownerDocument.defaultView?.innerHeight ?? 0,
    top: visual?.offsetTop ?? 0,
  };
}

/**
 * On a phone the list always opens below the field, between the field and the
 * visual viewport's bottom edge: when fewer than three rows fit there, the
 * field moves to the top of what is visible instead of the list flipping.
 */
function keepRoomBelow() {
  const element = root.value;
  if (!element) return;
  const view = element.ownerDocument.defaultView;
  if (!view) return;
  const visual = view?.visualViewport;
  const viewport = visual
    ? { top: visual.offsetTop, height: visual.height }
    : { top: 0, height: view.innerHeight };
  if (roomBelowIsShort(element.getBoundingClientRect(), viewport)) {
    if (!element.style.scrollMarginTop) element.style.scrollMarginTop = "2.5rem";
    element.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" });
  }
}

function onViewportChange() {
  measureField();
  keepRoomBelow();
}

const positionerStyle = computed(() => {
  const box = fieldBox.value;
  const view = available.value;
  const gap = 4;
  const below = Math.max(0, view.top + view.height - box.bottom - gap);
  const above = Math.max(0, box.top - view.top - gap);
  // On a phone the list never flips: keepRoomBelow moves the field instead.
  const flip = !phone.value && below < 240 && above > below;
  return {
    position: "fixed" as const,
    left: `${box.left}px`,
    top: flip ? `${box.top - gap}px` : `${box.bottom + gap}px`,
    width: `${box.width}px`,
    transform: flip ? "translateY(-100%)" : undefined,
    "--anchor-width": `${box.width}px`,
    "--available-width": `${view.width}px`,
    "--available-height": `${Math.max(0, flip ? above : below)}px`,
  };
});

let detachViewport: (() => void) | undefined;

function observeViewport(active: boolean) {
  detachViewport?.();
  detachViewport = undefined;
  if (!active) return;
  const view = root.value?.ownerDocument.defaultView;
  if (!view) return;
  let frame = 0;
  const onChange = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(onViewportChange);
  };
  view.addEventListener("scroll", onChange, true);
  view.addEventListener("resize", onChange);
  view.visualViewport?.addEventListener("resize", onChange);
  view.visualViewport?.addEventListener("scroll", onChange);
  detachViewport = () => {
    cancelAnimationFrame(frame);
    view.removeEventListener("scroll", onChange, true);
    view.removeEventListener("resize", onChange);
    view.visualViewport?.removeEventListener("resize", onChange);
    view.visualViewport?.removeEventListener("scroll", onChange);
  };
}
const looseValue = ref<ComboboxSelectValue | ComboboxSelectValue[] | null>(
  props.defaultValue ?? (props.multiple ? [] : null),
);
const looseQuery = ref(String(props.defaultInputValue ?? ""));
const looseOpen = ref(Boolean(props.defaultOpen));
const activeIndex = ref(-1);
const createdOptions = ref<ComboboxSelectOption[]>([]);

const messages = computed<ComboboxSelectMessages>(() => ({
  clear: "Clear selection",
  toggle: "Toggle options",
  selected: "Selected options",
  chipDescription: "Press Backspace or Delete to remove",
  inputDescription: "From the start of the input, press Left Arrow to focus selected options",
  remove: (label: string) => `Remove ${label}`,
  ...props.messages,
}));
const selectedValue = computed(() =>
  props.modelValue !== undefined ? props.modelValue : looseValue.value,
);
const selectedValues = computed<ComboboxSelectValue[]>(() => {
  const value = selectedValue.value;
  if (value == null) return [];
  return Array.isArray(value) ? value : [value as ComboboxSelectValue];
});
const query = computed(() =>
  props.inputValue !== undefined ? props.inputValue : looseQuery.value,
);
const open = computed(() => (props.open !== undefined ? props.open : looseOpen.value));
const ariaLabel = computed(() => props["aria-label"]);
const ariaLabelledby = computed(() => props["aria-labelledby"]);
const ariaDescribedby = computed(() => props["aria-describedby"]);
const ariaInvalid = computed(() => props["aria-invalid"]);

const normalised = computed(() => {
  const groups: { key: string; label?: unknown; items: OptionRecord<ComboboxSelectOption>[] }[] =
    [];
  for (const [index, option] of props.options.entries()) {
    if (isOptionGroup(option)) {
      groups.push({
        key: `group:${optionKey(option.key)}`,
        label: option.label,
        items: option.children.map((item) =>
          normalizeOption(item, props.labelField, props.valueField, props.disabledField),
        ),
      });
    } else {
      groups.push({
        key: `option:${index}`,
        items: [normalizeOption(option, props.labelField, props.valueField, props.disabledField)],
      });
    }
  }
  const records = new Map(
    groups.flatMap((group) => group.items.map((record) => [record.value, record] as const)),
  );
  const created = createdOptions.value
    .map((option) =>
      normalizeOption(option, props.labelField, props.valueField, props.disabledField),
    )
    .filter((record) => !records.has(record.value));
  if (created.length) groups.push({ key: "created", items: created });
  created.forEach((record) => {
    records.set(record.value, record);
  });
  return { groups, records };
});

const selected = computed<OptionRecord<ComboboxSelectOption>[]>(() =>
  selectedValues.value.map((value) => {
    const record = normalised.value.records.get(value);
    if (record) return record;
    const fallback = props.fallbackOption?.(value);
    return fallback
      ? normalizeOption(fallback, props.labelField, props.valueField, props.disabledField)
      : { value, label: String(value), disabled: false };
  }),
);

const search = computed(() => query.value.trim());
const canCreate = computed(
  () =>
    (props.create || props.creatable) &&
    props.filterable &&
    !props.loading &&
    search.value !== "" &&
    ![...normalised.value.records.values(), ...selected.value].some(
      (record) => record.label.trim().toLocaleLowerCase() === search.value.toLocaleLowerCase(),
    ),
);

const filteredGroups = computed(() => {
  const groups = normalised.value.groups.map((group) => ({
    ...group,
    items: group.items.filter((record) => {
      if (props.remote || !props.filterable) return true;
      if (props.filter === false) return true;
      if (typeof props.filter === "function") {
        return props.filter(search.value, record.option as ComboboxSelectOption);
      }
      return record.label.toLocaleLowerCase().includes(search.value.toLocaleLowerCase());
    }),
  }));
  if (canCreate.value) {
    groups.push({
      key: "create",
      items: [
        { value: search.value, label: search.value, disabled: false, createQuery: search.value },
      ],
    });
  }
  return groups.filter((group) => group.items.length > 0);
});

const flatOptions = computed(() => filteredGroups.value.flatMap((group) => group.items));
const indexedGroups = computed(() => {
  let index = 0;
  return filteredGroups.value.map((group) => ({
    ...group,
    items: group.items.map((record) => ({ record, index: index++ })),
  }));
});
const selectedSet = computed(() => new Set(selectedValues.value.map((value) => optionKey(value))));
const tagLimit = computed(() =>
  props.maxTagCount === undefined
    ? Number.POSITIVE_INFINITY
    : Math.max(0, Math.floor(props.maxTagCount)),
);
const listHeight = computed(() =>
  typeof props.listMaxHeight === "number" ? `${props.listMaxHeight}px` : props.listMaxHeight,
);
const css = computed(() =>
  cn("r-combobox-select", `r-combobox-select--${props.size}`, props.className),
);

function setValue(next: ComboboxSelectValue | ComboboxSelectValue[] | null) {
  if (props.modelValue === undefined) looseValue.value = next;
  emit("update:modelValue", next);
  emit("value-change", next);
}

function setOpen(next: boolean) {
  if (props.open === undefined) looseOpen.value = next;
  emit("update:open", next);
  if (next) {
    activeIndex.value = props.autoHighlight ? firstEnabledIndex() : -1;
  } else {
    // Removing the list hands focus back to the input. Opening there would
    // bounce Escape (and a pick) straight back open.
    suppressFocusOpenUntil = Date.now() + 120;
  }
}

let suppressFocusOpenUntil = 0;

function openOnFocus() {
  if (Date.now() < suppressFocusOpenUntil) return;
  setOpen(true);
}

function setQuery(next: string, openList = true) {
  if (props.inputValue === undefined) looseQuery.value = next;
  emit("update:inputValue", next);
  emit("search", next);
  props.onSearch?.(next);
  if (openList && !open.value) setOpen(true);
  activeIndex.value = props.autoHighlight ? firstEnabledIndex() : -1;
}

function firstEnabledIndex() {
  return flatOptions.value.findIndex((option) => !option.disabled);
}

function choose(record: OptionRecord<ComboboxSelectOption>) {
  if (record.disabled) return;
  let resolved = record;
  if (record.createQuery !== undefined) {
    const created = props.onCreate
      ? props.onCreate(record.label)
      : (Object.fromEntries([
          [props.labelField, record.label],
          [props.valueField, record.label],
        ]) as unknown as ComboboxSelectOption);
    if (!created) return;
    resolved = normalizeOption(created, props.labelField, props.valueField, props.disabledField);
    if (resolved.disabled) return;
    createdOptions.value = [...createdOptions.value, created];
  }
  if (props.multiple) {
    const key = optionKey(resolved.value);
    const next = selectedSet.value.has(key)
      ? selectedValues.value.filter((value) => optionKey(value) !== key)
      : [...selectedValues.value, resolved.value];
    setValue(next);
  } else {
    setValue(resolved.value);
    setOpen(false);
  }
  if (props.clearFilterAfterSelect) setQuery("", false);
}

function removeValue(value: ComboboxSelectValue) {
  setValue(selectedValues.value.filter((item) => item !== value));
}

function clear() {
  setValue(props.multiple ? [] : null);
  setQuery("");
  props.onClear?.();
  emit("clear");
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!open.value) setOpen(true);
    const count = flatOptions.value.length;
    if (!count) return;
    let next = activeIndex.value;
    const direction = event.key === "ArrowDown" ? 1 : -1;
    for (let step = 0; step < count; step += 1) {
      next = (next + direction + count) % count;
      if (!flatOptions.value[next]?.disabled) break;
    }
    activeIndex.value = next;
  } else if (event.key === "Enter" && open.value && flatOptions.value[activeIndex.value]) {
    event.preventDefault();
    choose(flatOptions.value[activeIndex.value]!);
  } else if (event.key === "Escape") {
    event.preventDefault();
    setOpen(false);
  } else if (event.key === "Backspace" && !query.value && selected.value.length && props.multiple) {
    removeValue(selected.value[selected.value.length - 1]!.value);
  }
}

function onPointerDown(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) setOpen(false);
}

watch(filteredGroups, () => {
  if (activeIndex.value >= flatOptions.value.length) activeIndex.value = firstEnabledIndex();
});

watch([activeIndex, open], async ([index, isOpen]) => {
  if (!isOpen || index < 0) return;
  await nextTick();
  const list = document.getElementById(listId);
  const option = document.getElementById(`${listId}-${index}`);
  if (!list || !option) return;
  const listRect = list.getBoundingClientRect();
  const optionRect = option.getBoundingClientRect();
  if (optionRect.top < listRect.top) list.scrollTop -= listRect.top - optionRect.top;
  else if (optionRect.bottom > listRect.bottom)
    list.scrollTop += optionRect.bottom - listRect.bottom;
});

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      void nextTick(() => {
        measureField();
        keepRoomBelow();
        observeViewport(true);
        input.value?.focus();
      });
      return;
    }
    observeViewport(false);
  },
  { immediate: true },
);

onMounted(() => document.addEventListener("pointerdown", onPointerDown));
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  observeViewport(false);
});
</script>

<template>
  <div
    ref="root"
    v-bind="{ ...attrs, class: undefined }"
    :class="css"
    :style="{ '--combobox-select-list-max-height': listHeight }"
  >
    <div
      data-slot="combobox-select"
      :class="cn('r-combobox-select__control', phone && 'r-combobox-select__control--phone')"
      :data-status="status"
      :data-invalid="ariaInvalid ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      @click="!disabled && setOpen(!open)"
    >
      <div v-if="multiple" class="r-combobox-select__chips">
        <span
          v-for="(record, index) in selected"
          :key="record.value"
          class="r-combobox-select__chip"
          :data-overflow="index >= tagLimit ? '' : undefined"
          :aria-label="record.label"
          :aria-description="messages.chipDescription"
        >
          <span class="r-combobox-select__text">
            <slot name="tag" :option="record.option" :record="record">
              <component
                v-if="record.option && (renderTag || renderLabel)"
                :is="() => (renderTag ?? renderLabel)!(record.option as ComboboxSelectOption)"
              />
              <template v-else>{{ record.label }}</template>
            </slot>
          </span>
          <button
            type="button"
            class="r-combobox-select__remove"
            :aria-label="messages.remove(record.label)"
            @click.stop="removeValue(record.value)"
          >
            <X aria-hidden="true" />
          </button>
        </span>
        <input
          :id="id"
          ref="input"
          data-slot="combobox-select-input"
          class="r-combobox-select__input"
          role="combobox"
          :name="name"
          :value="query"
          :placeholder="selected.length ? '' : placeholder"
          :disabled="disabled"
          :readonly="readonly || !filterable"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          :aria-invalid="ariaInvalid || status === 'error' ? true : undefined"
          aria-autocomplete="list"
          :aria-expanded="open"
          :aria-controls="listId"
          :aria-activedescendant="
            open && flatOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined
          "
          @input="setQuery(($event.target as HTMLInputElement).value)"
          @keydown="onKeydown"
          @focus="openOnFocus"
        />
      </div>
      <template v-else>
        <span class="r-combobox-select__text">
          <component
            v-if="selected[0]?.option && renderLabel"
            :is="() => renderLabel!(selected[0]!.option as ComboboxSelectOption)"
          />
          <template v-else>{{ selected[0]?.label ?? "" }}</template>
        </span>
        <input
          :id="id"
          ref="input"
          data-slot="combobox-select-input"
          class="r-combobox-select__input"
          role="combobox"
          :name="name"
          :value="query"
          :placeholder="selected[0] ? '' : placeholder"
          :disabled="disabled"
          :readonly="readonly || !filterable"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          :aria-invalid="ariaInvalid || status === 'error' ? true : undefined"
          aria-autocomplete="list"
          :aria-expanded="open"
          :aria-controls="listId"
          :aria-activedescendant="
            open && flatOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined
          "
          @input="setQuery(($event.target as HTMLInputElement).value)"
          @keydown="onKeydown"
          @focus="openOnFocus"
        />
      </template>
      <div class="r-combobox-select__actions">
        <button
          v-if="clearable && selected.length"
          type="button"
          class="r-combobox-select__action"
          :aria-label="messages.clear"
          @click.stop="clear"
        >
          <X aria-hidden="true" />
        </button>
        <LoaderCircle v-if="loading" class="r-combobox-select__spinner" aria-hidden="true" />
        <button
          v-if="showArrow"
          type="button"
          class="r-combobox-select__action"
          :aria-label="messages.toggle"
          :aria-expanded="open"
          @click.stop="setOpen(!open)"
        >
          <ChevronDown aria-hidden="true" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="open"
        data-raft-ui-overlay=""
        class="r-combobox-select__positioner"
        :style="positionerStyle"
      >
        <div
          data-slot="combobox-select-popup"
          class="r-combobox-select__popup"
          :data-size="size"
          :data-phone="phone ? '' : undefined"
        >
          <div class="r-combobox-select__list-frame">
            <ComboboxSelectList
              :id="listId"
              :list-id="listId"
              class="r-combobox-select__list"
              :aria-busy="loading || undefined"
              :aria-label="ariaLabel"
              :aria-multiselectable="multiple || undefined"
            >
              <div v-if="loading" class="r-combobox-select__message">
                <slot name="loading">{{ loadingContent }}</slot>
              </div>
              <div v-else-if="!flatOptions.length" class="r-combobox-select__message">
                <slot name="empty">{{ emptyContent }}</slot>
              </div>
              <template v-else>
                <template v-for="group in indexedGroups" :key="group.key">
                  <div v-if="group.label" class="r-combobox-select__group-label">
                    <component :is="() => group.label" />
                  </div>
                  <div
                    v-for="{ record, index: optionIndex } in group.items"
                    :id="`${listId}-${optionIndex}`"
                    :key="`${group.key}-${record.value}`"
                    class="r-combobox-select__option"
                    role="option"
                    :data-highlighted="optionIndex === activeIndex ? '' : undefined"
                    :data-selected="selectedSet.has(optionKey(record.value)) ? '' : undefined"
                    :data-disabled="record.disabled ? '' : undefined"
                    :aria-selected="selectedSet.has(optionKey(record.value))"
                    :aria-disabled="record.disabled || undefined"
                    @pointermove="activeIndex = optionIndex"
                    @click="choose(record)"
                  >
                    <Plus v-if="record.createQuery !== undefined" aria-hidden="true" />
                    <span class="r-combobox-select__text">
                      <slot
                        name="option"
                        :option="record.option"
                        :record="record"
                        :selected="selectedSet.has(optionKey(record.value))"
                      >
                        <component
                          v-if="record.createQuery !== undefined"
                          :is="
                            () =>
                              (renderCreateLabel ?? ((value: string) => `Create “${value}”`))(
                                record.label,
                              )
                          "
                        />
                        <component
                          v-else-if="record.option && (renderOption || renderLabel)"
                          :is="
                            () =>
                              (renderOption ?? renderLabel)!(
                                record.option as ComboboxSelectOption,
                                { selected: selectedSet.has(optionKey(record.value)) },
                              )
                          "
                        />
                        <template v-else>{{ record.label }}</template>
                      </slot>
                    </span>
                    <span
                      v-if="
                        record.createQuery === undefined && selectedSet.has(optionKey(record.value))
                      "
                      class="r-combobox-select__indicator"
                    >
                      <Check aria-hidden="true" />
                    </span>
                  </div>
                </template>
              </template>
            </ComboboxSelectList>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
