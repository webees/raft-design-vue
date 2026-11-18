<script setup lang="ts" generic="T">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useSlots,
  watch,
  type ComponentPublicInstance,
  type CSSProperties,
  type PropType,
  type VNodeChild,
} from "vue";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { FenwickTree } from "./fenwick-tree";
import { getAlignedScrollTop, SCROLL_ALIGN_STEPS } from "./virtual-list-align";
import {
  ITEM_KEY_ATTR,
  NON_VIRTUAL_VISIBLE_ITEMS_STYLE,
  RENDER_THRASHING_COUNT,
  RENDER_THRASHING_WINDOW_MS,
  VIRTUAL_VISIBLE_ITEMS_STYLE,
} from "./virtual-list-constants";
import { findItemsAnchor, getAnchoredRange } from "./virtual-list-items-anchor";
import { measureRowSpans, measureRowStart, toLayoutUnit } from "./virtual-list-measure";
import { getWheelDeltaScale, isCoarsePointer, isIOS } from "./virtual-list-platform";
import { getResizeObserverDelegate } from "./resize-observer-delegate";
import {
  getNeededEnd,
  getHorizontalRange,
  getOverscannedRange,
  getVerticalRange,
  haveSameKeys,
  isHiddenByDisplayNone,
} from "./virtual-list-range";
import {
  createTypicalSizeCache,
  getTypicalSize,
  recordMeasuredSize,
} from "./virtual-list-size-cache";
import { useIosMomentumCompensation } from "./use-ios-momentum-compensation";
import { useScrollAnchor } from "./use-scroll-anchor";
import type {
  VirtualListApi,
  VirtualListItemRenderProps,
  VirtualListMeasuredRef,
  VirtualListProps,
  VirtualListRenderReason,
  VirtualListScrollToOptions,
} from "./virtual-list.types";

const props = withDefaults(defineProps<VirtualListProps<T>>(), {
  virtual: true,
  focusable: true,
});
const slots = useSlots();

const virtual = computed(() => props.virtual !== false);
const items = computed<readonly T[]>(() => props.items ?? []);
const keys = computed(() => items.value.map((item) => props.getKey(item)));
const keyToIndex = computed(() => {
  const map = new Map<string, number>();
  keys.value.forEach((key, index) => map.set(key, index));
  return map;
});
const estimatedSize = computed(() => Math.max(1, props.itemEstimatedSize ?? 40));
const itemMinSize = computed(() => Math.max(1, props.itemMinSize ?? 1));
const paddingTop = computed(() => props.paddingTop ?? 0);
const paddingBottom = computed(() => props.paddingBottom ?? 0);

const rootEl = ref<HTMLDivElement | null>(null);
const itemsEl = ref<HTMLDivElement | null>(null);
const visibleComponent = ref<HTMLElement | { $el?: unknown } | null>(null);

const VNodeRenderer = defineComponent({
  props: {
    node: { type: [Object, Array, String, Number] as PropType<VNodeChild>, default: undefined },
  },
  setup(nodeProps) {
    return () => nodeProps.node as VNodeChild;
  },
});

function getVisibleEl(): HTMLElement | null {
  return toElement(visibleComponent.value);
}

const viewport = ref({
  listHeight: undefined as number | undefined,
  scrollTop: 0,
  scrollLeft: 0,
  listWidth: 0,
});
const layoutVersion = ref(0);
const measuredVersion = ref(0);
const offsets = new Map<string, number>();
const measured = new Map<string, HTMLElement>();
const tree = shallowRef(new FenwickTree(0, estimatedSize.value));
const range = ref({ startIndex: 0, endIndex: -1 });
const horizontalStartIndex = ref(0);
const horizontalEndIndex = ref(-1);
const prependIndexes = ref<number[]>([]);
const keptKeys = ref<string[]>([]);
const leadingMargin = ref(0);
const compensationY = ref(0);
const scrollingUp = ref(false);
const firstRowStart = ref(0);
/** Set while a wheel event drives the scroll, so its scroll events do not re-sync the range. */
const wheelScrolling = ref(false);
let wheelScrollFrame = 0;
const pendingScrollTask = ref<(() => void) | null>(null);
const renderQueue = new Map<string, { el: HTMLElement; isFirst: boolean }>();
const typicalSize = createTypicalSizeCache();
const columnTree = computed(() => {
  const columns = props.columns ?? [];
  if (columns.length === 0) {
    return null;
  }
  const tree = new FenwickTree(columns.length, 0);
  columns.forEach((column, index) => tree.add(index, column.width));
  return tree;
});
const forcedRenderTimes: number[] = [];
let resizeBatchScheduled = false;
let ignoreItemResize = false;

/* Rows currently in flow, by key, for measuring and for the iOS momentum compensation. */
const flowElements = new Map<string, HTMLElement>();

function track() {
  return layoutVersion.value;
}

function bumpLayout() {
  layoutVersion.value += 1;
}

function toPublicReason(reason: string): VirtualListRenderReason {
  switch (reason) {
    case "session":
      return "sessionChanged";
    case "items":
      return "itemsChanged";
    case "itemResize":
      return "batchItemResize";
    case "listResize":
      return "listResize";
    default:
      return "listScroll";
  }
}

function reportRenderAnomaly(reason: string) {
  const now = Date.now();
  forcedRenderTimes.push(now);
  const windowStart = now - RENDER_THRASHING_WINDOW_MS;
  while (forcedRenderTimes.length > 0 && forcedRenderTimes[0]! < windowStart) {
    forcedRenderTimes.shift();
  }
  if (forcedRenderTimes.length < RENDER_THRASHING_COUNT) {
    return;
  }
  props.onRenderAnomaly?.({
    type: "renderThrashing",
    message: `${forcedRenderTimes.length} forced renders within ${RENDER_THRASHING_WINDOW_MS}ms`,
    payload: {
      renderCount: forcedRenderTimes.length,
      windowMs: RENDER_THRASHING_WINDOW_MS,
      triggerReason: toPublicReason(reason),
      itemCount: items.value.length,
    },
  });
  forcedRenderTimes.length = 0;
}

function rebuildTree() {
  const next = new FenwickTree(items.value.length, estimatedSize.value);
  keys.value.forEach((key, index) => {
    const offset = offsets.get(key);
    if (offset !== undefined) {
      next.add(index, offset);
    }
  });
  tree.value = next;
  bumpLayout();
}

rebuildTree();

watch(estimatedSize, rebuildTree);

watch(
  () => props.sessionId,
  () => {
    offsets.clear();
    measured.clear();
    flowElements.clear();
    rebuildTree();
    if (rootEl.value) {
      rootEl.value.scrollTop = 0;
    }
    syncViewport();
    syncRange("session");
  },
);

/* keepAnchorOnItemsChange: keep the row at the view's top in place when items change. */
let committedItems: readonly T[] = items.value;
let committedTree = tree.value;
let committedRange = { ...range.value };
let committedPrependIndexes: readonly number[] = [];

watch(
  () => keys.value,
  () => {
    const prevItems = committedItems;
    const prevTree = committedTree;
    const prevRange = committedRange;
    rebuildTree();
    if (props.keepAnchorOnItemsChange !== true || !virtual.value || prevItems.length === 0) {
      committedItems = items.value;
      committedTree = tree.value;
      committedRange = { ...range.value };
      committedPrependIndexes = prependIndexes.value;
      return;
    }
    const listEl = rootEl.value;
    if (!listEl) {
      return;
    }
    const anchor = findItemsAnchor({
      prevItems,
      prevTree,
      prevPrependIndexes: committedPrependIndexes,
      nextItems: items.value,
      getKey: (item) => props.getKey(item),
      canAnchor: props.canAnchorItem,
      top: listEl.scrollTop + compensationY.value - paddingTop.value - leadingMargin.value,
    });
    if (anchor !== null) {
      const [startIndex, endIndex] = getAnchoredRange(
        prevRange.startIndex,
        prevRange.endIndex,
        anchor.index,
        items.value.length,
      );
      range.value = { startIndex, endIndex };
      prependIndexes.value = anchor.prependIndexes;
      const nextTop = tree.value.sum(anchor.index) - anchor.delta;
      listEl.scrollTop = Math.max(0, nextTop + paddingTop.value + leadingMargin.value);
    }
    committedItems = items.value;
    committedTree = tree.value;
    committedRange = { ...range.value };
    committedPrependIndexes = prependIndexes.value;
  },
  { flush: "pre" },
);

const totalHeight = computed(() => {
  track();
  return tree.value.sum(items.value.length);
});

const startOffset = computed(() => {
  track();
  return tree.value.sum(range.value.startIndex);
});

function syncViewport() {
  const el = rootEl.value;
  if (!el) {
    return;
  }
  const listHeight = el.clientHeight;
  const listWidth = el.clientWidth;
  const { scrollTop, scrollLeft } = el;
  const current = viewport.value;
  if (
    current.listHeight === listHeight &&
    current.scrollTop === scrollTop &&
    current.scrollLeft === scrollLeft &&
    current.listWidth === listWidth
  ) {
    return;
  }
  viewport.value = { listHeight, scrollTop, scrollLeft, listWidth };
}

function collectKeptKeys(nextStartIndex: number, nextEndIndex: number): string[] {
  const el = rootEl.value;
  if (!el || !virtual.value) {
    return [];
  }
  const keys: string[] = [];
  const keep = (key: string) => {
    const index = keyToIndex.value.get(key);
    if (
      index !== undefined &&
      (!(index >= nextStartIndex) || !(index <= nextEndIndex)) &&
      !keys.includes(key)
    ) {
      keys.push(key);
    }
  };
  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    const row = active.closest(`[${ITEM_KEY_ATTR}]`);
    if (row instanceof HTMLElement && el.contains(row)) {
      const key = row.getAttribute(ITEM_KEY_ATTR);
      if (key !== null) {
        keep(key);
      }
    }
  }
  const selection = typeof window.getSelection === "function" ? window.getSelection() : null;
  if (selection !== null && !selection.isCollapsed && selection.rangeCount > 0) {
    el.querySelectorAll(`[${ITEM_KEY_ATTR}]`).forEach((row) => {
      if (!(row instanceof HTMLElement)) {
        return;
      }
      if (!selection.containsNode(row, true) && row.getElementsByTagName("input").length !== 0) {
        return;
      }
      const key = row.getAttribute(ITEM_KEY_ATTR);
      if (key !== null) {
        keep(key);
      }
    });
  }
  return keys;
}

function plannedSize(index: number) {
  const key = keys.value[index];
  return key !== undefined && offsets.has(key)
    ? tree.value.get(index)
    : getTypicalSize(
        typicalSize,
        offsets,
        measuredVersion.value,
        estimatedSize.value,
        itemMinSize.value,
      );
}

function syncRange(reason: string) {
  const el = rootEl.value;
  if (!el) {
    return;
  }
  const count = items.value.length;
  if (!virtual.value) {
    range.value = { startIndex: 0, endIndex: count - 1 };
    horizontalStartIndex.value = 0;
    horizontalEndIndex.value = -1;
    prependIndexes.value = [];
    applyLayoutStyles(0);
    return;
  }
  if (viewport.value.listHeight === undefined) {
    applyLayoutStyles(range.value.startIndex);
    return;
  }
  const listHeight = viewport.value.listHeight;
  const scrollTop = el.scrollTop;
  const effectiveScrollTop = scrollTop + compensationY.value;
  const viewTop = effectiveScrollTop - paddingTop.value - leadingMargin.value;
  const view = getVerticalRange({
    fenwickTree: tree.value,
    scrollTop: effectiveScrollTop,
    listHeight,
    itemMinSize: itemMinSize.value,
    itemCount: count,
    paddingTop: paddingTop.value + leadingMargin.value,
  });
  const neededEnd = getNeededEnd({
    fenwickTree: tree.value,
    startIndex: view.startIndex,
    viewTop,
    listHeight,
    itemMinSize: itemMinSize.value,
    itemCount: count,
    isMeasured: (index) => offsets.has(keys.value[index] ?? ""),
  });
  const prev = range.value;
  if (scrollTop !== viewport.value.scrollTop) {
    scrollingUp.value = scrollTop < viewport.value.scrollTop;
  }
  const moved = Math.abs(scrollTop - viewport.value.scrollTop);
  const overscanned = viewport.value.listHeight !== undefined && viewport.value.listHeight > 0;
  const next = overscanned
    ? getOverscannedRange({
        fenwickTree: tree.value,
        view,
        prev,
        neededEnd,
        viewTop,
        moved,
        movingUp: scrollingUp.value,
        settling: pendingScrollTask.value !== null,
        plannedSize,
        listHeight,
        itemCount: count,
      })
    : view;
  const rangeChanged = next.startIndex !== prev.startIndex || next.endIndex !== prev.endIndex;
  const nextScrollLeft = el.scrollLeft;
  const nextListWidth = el.clientWidth;
  const nextInsidePrev =
    !overscanned && next.startIndex >= prev.startIndex && prev.endIndex >= next.endIndex;
  const prevColRange = {
    startIndex: horizontalStartIndex.value,
    endIndex: horizontalEndIndex.value,
  };
  const nextColRange = getHorizontalRange({
    xFenwickTree: columnTree.value,
    scrollLeft: nextScrollLeft,
    listWidth: nextListWidth,
    columnCount: props.columns?.length ?? 0,
  });
  const colRangeChanged =
    prevColRange.startIndex !== nextColRange.startIndex ||
    prevColRange.endIndex !== nextColRange.endIndex;
  viewport.value = {
    listHeight,
    scrollTop,
    scrollLeft: nextScrollLeft,
    listWidth: nextListWidth,
  };
  let nextKeptKeys: string[] = [];
  let keptKeysChanged = false;
  if (reason !== "session") {
    nextKeptKeys = collectKeptKeys(next.startIndex, next.endIndex);
    keptKeysChanged =
      nextKeptKeys.length !== keptKeys.value.length || !haveSameKeys(nextKeptKeys, keptKeys.value);
  }
  if (
    reason !== "session" &&
    !keptKeysChanged &&
    (!rangeChanged || nextInsidePrev) &&
    !colRangeChanged
  ) {
    applyLayoutStyles(nextInsidePrev ? prev.startIndex : next.startIndex);
    return;
  }
  if (reason !== "session") {
    keptKeys.value = nextKeptKeys;
  } else {
    keptKeys.value = [];
  }
  if (colRangeChanged) {
    horizontalStartIndex.value = nextColRange.startIndex;
    horizontalEndIndex.value = nextColRange.endIndex;
  }
  const entering: number[] = [];
  if (pendingScrollTask.value === null && next.endIndex >= prev.startIndex) {
    for (let index = next.startIndex; index < prev.startIndex; index += 1) {
      entering.push(index);
    }
  }
  prependIndexes.value = entering;
  range.value = next;
  reportRenderAnomaly(reason);
  applyLayoutStyles(next.startIndex);
  void nextTick(() => {
    applyLayoutStyles(range.value.startIndex);
  });
}

function applyLayoutStyles(firstIndex: number) {
  if (!virtual.value) {
    return;
  }
  const spacerEl = itemsEl.value;
  const visible = getVisibleEl();
  if (!spacerEl || !visible) {
    return;
  }
  track();
  let index = Math.min(firstIndex, items.value.length);
  let rowStart = 0;
  if (props.itemResizable) {
    const firstFlowRow = visible.firstElementChild;
    if (firstFlowRow instanceof HTMLElement) {
      const firstKey = firstFlowRow.getAttribute(ITEM_KEY_ATTR);
      const parsed = firstKey === null ? undefined : keyToIndex.value.get(firstKey);
      if (parsed !== undefined) {
        index = parsed;
        rowStart = measureRowStart(visible, firstFlowRow);
      }
    }
  }
  firstRowStart.value = rowStart;
  const height = totalHeight.value + leadingMargin.value;
  const nextHeight = `${height}px`;
  if (props.itemResizable) {
    if (spacerEl.style.height !== "" || spacerEl.style.minHeight !== nextHeight) {
      spacerEl.style.height = "";
      spacerEl.style.minHeight = nextHeight;
    }
  } else if (spacerEl.style.height !== nextHeight || spacerEl.style.minHeight !== "") {
    spacerEl.style.height = nextHeight;
    spacerEl.style.minHeight = "";
    props.onContentResize?.();
  }
  const offset = leadingMargin.value + tree.value.sum(index) - rowStart;
  const transform = `translateY(${offset}px)`;
  if (visible.style.transform !== transform) {
    visible.style.transform = transform;
    props.onTransformChange?.();
  }
}

function handleWheel(event: WheelEvent) {
  if (props.catchWheel !== true || !virtual.value) {
    return;
  }
  const listEl = rootEl.value;
  if (!listEl) {
    return;
  }
  if (isCoarsePointer()) {
    props.onWheel?.(event);
    return;
  }
  const scale = getWheelDeltaScale();
  const deltaX = event.deltaX / scale;
  const deltaY = event.deltaY / scale;
  if (
    deltaX === 0 &&
    ((listEl.scrollTop === 0 && deltaY <= 0) ||
      (listEl.scrollTop + listEl.offsetHeight >= listEl.scrollHeight && deltaY >= 0))
  ) {
    props.onWheel?.(event);
    return;
  }
  event.preventDefault();
  listEl.scrollTop += deltaY;
  listEl.scrollLeft += deltaX;
  wheelScrolling.value = true;
  cancelAnimationFrame(wheelScrollFrame);
  wheelScrollFrame = requestAnimationFrame(() => {
    wheelScrolling.value = false;
  });
  syncRange("wheel");
  props.onWheel?.(event);
}

function handleScroll(event: Event) {
  const listEl = rootEl.value;
  if (!listEl) {
    return;
  }
  if (!ios.isScrollSuppressedWithForceRestore(listEl.scrollTop)) {
    if (!wheelScrolling.value) {
      syncRange("listScroll");
    }
    if (pendingScrollTask.value !== null) {
      const task = pendingScrollTask.value;
      pendingScrollTask.value = null;
      task();
    }
    props.onScroll?.(event);
  }
}

/* ---------- measurement ---------- */

const rowObserver = getResizeObserverDelegate();

function measureElement(el: Element | null, key: string) {
  if (!(el instanceof HTMLElement) || !props.itemResizable) {
    return;
  }
  if (measured.get(key) === el) {
    return;
  }
  measured.set(key, el);
  el.setAttribute(ITEM_KEY_ATTR, key);
  rowObserver.observe(el, (entry) => {
    if (ignoreItemResize || !props.itemResizable) return;
    const key = entry.target.getAttribute(ITEM_KEY_ATTR);
    if (key === null) return;
    const queued = renderQueue.get(key);
    renderQueue.set(key, { el: entry.target, isFirst: queued?.isFirst === true });
    rowObserver.runAfterEntries(applyResizes);
  });
  renderQueue.set(key, { el, isFirst: true });
  scheduleApplyResizes();
}

function makeDomRef(key: string, kept = false): VirtualListMeasuredRef {
  return (el: Element | null) => {
    if (el === null) {
      measured.delete(key);
      flowElements.delete(key);
      return;
    }
    if (kept) {
      connectedKeptElements.set(key, el as HTMLElement);
      return;
    }
    flowElements.set(key, el as HTMLElement);
    measureElement(el, key);
  };
}

const connectedKeptElements = new Map<string, HTMLElement>();

function scheduleApplyResizes() {
  if (resizeBatchScheduled) {
    return;
  }
  resizeBatchScheduled = true;
  void Promise.resolve().then(() => {
    resizeBatchScheduled = false;
    applyResizes();
  });
}

function applyResizes() {
  if (renderQueue.size === 0) {
    return;
  }
  if (ignoreItemResize || !props.itemResizable) {
    renderQueue.clear();
    return;
  }
  const listEl = rootEl.value;
  if (!listEl) {
    renderQueue.clear();
    return;
  }
  if (!virtual.value) {
    renderQueue.clear();
    return;
  }
  const queue = [...renderQueue.entries()];
  renderQueue.clear();
  const visible = getVisibleEl();
  if (!visible) {
    return;
  }
  const flowRows: { key: string; index: number; el: HTMLElement }[] = [];
  for (let index = range.value.startIndex; index <= range.value.endIndex; index += 1) {
    const key = keys.value[index];
    const el = key === undefined ? undefined : flowElements.get(key);
    if (key !== undefined && el !== undefined && el.isConnected) {
      flowRows.push({ key, index, el });
    }
  }
  if (flowRows.length === 0) {
    return;
  }
  const viewTop = listEl.scrollTop + compensationY.value - paddingTop.value - leadingMargin.value;
  const viewTopIndex = tree.value.getBound(Math.max(0, viewTop));
  const isFirstOfKey = new Map<string, boolean>();
  for (const [key, queued] of queue) {
    if (!isFirstOfKey.has(key)) {
      isFirstOfKey.set(key, queued.isFirst);
    }
  }
  const { spans, firstStart } = measureRowSpans(
    visible,
    flowRows.map((row) => row.el),
  );
  let leadingMarginDelta = 0;
  if (flowRows[0]!.index === 0 && firstStart !== leadingMargin.value) {
    leadingMarginDelta = firstStart - leadingMargin.value;
    leadingMargin.value = firstStart;
  }
  const resizes: { index: number; key: string; delta: number }[] = [];
  let changed = false;
  for (let i = 0; i < flowRows.length; i += 1) {
    const { key, index } = flowRows[i]!;
    const size = toLayoutUnit(spans[i]!);
    if (recordMeasuredSize(offsets, key, size, estimatedSize.value)) {
      measuredVersion.value += 1;
    }
    const current = tree.value.get(index);
    const delta = size - current;
    if (delta === 0) {
      continue;
    }
    tree.value.add(index, delta);
    changed = true;
    resizes.push({ index, key, delta });
  }
  if (!changed && leadingMarginDelta === 0 && pendingScrollTask.value === null) {
    return;
  }
  const scrollTopBefore = listEl.scrollTop;
  const effectiveTopBefore = scrollTopBefore + compensationY.value;
  bumpLayout();
  applyLayoutStyles(range.value.startIndex);
  const pendingTask = pendingScrollTask.value;
  let contentMoved = true;
  if (pendingTask === null) {
    let compensation = 0;
    let uncompensated = false;
    const compensates = (index: number, key: string | undefined) =>
      (key !== undefined &&
        isFirstOfKey.get(key) === true &&
        prependIndexes.value.includes(index)) ||
      index < viewTopIndex;
    for (const resize of resizes) {
      if (compensates(resize.index, resize.key)) {
        compensation += resize.delta;
      } else if (resize.delta !== 0) {
        uncompensated = true;
      }
    }
    const firstItem = items.value[0];
    if (
      leadingMarginDelta !== 0 &&
      (viewTop > 0 || compensates(0, firstItem === undefined ? undefined : keys.value[0]))
    ) {
      compensation += leadingMarginDelta;
    } else if (leadingMarginDelta !== 0) {
      uncompensated = true;
    }
    if (compensation !== 0) {
      const remaining = compensation - (listEl.scrollTop - scrollTopBefore);
      if (remaining !== 0 && !ios.addCompensation(remaining)) {
        listEl.scrollBy(0, remaining);
      }
    }
    contentMoved =
      uncompensated ||
      Math.abs(listEl.scrollTop + compensationY.value - (effectiveTopBefore + compensation)) >= 1;
  } else {
    props.onContentResize?.();
    const task = pendingScrollTask.value;
    pendingScrollTask.value = null;
    task?.();
  }
  viewport.value = {
    ...viewport.value,
    scrollLeft: listEl.scrollLeft,
    scrollTop: listEl.scrollTop,
  };
  if (pendingTask === null && contentMoved) {
    props.onContentResize?.();
  }
  syncRange("batchItemResize");
}

/* ---------- iOS momentum compensation ---------- */

const ios = useIosMomentumCompensation({
  enabled: isIOS,
  listElRef: rootEl,
  itemsElRef: itemsEl,
  syncViewport,
  compensationYRef: compensationY,
});

/* ---------- scrollTo ---------- */

function settleScroll(
  index: number,
  behavior: ScrollBehavior,
  align: "start" | "center" | "end",
  scrollMarginTop: number,
  scrollMarginBottom: number,
  step = 0,
) {
  const listEl = rootEl.value;
  if (!listEl) {
    return;
  }
  const key = keys.value[index];
  const row = key === undefined ? undefined : flowElements.get(key);
  const itemTop = tree.value.sum(index);
  const itemSize = row === undefined || row === null ? tree.value.get(index) : row.offsetHeight;
  const maxTop = Math.max(
    0,
    tree.value.sum(items.value.length) + leadingMargin.value - listEl.clientHeight,
  );
  const target = getAlignedScrollTop({
    itemTop: itemTop + leadingMargin.value,
    itemSize,
    viewportHeight: listEl.clientHeight,
    align,
    scrollMarginTop,
    scrollMarginBottom,
    maxScrollTop: maxTop,
  });
  if (Math.abs(listEl.scrollTop - target) > 0.5) {
    if (behavior === "instant") {
      listEl.scrollTop = target;
    } else {
      listEl.scrollTo({ top: target, behavior });
    }
    syncRange("listScroll");
  }
  const rendered = key !== undefined && flowElements.has(key);
  if (!rendered && step + 1 < SCROLL_ALIGN_STEPS) {
    void nextTick(() => {
      requestAnimationFrame(() => {
        settleScroll(index, "instant", align, scrollMarginTop, scrollMarginBottom, step + 1);
      });
    });
  }
}

function scrollTo(options: VirtualListScrollToOptions | number, topIfNumber?: number) {
  const listEl = rootEl.value;
  if (!listEl) {
    return;
  }
  if (typeof options === "number") {
    listEl.scrollTo({
      left: options,
      top: topIfNumber,
      behavior: "instant",
    });
    syncRange("listScroll");
    return;
  }
  const opts: VirtualListScrollToOptions = options;
  if (opts.position === "top") {
    pendingScrollTask.value = null;
    listEl.scrollTo({ top: 0, behavior: opts.behavior ?? "instant" });
    syncRange("listScroll");
    return;
  }
  if (opts.position === "bottom") {
    const jumpToBottom = () => {
      listEl.scrollTo({
        top: listEl.scrollHeight || 2_000_000_000,
        behavior: "instant",
      });
    };
    listEl.scrollTo({
      top: listEl.scrollHeight || 2_000_000_000,
      behavior: opts.behavior ?? "instant",
    });
    pendingScrollTask.value = jumpToBottom;
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        pendingScrollTask.value = null;
      });
    });
    syncRange("listScroll");
    return;
  }
  let index: number | undefined;
  if (opts.index !== undefined) {
    index = opts.index;
  } else if (opts.key !== undefined) {
    index = keyToIndex.value.get(opts.key);
  }
  if (index === undefined) {
    if (opts.top !== undefined || opts.left !== undefined) {
      listEl.scrollTo({
        top: opts.top,
        left: opts.left,
        behavior: opts.behavior ?? "instant",
      });
      syncRange("listScroll");
    }
    return;
  }
  if (index < 0 || index >= items.value.length) {
    return;
  }
  settleScroll(
    index,
    opts.behavior ?? "instant",
    opts.align ?? "start",
    opts.scrollMarginTop ?? 0,
    opts.scrollMarginBottom ?? 0,
  );
}

function submitScrollAdjustingTask(task: () => void) {
  task();
  void nextTick(() => {
    task();
    requestAnimationFrame(() => {
      task();
      applyLayoutStyles(range.value.startIndex);
    });
  });
}

/* ---------- keyboard ---------- */

function onKeydown(event: KeyboardEvent) {
  if (props.focusable !== true || event.defaultPrevented) {
    return;
  }
  const el = rootEl.value;
  if (!el || event.target !== event.currentTarget) {
    return;
  }
  if (
    event.key === "PageDown" ||
    event.key === "PageUp" ||
    event.key === " " ||
    event.key === "Spacebar"
  ) {
    const page = Math.max(el.clientHeight - (props.keyboardPageBottomOcclusion ?? 0) - 32, 0);
    if (page <= 0) {
      return;
    }
    event.preventDefault();
    el.scrollTop +=
      event.key === "PageUp" || ((event.key === " " || event.key === "Spacebar") && event.shiftKey)
        ? -page
        : page;
    return;
  }
  let position: "top" | "bottom" | null = null;
  switch (event.key) {
    case "Home":
      position = "top";
      break;
    case "ArrowUp":
      if (event.metaKey) {
        position = "top";
      }
      break;
    case "End":
      position = "bottom";
      break;
    case "ArrowDown":
      if (event.metaKey) {
        position = "bottom";
      }
      break;
  }
  if (position) {
    event.preventDefault();
    scrollTo({ position });
  }
}

/* ---------- render helpers ---------- */

function columnLefts() {
  const lefts: number[] = [];
  let left = 0;
  for (const column of props.columns ?? []) {
    lefts.push(left);
    left += column.width;
  }
  return { lefts, total: left };
}

function horizontalRange(columns: readonly { width: number }[]) {
  const { lefts, total } = columnLefts();
  if (columns.length === 0) {
    return { start: 0, end: -1, lefts, total };
  }
  const start = horizontalStartIndex.value;
  const end = horizontalEndIndex.value;
  return { start, end, lefts, total };
}

function renderCols(index: number, item: T) {
  if (!props.renderCol) {
    return undefined;
  }
  const columns = props.columns ?? [];
  const { start, end, lefts } = horizontalRange(columns);
  const nodes: VNodeChild[] = [];
  for (let colIndex = start; colIndex <= end; colIndex += 1) {
    nodes.push(
      props.renderCol({
        column: columns[colIndex],
        left: lefts[colIndex]!,
        item,
        key: colIndex,
      }),
    );
  }
  return nodes;
}

function renderItemWithCols(index: number, item: T) {
  if (!props.renderItemWithCols) {
    return undefined;
  }
  const columns = props.columns ?? [];
  const { start, end, lefts } = horizontalRange(columns);
  return props.renderItemWithCols({
    itemIndex: index,
    startColIndex: start,
    endColIndex: end,
    allColumns: columns,
    item,
    getLeft: (colIndex: number) => lefts[colIndex] ?? 0,
  });
}

function rowProps(
  index: number,
  kept: boolean,
  domRef: VirtualListMeasuredRef | null,
): VirtualListItemRenderProps<T> & { key: string } {
  const item = items.value[index]!;
  const key = keys.value[index]!;
  const style: CSSProperties | undefined = kept
    ? {
        position: "absolute",
        top: `${tree.value.sum(index) - startOffset.value + firstRowStart.value}px`,
        left: 0,
        right: 0,
      }
    : props.columns?.length
      ? { position: "relative", width: `${columnLefts().total}px` }
      : undefined;
  return {
    key,
    domRef,
    item,
    index,
    renderedCols: renderCols(index, item),
    renderedItemWithCols: renderItemWithCols(index, item),
    style,
  };
}

function buildRow(index: number, kept = false) {
  const item = items.value[index];
  const key = keys.value[index];
  if (item === undefined || key === undefined) {
    return undefined;
  }
  const reactKey = props.sessionId !== undefined ? `${props.sessionId}:${key}` : key;
  const domRef = props.itemResizable ? makeDomRef(key, kept) : null;
  if (props.ItemComponent) {
    const ItemComponent = props.ItemComponent;
    return {
      key: reactKey,
      render: () => h(ItemComponent, rowProps(index, kept, domRef)),
    };
  }
  if (props.children) {
    const children = props.children;
    return {
      key: reactKey,
      render: () => children(rowProps(index, kept, domRef)),
    };
  }
  return {
    key: reactKey,
    render: () => {
      const rowPropsValue = rowProps(index, kept, domRef);
      return h(
        "div",
        {
          class: cn("r-virtual-list__item", props.itemsClassName),
          [ITEM_KEY_ATTR]: key,
          style: rowPropsValue.style,
          ref: (element: Element | ComponentPublicInstance | null) => {
            rowPropsValue.domRef?.(element instanceof HTMLElement ? element : null);
          },
        },
        slots.item?.(rowPropsValue),
      );
    },
  };
}

const rows = computed(() => {
  track();
  const out: { key: string; render: () => VNodeChild }[] = [];
  for (let index = range.value.startIndex; index <= range.value.endIndex; index += 1) {
    const row = buildRow(index);
    if (row !== undefined) {
      out.push(row);
    }
  }
  return out;
});

const keptRows = computed(() => {
  track();
  if (!virtual.value) {
    return [];
  }
  const out: { key: string; render: () => VNodeChild }[] = [];
  for (const key of keptKeys.value) {
    const index = keyToIndex.value.get(key);
    if (index === undefined) {
      continue;
    }
    if (index >= range.value.startIndex && index <= range.value.endIndex) {
      continue;
    }
    const row = buildRow(index, true);
    if (row !== undefined) {
      out.push(row);
    }
  }
  return out;
});

const hasItems = computed(() => items.value.length !== 0);
const emptyCentered = computed(() => props.emptyAlign === "center");

const contentResizeObserver = new ResizeObserver(() => {
  props.onContentResize?.();
});
const observedContent = new Set<HTMLElement>();
const contentDomRef: VirtualListMeasuredRef = (el) => {
  if (!(el instanceof HTMLElement)) {
    if (observedContent.size !== 0) {
      props.onContentResize?.();
    }
    return;
  }
  observedContent.add(el);
  contentResizeObserver.observe(el);
};

const nonVirtualResizeObserver = new ResizeObserver(() => {
  props.onContentResize?.();
});

const scrollAnchor = useScrollAnchor(rootEl, getVisibleEl);

const wasVirtual = ref(virtual.value);
let previousSessionId = props.sessionId;

watch(
  [itemsEl, virtual],
  ([el, isVirtual]) => {
    nonVirtualResizeObserver.disconnect();
    if (el !== null && !isVirtual) {
      nonVirtualResizeObserver.observe(el);
    }
  },
  { flush: "post" },
);

/* Switching virtualization off: remember the item at the top, then put it back. */
watch(
  [virtual, () => props.sessionId],
  ([isVirtual, sessionId]) => {
    if (props.itemResizable && sessionId === previousSessionId) {
      if (wasVirtual.value && !isVirtual) {
        scrollAnchor.snapshot();
        void nextTick(() => scrollAnchor.restore());
      } else if (!wasVirtual.value && isVirtual) {
        scrollAnchor.clear();
      }
    }
    wasVirtual.value = isVirtual;
    previousSessionId = sessionId;
  },
  { flush: "post" },
);

const emptyNode = computed<VNodeChild>(() => {
  const empty = props.empty;
  if (empty === undefined) {
    return undefined;
  }
  return typeof empty === "function"
    ? (empty as (props: { domRef: VirtualListMeasuredRef }) => VNodeChild)({
        domRef: contentDomRef,
      })
    : empty;
});

const footerNode = computed<VNodeChild>(() => {
  const footer = props.footer;
  if (footer === undefined) {
    return undefined;
  }
  return typeof footer === "function"
    ? (footer as (props: { domRef: VirtualListMeasuredRef }) => VNodeChild)({
        domRef: contentDomRef,
      })
    : footer;
});

const rootStyle = computed<CSSProperties | undefined>(() => props.style);
const totalColumnsWidth = computed(() => {
  if (!props.renderCol && !props.renderItemWithCols) {
    return 0;
  }
  return (props.columns ?? []).reduce((width, column) => width + column.width, 0);
});
const itemsStyleComputed = computed<CSSProperties>(() => ({
  boxSizing: "content-box",
  width: totalColumnsWidth.value > 0 ? `${totalColumnsWidth.value}px` : undefined,
  paddingTop: paddingTop.value === 0 ? undefined : `${paddingTop.value}px`,
  ...props.itemsStyle,
}));
const visibleStyle = computed<CSSProperties>(() =>
  virtual.value
    ? {
        ...VIRTUAL_VISIBLE_ITEMS_STYLE,
      }
    : NON_VIRTUAL_VISIBLE_ITEMS_STYLE,
);

const api: VirtualListApi = {
  listElRef: rootEl,
  itemsElRef: itemsEl,
  scrollTo,
  syncViewport,
  getOffsetTopOfKey: (key: string) => {
    const index = keyToIndex.value.get(key);
    return index === undefined
      ? undefined
      : tree.value.sum(index) + paddingTop.value + leadingMargin.value;
  },
  submitScrollAdjustingTask,
  refreshListWidth: () => {},
};
if (props.componentRef) {
  const componentRef = props.componentRef;
  watch(
    rootEl,
    (value) => {
      if (value !== null) {
        componentRef.value = api;
      }
    },
    { immediate: true },
  );
}
if (props.domRef) {
  watch(rootEl, (value) => {
    props.domRef!.value = value;
  });
}

let rootObserver: ResizeObserver | null = null;

/**
 * Upstream keeps the focused row mounted while focus is inside the list and
 * releases it on a focusout that really left the list (`relatedTarget` null is
 * a window/tab switch, so it must not release).
 */
function onFocusOut(event: FocusEvent) {
  const el = rootEl.value;
  const next = event.relatedTarget;
  if (!el || next === null) return;
  if (next instanceof Node && el.contains(next)) return;
  void nextTick(() => syncRange("focusout"));
}

function onFocusIn() {
  syncRange("focusin");
}

onMounted(() => {
  syncViewport();
  syncRange("mount");
  if (rootEl.value) {
    rootObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      if (isHiddenByDisplayNone(rootEl.value!)) {
        return;
      }
      syncViewport();
      props.onResize?.(entry);
      bumpLayout();
      syncRange("listResize");
    });
    rootObserver.observe(rootEl.value);
    rootEl.value.addEventListener("focusout", onFocusOut);
    rootEl.value.addEventListener("focusin", onFocusIn);
  }
  if (props.defaultScrollKey !== undefined || props.defaultScrollIndex !== undefined) {
    void nextTick(() => {
      scrollTo({
        key: props.defaultScrollKey,
        index: props.defaultScrollIndex,
        top: props.defaultScrollIndex === undefined ? undefined : undefined,
        behavior: "instant",
      });
    });
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(wheelScrollFrame);
  for (const el of measured.values()) rowObserver.unobserve(el);
  contentResizeObserver.disconnect();
  nonVirtualResizeObserver.disconnect();
  observedContent.clear();
  rootObserver?.disconnect();
  rootObserver = null;
  rootEl.value?.removeEventListener("focusout", onFocusOut);
  rootEl.value?.removeEventListener("focusin", onFocusIn);
  resizeBatchScheduled = false;
  flowElements.clear();
  measured.clear();
  ignoreItemResize = true;
});

defineExpose(api);
</script>

<template>
  <div
    ref="rootEl"
    data-slot="virtual-list"
    :class="[
      'r-virtual-list',
      {
        'r-virtual-list--x-scrollable': !!columns?.length,
        'r-virtual-list--virtual': virtual,
        'r-virtual-list--show-scrollbar': showScrollbar,
        'r-virtual-list--printable': printable,
        'r-virtual-list--empty-centered': !hasItems && emptyCentered,
        'r-virtual-list--ios-compensation-enabled': virtual && isIOS,
      },
      props.class,
    ]"
    :style="rootStyle"
    :tabindex="focusable ? 0 : -1"
    @scroll.passive="handleScroll"
    @wheel="handleWheel"
    @keydown="onKeydown"
  >
    <slot name="header">
      <VNodeRenderer v-if="header !== undefined" :node="header" />
    </slot>
    <div
      v-if="hasItems"
      ref="itemsEl"
      data-slot="virtual-list-items"
      :class="itemsClassName"
      :style="itemsStyleComputed"
    >
      <component
        :is="visibleItemsTag ?? 'div'"
        ref="visibleComponent"
        data-slot="virtual-list-visible-items"
        :style="visibleStyle"
        v-bind="visibleItemsProps"
      >
        <component v-for="row in keptRows" :is="row.render()" :key="`kept-${row.key}`" />
        <component v-for="row in rows" :is="row.render()" :key="row.key" />
      </component>
    </div>
    <div
      v-else
      data-slot="virtual-list-empty"
      :class="cn('r-virtual-list__empty', emptyCentered && 'r-virtual-list__empty--center')"
    >
      <slot v-if="$slots.empty" name="empty" />
      <VNodeRenderer v-else-if="emptyNode !== undefined" :node="emptyNode" />
    </div>
    <VNodeRenderer v-if="footerNode !== undefined" :node="footerNode" />
    <slot v-else name="footer" />
    <div v-if="paddingBottom" :style="{ paddingBottom: `${paddingBottom}px` }" />
    <slot name="footer-after-bottom-padding">{{ footerAfterBottomPadding }}</slot>
  </div>
</template>
