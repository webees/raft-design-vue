<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch,
  type VNode,
} from "vue";
import { Search, X } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import Button from "../button/Button.vue";
import InputGroup from "../input-group/InputGroup.vue";
import InputGroupAddon from "../input-group/InputGroupAddon.vue";
import InputGroupInput from "../input-group/InputGroupInput.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { fitToolbar } from "./fit-toolbar.recipe";
import { BREAK, FIT_SEARCH_MAX_LEAST, fitPlaceholder } from "./fit-toolbar-measure";
import { useFitItem } from "./use-fit-item";

defineOptions({ name: "RaftFitToolbarSearch", inheritAttrs: false });

const COVERED = "data-fit-search-covered";

const props = withDefaults(
  defineProps<{
    /** Its accessible name ("Search tasks"): the field's and, once it is an icon, the button's, and the button's tooltip. */
    label: string;
    /** The text, when the page holds it. */
    modelValue?: string;
    /** The text it starts with, when the page doesn't hold it. */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /**
     * The least the empty field needs to show what it is for: its icon and
     * "Search…", the same at every width. Measured from a copy of the field
     * unless given.
     */
    minWidth?: number;
    /** When the field gives way to its icon (the `collapse` step). */
    collapseOrder?: number;
    /** Its icon: a magnifier by default. */
    icon?: VNode;
    /** The clear button's accessible name. */
    clearLabel?: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  { defaultValue: "" },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();
const styles = fitToolbar();
const item = useFitItem({ collapse: props.collapseOrder });

const own = ref(props.defaultValue);
const text = computed(() => props.modelValue ?? own.value);
const opened = ref(false);
const collapsed = computed(() => item.taken("collapse"));
const open = computed(() => collapsed.value && (opened.value || text.value !== ""));

const wrapper = ref<HTMLElement | null>(null);
const field = ref<HTMLElement | null>(null);
const spacer = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
const sizer = ref<HTMLElement | null>(null);
const sizerText = ref<HTMLElement | null>(null);
const probe = ref<HTMLElement | null>(null);
const measured = ref<number | null>(null);
const shownHint = ref<string | undefined>(undefined);

let focusOnOpen = false;
let focusButtonOnClose = false;
let resize: ResizeObserver | undefined;
let mutation: MutationObserver | undefined;
let frame = 0;
let uncover: (() => void) | null = null;

const placeholder = computed(() => props.placeholder ?? props.label);
const least = computed(() => props.minWidth ?? measured.value);

const wrapperClass = computed(() => cn(styles.search(), attrs.class as string | undefined));
const fieldClass = computed(() => styles.searchField());
const spacerClass = computed(() => styles.searchSpacer());

const el = toElement;

function change(next: string) {
  own.value = next;
  emit("update:modelValue", next);
  props.onValueChange?.(next);
}

// The toolbar holds a search: its scrolling group keeps its items' width
// beside it (`data-fit-search` on the root, which styles what is inside it).
function markRoot() {
  const root = wrapper.value?.closest<HTMLElement>("[data-slot=fit-toolbar]");
  if (!root) return;
  const count = Number(root.dataset.fitSearchCount ?? "0") + 1;
  root.dataset.fitSearchCount = String(count);
  root.setAttribute("data-fit-search", "");
}

function unmarkRoot() {
  const root = wrapper.value?.closest<HTMLElement>("[data-slot=fit-toolbar]");
  if (!root) return;
  const count = Math.max(0, Number(root.dataset.fitSearchCount ?? "1") - 1);
  if (count > 0) root.dataset.fitSearchCount = String(count);
  else {
    delete root.dataset.fitSearchCount;
    root.removeAttribute("data-fit-search");
  }
}

function readLeast() {
  const copy = el<HTMLElement>(sizer.value);
  const words = sizerText.value;
  const real = el<HTMLInputElement>(input.value);
  if (!copy || !words || !real) return;
  const style = getComputedStyle(real);
  words.style.font = style.font;
  words.style.letterSpacing = style.letterSpacing;
  words.style.paddingInlineEnd = style.paddingInlineEnd;
  const whole = Math.ceil(copy.getBoundingClientRect().width);
  if (whole <= 0) return;
  const width = Math.min(whole, FIT_SEARCH_MAX_LEAST);
  measured.value = width;
}

// The placeholder the field shows: the whole one when it fits, else cut
// after its last word that fits, with "…" right after it ("Search…").
function readHint() {
  const real = el<HTMLInputElement>(input.value);
  const ruler = probe.value;
  if (typeof props.placeholder !== "string" || !real || !ruler) {
    shownHint.value = undefined;
    return;
  }
  const widths = new Map<string, number>();
  const width = (text: string) => {
    const style = getComputedStyle(real);
    const key = `${style.font}\n${style.letterSpacing}\n${text}`;
    const cached = widths.get(key);
    if (cached !== undefined) return cached;
    ruler.style.font = style.font;
    ruler.style.letterSpacing = style.letterSpacing;
    ruler.textContent = text;
    const w = ruler.getBoundingClientRect().width;
    widths.set(key, w);
    return w;
  };
  const style = getComputedStyle(real);
  const room =
    real.getBoundingClientRect().width -
    parseFloat(style.paddingInlineStart) -
    parseFloat(style.paddingInlineEnd);
  shownHint.value = fitPlaceholder(props.placeholder, room, width);
}

function later(fn: () => void) {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    fn();
  });
}

function openField() {
  focusOnOpen = true;
  opened.value = true;
}

function close() {
  opened.value = false;
  focusOnOpen = false;
}

function onFocusIn() {
  opened.value = true;
}

// Leaving the field closes it; one with text stays open all the same.
function onFocusOut(event: FocusEvent) {
  const to = event.relatedTarget;
  if (to instanceof Node && field.value?.contains(to)) return;
  close();
}

function onKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.key !== "Escape") return;
  // Esc while an input method composes (Chinese, Japanese) ends the
  // composition: it is the IME's, not the field's.
  if (event.isComposing) return;
  // Esc empties the field first, focus kept in it; a second Esc closes an
  // open field back to its button. A field that isn't collapsed lets the
  // second Esc go on to the page.
  if (text.value === "" && !collapsed.value) return;
  event.preventDefault();
  event.stopPropagation();
  if (text.value !== "") {
    change("");
    return;
  }
  focusButtonOnClose = true;
  close();
}

function clear() {
  change("");
  el<HTMLInputElement>(input.value)?.focus();
}

function placeOpen() {
  const box = el<HTMLElement>(field.value);
  const line = spacer.value;
  const root = wrapper.value?.closest<HTMLElement>("[data-slot=fit-toolbar]");
  if (!box || !line || !root || !open.value) return;
  const style = getComputedStyle(root);
  const edge = root.getBoundingClientRect();
  const slot = line.getBoundingClientRect();
  const borderLeft = parseFloat(style.borderLeftWidth) || 0;
  const borderRight = parseFloat(style.borderRightWidth) || 0;
  const end =
    style.direction === "rtl"
      ? slot.left - edge.left - borderLeft
      : edge.right - borderRight - slot.right;
  box.style.insetInlineStart = style.paddingInlineStart;
  box.style.insetInlineEnd = `${Math.max(0, end)}px`;
  box.style.top = `${line.offsetTop + (line.offsetHeight - box.offsetHeight) / 2}px`;
  box.style.setProperty("--fit-search-room", `${Math.max(0, slot.width)}px`);
}

function coverScope(root: HTMLElement, search: HTMLElement) {
  const covered: HTMLElement[] = [];
  for (const child of Array.from(root.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child === search || child.contains(search)) break;
    if (child.hasAttribute(BREAK)) continue;
    if ((Number(getComputedStyle(child).order) || 0) > 0) continue;
    if (child.hasAttribute("inert")) continue;
    child.setAttribute(COVERED, "");
    child.setAttribute("inert", "");
    child.style.visibility = "hidden";
    covered.push(child);
  }
  return () => {
    for (const child of covered) {
      if (!child.hasAttribute(COVERED)) continue;
      child.removeAttribute(COVERED);
      child.removeAttribute("inert");
      child.style.removeProperty("visibility");
    }
  };
}

onMounted(() => {
  markRoot();
  nextTick(() => {
    readLeast();
    readHint();
  });
  if (typeof ResizeObserver !== "undefined") {
    resize = new ResizeObserver(() => {
      readLeast();
      later(readHint);
      placeOpen();
    });
    const sizerElement = el<HTMLElement>(sizer.value);
    if (sizerElement) resize.observe(sizerElement);
    if (field.value) resize.observe(field.value);
  }
  if (typeof MutationObserver !== "undefined" && probe.value) {
    mutation = new MutationObserver(() => later(readHint));
    mutation.observe(probe.value, { childList: true, characterData: true, subtree: true });
  }
  document.fonts?.addEventListener?.("loadingdone", readLeast);
  document.fonts?.addEventListener?.("loadingdone", readHint);
});

onBeforeUnmount(() => {
  uncover?.();
  uncover = null;
  unmarkRoot();
  resize?.disconnect();
  mutation?.disconnect();
  if (frame) cancelAnimationFrame(frame);
  document.fonts?.removeEventListener?.("loadingdone", readLeast);
  document.fonts?.removeEventListener?.("loadingdone", readHint);
});

watch(
  () => [props.placeholder, props.minWidth, open.value, text.value],
  () => {
    nextTick(() => {
      readLeast();
      later(readHint);
      placeOpen();
    });
  },
);

// Focus in the field once it opens, and back on the button once it closes
// only after the field has gone.
watch(
  open,
  async (isOpen) => {
    uncover?.();
    uncover = null;
    if (isOpen && focusOnOpen) {
      focusOnOpen = false;
      await nextTick();
      el<HTMLInputElement>(input.value)?.focus();
    } else if (!isOpen && focusButtonOnClose) {
      focusButtonOnClose = false;
      await nextTick();
      if (collapsed.value) el<HTMLButtonElement>(button.value)?.focus();
    }
    const root = wrapper.value?.closest<HTMLElement>("[data-slot=fit-toolbar]");
    const box = el<HTMLElement>(field.value);
    if (!root || !box) return;
    if (isOpen) {
      uncover = coverScope(root, wrapper.value!);
      await nextTick();
      placeOpen();
    } else {
      for (const side of ["inset-inline-start", "inset-inline-end", "top"]) {
        box.style.removeProperty(side);
      }
    }
  },
  { flush: "post" },
);
</script>

<template>
  <div
    ref="wrapper"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="fit-toolbar-search"
    :data-fit-id="item.props.value['data-fit-id']"
    :data-fit-steps="item.props.value['data-fit-steps']"
    :data-fit-collapse="collapsed ? '' : undefined"
    :style="least === null ? undefined : { '--fit-search-min': `${least}px` }"
    :class="wrapperClass"
  >
    <div aria-hidden inert data-slot="fit-toolbar-search-sizer" :class="styles.searchSizer()">
      <InputGroup ref="sizer" size="md" class="w-max">
        <InputGroupAddon
          ><slot name="icon"><Search /></slot
        ></InputGroupAddon>
        <span ref="sizerText" class="whitespace-pre">{{ placeholder }}</span>
      </InputGroup>
      <span ref="probe" class="absolute whitespace-pre" />
    </div>
    <Tooltip :disabled="!collapsed || open">
      <TooltipTrigger as-child>
        <Button
          ref="button"
          variant="ghost"
          size="icon-md"
          :aria-label="props.label"
          :tabindex="collapsed && !open ? undefined : -1"
          :inert="collapsed && !open ? undefined : true"
          data-slot="fit-toolbar-search-button"
          data-fit-search-button=""
          :class="styles.searchButton()"
          @click="openField"
        >
          <slot name="icon"><Search /></slot>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{{ props.label }}</TooltipContent>
    </Tooltip>
    <span ref="spacer" aria-hidden data-slot="fit-toolbar-search-spacer" :class="spacerClass" />
    <div
      ref="field"
      data-fit-search-field=""
      :data-open="open ? '' : undefined"
      :class="fieldClass"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @keydown="onKeyDown"
    >
      <InputGroup size="md" class="w-full">
        <InputGroupAddon>
          <slot name="icon"><Search /></slot>
        </InputGroupAddon>
        <InputGroupInput
          ref="input"
          type="search"
          :value="text"
          :aria-label="props.label"
          :placeholder="shownHint ?? placeholder"
          :disabled="disabled"
          :class="styles.searchInput()"
          @input="change(($event.target as HTMLInputElement).value)"
        />
        <InputGroupAddon v-if="props.clearLabel !== undefined && text !== ''" align="inline-end">
          <Button variant="ghost" size="icon-md" :aria-label="props.clearLabel" @click="clear">
            <X />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>
