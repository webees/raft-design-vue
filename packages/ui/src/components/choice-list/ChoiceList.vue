<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  ref,
  useAttrs,
  useId,
  watch,
  type VNodeChild,
} from "vue";
import { Search, X } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { isTextEntry } from "../../lib/tap-activation";
import { useOverflowTitle } from "../../lib/use-overflow-title";
import Button from "../button/Button.vue";
import Checkbox from "../checkbox/Checkbox.vue";
import InputGroup from "../input-group/InputGroup.vue";
import InputGroupAddon from "../input-group/InputGroupAddon.vue";
import InputGroupInput from "../input-group/InputGroupInput.vue";
import RadioGroup from "../radio-group/RadioGroup.vue";
import RadioGroupItem from "../radio-group/RadioGroupItem.vue";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { choiceList } from "./choice-list.recipe";
import type { ChoiceListGroup, ChoiceListItem, ChoiceListProps } from "./choice-list.types";

defineOptions({ name: "RaftChoiceList", inheritAttrs: false });

const props = withDefaults(defineProps<ChoiceListProps>(), {
  items: () => [],
  groups: () => [],
  multiple: false,
  value: undefined,
  defaultValue: undefined,
  onValueChange: undefined,
  search: "auto",
  searchLabel: "Search",
  searchPlaceholder: "Search",
  searchValue: undefined,
  defaultSearchValue: "",
  onSearchValueChange: undefined,
  matchedValues: undefined,
  clearSearchLabel: "Clear search",
  noMatchLabel: "No matches",
  empty: undefined,
  footer: undefined,
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  disabled: false,
  scroll: false,
  fill: false,
  className: undefined,
});

const emit = defineEmits<{
  "update:value": [value: string | string[] | null];
  "value-change": [value: string | string[] | null];
  "update:search-value": [value: string];
  "search-value-change": [value: string];
}>();

const SEARCH_ABOVE = 5;
const MAX_DESCRIPTION_LINES = 2;

/** Renders a VNodeChild (text, node or array of nodes). */
const RenderedNode = defineComponent({
  name: "RaftChoiceListNode",
  props: { node: { type: null, default: undefined } },
  setup: (nodeProps) => () => nodeProps.node as VNodeChild,
});

/** A single line that gains a `title` only while it is actually cut off. */
const CutLine = defineComponent({
  name: "RaftChoiceListCutLine",
  props: {
    slotName: { type: String, required: true },
    lineClass: { type: [String, Array, Object], default: undefined },
    lineId: { type: String, default: undefined },
  },
  setup(lineProps, { slots }) {
    const element = ref<HTMLElement | null>(null);
    useOverflowTitle(element);
    return () =>
      h(
        "span",
        {
          ref: element,
          id: lineProps.lineId,
          "data-slot": lineProps.slotName,
          class: lineProps.lineClass,
        },
        slots.default?.(),
      );
  },
});

const attrs = useAttrs();
const baseId = useId();
const inputRef = ref<unknown>(null);
const focusSearch = () => toElement(inputRef.value)?.focus({ preventScroll: true });

const uncontrolledValue = ref<string | readonly string[] | null>(
  props.defaultValue ?? (props.multiple ? [] : null),
);
const uncontrolledSearch = ref(props.defaultSearchValue ?? "");

const currentValue = computed(() =>
  props.value !== undefined ? props.value : uncontrolledValue.value,
);
const selected = computed<readonly string[]>(() => {
  const value = currentValue.value;
  if (value == null) return [];
  return typeof value === "string" ? [value] : value;
});
const query = computed(() => props.searchValue ?? uncontrolledSearch.value);
const singleValue = computed(() => (selected.value[0] as string | undefined) ?? "");
const searchable = computed(
  () =>
    props.items.length > 0 &&
    (props.search === "always" || (props.search === "auto" && props.items.length > SEARCH_ABOVE)),
);
const needle = computed(() => (searchable.value ? query.value.trim().toLowerCase() : ""));
watch(searchable, (now, before) => {
  if (before && !now && query.value) setSearch("");
});

const slots = computed(() =>
  choiceList({
    scroll: props.scroll || searchable.value,
    fill: props.fill,
    hasAction: props.items.some((item) => item.action !== undefined && item.action !== null),
  }),
);

const rootClass = computed(() =>
  slots.value.root({ className: cn(props.className, attrs.class as string) }),
);
const frameClass = computed(() => slots.value.frame());
const scrollerClass = computed(() => slots.value.scroller());
const rowsClass = computed(() => slots.value.rows());
const groupClass = computed(() => slots.value.group());
const sectionClass = computed(() => slots.value.section());
const headingClass = computed(() => slots.value.heading());
const noteClass = computed(() => slots.value.note());
const footerClass = computed(() => slots.value.footer());
const searchInputClass = computed(() => slots.value.searchInput());
const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

function commit(next: string | readonly string[] | null) {
  if (props.value === undefined) uncontrolledValue.value = next;
  emit("update:value", next as string | string[] | null);
  emit("value-change", next as string | string[] | null);
  (props.onValueChange as ((value: string | string[] | null) => void) | undefined)?.(
    next as string | string[] | null,
  );
}

function toggle(item: ChoiceListItem, checked: boolean) {
  if (props.disabled || item.disabled) return;
  if (props.multiple) {
    const prior = new Set(selected.value);
    if (checked) prior.add(item.value);
    else prior.delete(item.value);
    commit([...prior]);
  } else {
    commit(item.value);
  }
}

function setSearch(value: string) {
  if (props.searchValue === undefined) uncontrolledSearch.value = value;
  emit("update:search-value", value);
  emit("search-value-change", value);
  props.onSearchValueChange?.(value);
}

function clearSearch() {
  setSearch("");
  nextTick(focusSearch);
}

const isDrawn = (line: unknown) =>
  line !== null && line !== undefined && line !== false && line !== "";
const asLines = (value: unknown) => (Array.isArray(value) ? value : [value]);
const labelText = (label: unknown) =>
  typeof label === "string" || typeof label === "number" ? String(label) : "";

const descriptionLines = (item: ChoiceListItem) =>
  asLines(item.description).filter(isDrawn).slice(0, MAX_DESCRIPTION_LINES);
const metaLines = (item: ChoiceListItem) =>
  asLines(item.meta)
    .filter(isDrawn)
    .slice(0, MAX_DESCRIPTION_LINES - descriptionLines(item).length);

const pinned = ref<readonly string[]>([...selected.value]);
watch(query, () => {
  pinned.value = [...selected.value];
});
watch(
  () => selected.value,
  (next) => {
    if (!needle.value) pinned.value = [...next];
  },
);

const visibleItems = computed(() => {
  if (!needle.value) return props.items;
  const byValue = new Map(props.items.map((item) => [item.value, item]));
  const matched = props.matchedValues ? new Set(props.matchedValues) : undefined;
  const matches = (item: ChoiceListItem) => {
    if (matched) return matched.has(item.value);
    return (item.searchText ?? labelText(item.label)).toLowerCase().includes(needle.value);
  };
  const pinnedSet = new Set(pinned.value);
  const top = props.items.filter(
    (item) => pinnedSet.has(item.value) || (selected.value.includes(item.value) && !matches(item)),
  );
  const ordered = props.matchedValues
    ? props.matchedValues.flatMap((value) => byValue.get(value) ?? [])
    : props.items;
  return [...top, ...ordered.filter((item) => !top.includes(item) && matches(item))];
});

const layout = computed(() => {
  const known = new Map((props.groups ?? []).map((group, index) => [group.value, index]));
  const sections: { key: string; group?: ChoiceListGroup; rows: ChoiceListItem[] }[] = (
    props.groups ?? []
  ).map((group) => ({ key: group.value, group, rows: [] }));
  const unknown = new Map<string, ChoiceListItem[]>();
  for (const item of visibleItems.value) {
    const index = item.group !== undefined ? known.get(item.group) : undefined;
    if (index !== undefined) sections[index]!.rows.push(item);
    else {
      const key = item.group ?? "";
      if (!unknown.has(key)) unknown.set(key, []);
      unknown.get(key)!.push(item);
    }
  }
  for (const [key, rows] of unknown) sections.push({ key: `unknown-${key}`, rows });

  const drawn = sections.filter((section) => section.rows.length > 0);
  const gridRowOf = new Map<string, number>();
  let gridRows = 0;
  for (const section of drawn) {
    if (section.group) gridRows += 1;
    for (const item of section.rows) {
      gridRows += 1;
      gridRowOf.set(item.value, gridRows);
    }
  }
  return { sections: drawn, gridRowOf, gridRows };
});

const hasAction = computed(() =>
  visibleItems.value.some((item) => item.action !== undefined && item.action !== null),
);
const empty = computed(() => props.items.length === 0);
const noMatch = computed(() => {
  if (!needle.value || empty.value) return false;
  const matched = props.matchedValues ? new Set(props.matchedValues) : undefined;
  return !props.items.some((item) =>
    matched
      ? matched.has(item.value)
      : (item.searchText ?? labelText(item.label)).toLowerCase().includes(needle.value),
  );
});

const describedBy = (item: ChoiceListItem) => {
  const ids: string[] = [];
  if (descriptionLines(item).length) ids.push(`${baseId}-desc-${item.value}`);
  if (metaLines(item).length) ids.push(`${baseId}-meta-${item.value}`);
  return ids.length ? ids.join(" ") : undefined;
};

watch(
  () => props.search === "always" && searchable.value,
  async (shouldFocus) => {
    if (!shouldFocus) return;
    await nextTick();
    if (typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (isTextEntry(document.activeElement)) return;
    focusSearch();
  },
  { immediate: true },
);
</script>

<template>
  <div data-slot="choice-list" v-bind="restAttrs" :class="rootClass">
    <InputGroup v-if="searchable" data-slot="choice-list-search">
      <InputGroupAddon>
        <Search aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        ref="inputRef"
        type="search"
        :class="searchInputClass"
        :value="query"
        :aria-label="searchLabel"
        :placeholder="searchPlaceholder"
        @input="setSearch(($event.target as HTMLInputElement).value)"
      />
      <InputGroupAddon v-if="query" align="inline-end">
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          :aria-label="clearSearchLabel"
          @click="clearSearch"
        >
          <X aria-hidden />
        </Button>
      </InputGroupAddon>
    </InputGroup>

    <div data-slot="choice-list-frame" :class="frameClass">
      <ScrollArea
        data-slot="choice-list-scroller"
        overscroll="contain"
        :tab-index="-1"
        :class="scrollerClass"
      >
        <p v-if="empty" data-slot="choice-list-note" :class="noteClass">
          <RenderedNode :node="props.empty" />
        </p>
        <div v-else data-slot="choice-list-rows" :class="rowsClass">
          <component
            :is="multiple ? 'div' : RadioGroup"
            :model-value="multiple ? undefined : singleValue"
            :disabled="disabled"
            data-slot="choice-list-group"
            :class="groupClass"
            :aria-label="ariaLabel"
            :aria-labelledby="ariaLabelledBy"
            :style="{ gridRow: `1 / span ${Math.max(layout.gridRows, 1)}` }"
            @update:model-value="multiple ? undefined : commit($event as string)"
          >
            <div
              v-for="section in layout.sections"
              :key="section.key"
              role="group"
              :aria-labelledby="section.group ? `${baseId}-group-${section.key}` : undefined"
              data-slot="choice-list-section"
              :class="sectionClass"
              :style="{
                gridRow: `${(layout.gridRowOf.get(section.rows[0]!.value) ?? 1) - 1} / span ${section.rows.length + 1}`,
              }"
            >
              <div
                v-if="section.group"
                :id="`${baseId}-group-${section.key}`"
                data-slot="choice-list-heading"
                :class="headingClass"
              >
                <RenderedNode :node="section.group.label" />
              </div>
              <label
                v-for="item in section.rows"
                :key="item.value"
                data-slot="choice-list-item"
                :data-disabled="disabled || item.disabled ? '' : undefined"
                :class="slots.item({ hasAction })"
              >
                <Checkbox
                  v-if="multiple"
                  :model-value="selected.includes(item.value)"
                  :disabled="disabled || item.disabled"
                  :aria-labelledby="`${baseId}-label-${item.value}`"
                  :aria-describedby="describedBy(item)"
                  @update:model-value="toggle(item, $event === true)"
                />
                <RadioGroupItem
                  v-else
                  :value="item.value"
                  :disabled="disabled || item.disabled"
                  :aria-labelledby="`${baseId}-label-${item.value}`"
                  :aria-describedby="describedBy(item)"
                />
                <span
                  v-if="item.media !== undefined"
                  data-slot="choice-list-media"
                  :class="slots.media()"
                >
                  <RenderedNode :node="item.media" />
                </span>
                <span data-slot="choice-list-body" :class="slots.body()">
                  <CutLine
                    :line-id="`${baseId}-label-${item.value}`"
                    slot-name="choice-list-label"
                    :line-class="slots.label()"
                  >
                    <RenderedNode :node="item.label" />
                  </CutLine>
                  <span
                    v-if="descriptionLines(item).length"
                    :id="`${baseId}-desc-${item.value}`"
                    class="contents"
                  >
                    <CutLine
                      v-for="(line, index) in descriptionLines(item)"
                      :key="index"
                      slot-name="choice-list-description"
                      :line-class="slots.description()"
                    >
                      <RenderedNode :node="line" />
                    </CutLine>
                  </span>
                  <span
                    v-if="metaLines(item).length"
                    :id="`${baseId}-meta-${item.value}`"
                    class="contents"
                  >
                    <CutLine
                      v-for="(line, index) in metaLines(item)"
                      :key="index"
                      slot-name="choice-list-meta"
                      :line-class="slots.meta()"
                    >
                      <RenderedNode :node="line" />
                    </CutLine>
                  </span>
                </span>
              </label>
            </div>
            <div v-if="hasAction" class="contents">
              <div
                v-for="section in layout.sections"
                :key="`action-${section.key}`"
                class="contents"
              >
                <div
                  v-for="item in section.rows"
                  :key="item.value"
                  :style="{ gridRow: layout.gridRowOf.get(item.value) }"
                  class="contents"
                >
                  <div
                    v-if="item.action !== undefined && item.action !== null"
                    data-slot="choice-list-action"
                  >
                    <RenderedNode :node="item.action" />
                  </div>
                </div>
              </div>
            </div>
          </component>
          <p role="status" data-slot="choice-list-status" :class="noMatch ? noteClass : 'sr-only'">
            {{ noMatch ? noMatchLabel : null }}
          </p>
        </div>
      </ScrollArea>
    </div>
    <div
      v-if="(footer !== undefined && footer !== null) || $slots.footer"
      data-slot="choice-list-footer"
      :class="footerClass"
    >
      <slot name="footer"><RenderedNode :node="footer" /></slot>
    </div>
  </div>
</template>
