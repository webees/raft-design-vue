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

import { cn } from "../../lib/cn";
import { provideFitToolbar, type FitItemRegistration } from "./fit-toolbar-context";
import {
  BREAK,
  keyOf,
  keepsArrow,
  measure,
  NONE,
  readingOrder,
  type Applied,
} from "./fit-toolbar-measure";
import { fitToolbar } from "./fit-toolbar.recipe";

defineOptions({ name: "RaftFitToolbar", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Also put groups on a second line (`wrap` step), when out of room. Off for a toolbar that floats over content. */
    wrap?: boolean;
    /** `vertical` keeps Up and Down inside, as a toolbar of rows. */
    orientation?: "horizontal" | "vertical";
    /** Wrap arrow-key movement at the ends. */
    loopFocus?: boolean;
  }>(),
  { wrap: false, orientation: "horizontal", loopFocus: true },
);

const emit = defineEmits<{
  keydown: [event: KeyboardEvent];
  focus: [event: FocusEvent];
}>();

const attrs = useAttrs();
const styles = fitToolbar();
const root = ref<HTMLElement | null>(null);
const applied = ref<Applied>(NONE);
const items = new Map<string, FitItemRegistration>();
const moreItems = ref<VNode[]>([]);

let frame = 0;
let observer: ResizeObserver | undefined;
let mutations: MutationObserver | undefined;
let measuredKey = "";

function requestMeasure() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    update();
  });
}

function update() {
  const element = root.value;
  if (!element) return;
  const next = measure(element, props.wrap);
  const key = keyOf(next);
  if (key === measuredKey && applied.value !== NONE) {
    return;
  }
  measuredKey = key;
  applied.value = next;
  refreshMore();
  void nextTick(() => syncTabStops(lastFocused));
}

function refreshMore() {
  moreItems.value = applied.value.more
    .map((id) => items.get(id)?.moreItem)
    .filter((node): node is VNode => node !== undefined);
}

function register(item: FitItemRegistration) {
  items.set(item.id, item);
  requestMeasure();
}

function unregister(id: string) {
  items.delete(id);
  refreshMore();
  requestMeasure();
}

function touch(id: string) {
  if (applied.value.more.includes(id)) refreshMore();
}

provideFitToolbar({
  register,
  unregister,
  touch,
  taken: (id, step) => applied.value.items.get(id)?.has(step) ?? false,
  more: () => moreItems.value,
  moreShown: () => applied.value.more.length > 0,
  requestMeasure,
});

let tabbing = false;
let entered = false;
let lastFocused: HTMLElement | null = null;
let tabStop: HTMLElement | null = null;

/**
 * One Tab stop for the whole toolbar, as a toolbar is: the control last used,
 * or the first on screen. A SegmentedControl is one stop, on its chosen
 * segment, and keeps its own arrows between segments.
 */
function syncTabStops(preferred?: HTMLElement | null) {
  const current = root.value;
  if (!current) return;
  const order = readingOrder(current);
  if (!order.length) return;
  const stops = order.filter((control) => {
    const group = control.closest("[role=radiogroup]");
    return !group || !current.contains(group);
  });
  if (!stops.length) return;
  tabStop =
    (preferred && stops.includes(preferred) ? preferred : null) ??
    (tabStop && stops.includes(tabStop) ? tabStop : null) ??
    stops[0]!;
  for (const control of stops) control.tabIndex = control === tabStop ? 0 : -1;
}

function onDocumentKeyDown(event: KeyboardEvent) {
  tabbing = event.key === "Tab";
}
function offTab() {
  tabbing = false;
}

function onKeyDown(event: KeyboardEvent) {
  emit("keydown", event);
  if (event.defaultPrevented) return;
  const current = root.value;
  if (!current) return;
  const horizontal = props.orientation === "horizontal";
  if (!horizontal || event.defaultPrevented) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  const target = event.target as HTMLElement;
  // Up and Down do nothing in a horizontal toolbar, a SegmentedControl's
  // radio group takes them itself, as does an open menu.
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    if (target.closest("[role=radiogroup]") && current.contains(target)) {
      event.preventDefault();
      event.stopPropagation();
    }
    return;
  }
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  const rtl = getComputedStyle(current).direction === "rtl";
  const forward = (event.key === "ArrowRight") !== rtl;
  if (keepsArrow(target, forward)) return;
  const order = readingOrder(current);
  const index = order.findIndex((control) => control === target || control.contains(target));
  if (index < 0) return;
  let next = index + (forward ? 1 : -1);
  if (props.loopFocus) next = (next + order.length) % order.length;
  else if (next < 0 || next >= order.length) return;
  // Ours alone: neither the toolbar's DOM order nor a SegmentedControl's
  // radio group (which would choose as it moves).
  event.preventDefault();
  event.stopPropagation();
  if (next !== index) order[next]!.focus();
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
  const current = root.value;
  if (!current) return;
  lastFocused = event.target as HTMLElement;
  syncTabStops(event.target as HTMLElement);
  const from = event.relatedTarget;
  const fromOutside = !(from instanceof Node && current.contains(from));
  if (fromOutside && tabbing && !entered) {
    entered = true;
    const [first] = readingOrder(current);
    if (first && first !== event.target) {
      first.focus();
      return;
    }
  }
  entered = true;
}

// The first Tab into the toolbar lands on its first control on screen, not
// its first in the DOM; then focus goes wherever the person last was.
function onFocusOut(event: FocusEvent) {
  const current = root.value;
  if (!current) return;
  // Still shown as it blurs: the person moved focus away themselves.
  if ((event.target as HTMLElement).getClientRects().length > 0) lastFocused = null;
}

const rootClass = computed(() => cn(styles.root(), attrs.class as string | undefined));

onMounted(() => {
  requestMeasure();
  const element = root.value;
  if (!element) return;
  const region = element.parentElement;
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(update);
    if (region) observer.observe(region);
  }
  if (typeof MutationObserver !== "undefined") {
    mutations = new MutationObserver((records) => {
      const own = (node: Node) => node instanceof Element && node.hasAttribute(BREAK);
      const changed = records.some(
        (record) =>
          record.type === "characterData" ||
          ![...record.addedNodes, ...record.removedNodes].every(own),
      );
      if (changed) requestMeasure();
    });
    mutations.observe(element, { childList: true, subtree: true, characterData: true });
  }
  document.fonts?.addEventListener?.("loadingdone", requestMeasure);
  document.addEventListener("keydown", onDocumentKeyDown, true);
  document.addEventListener("keyup", offTab, true);
  document.addEventListener("pointerdown", offTab, true);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  mutations?.disconnect();
  if (frame) cancelAnimationFrame(frame);
  document.fonts?.removeEventListener?.("loadingdone", requestMeasure);
  document.removeEventListener("keydown", onDocumentKeyDown, true);
  document.removeEventListener("keyup", offTab, true);
  document.removeEventListener("pointerdown", offTab, true);
});

// Focus towards a control no longer shown (its label gave way, it moved into
// More) would fall to the body: put it on the same control, or the one that
// replaced it, or nothing visible.
watch(
  applied,
  () => {
    const current = root.value;
    const last = lastFocused;
    if (!current || !last || last.getClientRects().length > 0) return;
    const active = document.activeElement;
    if (active !== last && active !== document.body && active !== null) return;
    const more = Array.from(current.querySelectorAll<HTMLElement>("[data-fit-more-trigger]")).find(
      (trigger) => trigger.getClientRects().length > 0,
    );
    lastFocused = null;
    more?.focus();
  },
  { flush: "post" },
);

defineExpose({ measure: requestMeasure, refresh: update });
</script>

<template>
  <div
    ref="root"
    v-bind="{ ...attrs, class: undefined }"
    role="toolbar"
    :aria-orientation="props.orientation"
    :data-slot="(attrs['data-slot'] as string) ?? 'fit-toolbar'"
    :data-fit-wrapping="applied.wrapping ? '' : undefined"
    :class="rootClass"
    @keydown.capture="onKeyDown"
    @focusin="onFocus"
    @focusout="onFocusOut"
  >
    <slot />
  </div>
</template>
