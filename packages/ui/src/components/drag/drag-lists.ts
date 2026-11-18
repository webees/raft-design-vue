import { computed, ref, shallowRef } from "vue";

import type { DragMessages } from "./drag-announcements";

export type DragListsItems<L extends string> = Record<L, string[]>;
export type DragPlace = { place: string; position?: number; count?: number };

export type UseDragListsOptions<L extends string> = {
  lists: readonly L[];
  items: DragListsItems<L>;
  onItemsChange: (items: DragListsItems<L>) => void;
  listName: (list: L) => string;
  itemName: (id: string) => string;
  refuse?: (from: L, to: L, id: string) => string | null;
  announce: (message: string) => void;
  messages?: Partial<DragMessages>;
};

export type DraggedSlotProps = {
  /** This item is the one being dragged. */
  dragging?: boolean;
  /** The dragged item still stands at its own place. */
  home?: boolean;
  /** The item's radius class, for the place. */
  radius?: string;
  /** Classes for the place. */
  class?: string;
};

export type DragSortTransform = { x: number; y: number; scaleX: number; scaleY: number };

export type DragSortRect = { initial: { height: number }; translated: { height: number } };

export type DragSortStrategyArgs = {
  activeIndex: number;
  overIndex: number;
  index: number;
  rects: readonly (DragSortRect | null | undefined)[];
};

/**
 * dnd-kit's vertical strategy, except that nothing moves while the hand is
 * outside the list. Exposed for parity with the React package; the Vue engine
 * computes its own sibling offsets.
 */
export function dragListStrategy({
  activeIndex,
  overIndex,
  index,
  rects,
}: DragSortStrategyArgs): DragSortTransform | null {
  if (overIndex < 0) return null;
  if (activeIndex === overIndex || index === activeIndex) return null;
  const active = rects[activeIndex];
  if (!active) return null;
  const movedDown = index > activeIndex && index <= overIndex;
  const movedUp = index < activeIndex && index >= overIndex;
  if (!movedDown && !movedUp) return null;
  return {
    x: 0,
    y: movedDown ? -active.initial.height : active.translated.height,
    scaleX: 1,
    scaleY: 1,
  };
}

function cloneItems<L extends string>(items: DragListsItems<L>): DragListsItems<L> {
  const result = {} as DragListsItems<L>;
  for (const key of Object.keys(items) as L[]) result[key] = [...items[key]];
  return result;
}

export function moveBetweenLists<L extends string>(
  items: DragListsItems<L>,
  from: L,
  to: L,
  id: string,
  index: number,
): DragListsItems<L> {
  const next = cloneItems(items);
  const source = next[from].filter((item) => item !== id);
  next[from] = source;
  const target = from === to ? source : [...next[to]];
  const at = Math.max(0, Math.min(index, target.length));
  target.splice(at, 0, id);
  next[to] = target;
  return next;
}

export function placeInList<L extends string>(
  items: DragListsItems<L>,
  id: string,
  list: L,
  index: number,
  lists: readonly L[],
): DragListsItems<L> {
  const origin = lists.find((candidate) => items[candidate].includes(id));
  if (!origin) return items;
  return moveBetweenLists(items, origin, list, id, index);
}

export function useDragLists<L extends string>(options: UseDragListsOptions<L>) {
  const activeId = ref<string | null>(null);
  const snapshot = shallowRef<DragListsItems<L> | null>(null);
  const origin = shallowRef<{ list: L; index: number } | null>(null);
  const refusal = ref<{ list: L; reason: string } | null>(null);

  const listOf = (items: DragListsItems<L>, id: string): L | null => {
    if ((options.lists as readonly string[]).includes(id)) return id as L;
    return options.lists.find((list) => items[list].includes(id)) ?? null;
  };

  const where = (items: DragListsItems<L>, id: string): DragPlace | null => {
    const list = listOf(items, id);
    if (!list) return null;
    return {
      place: options.listName(list),
      position: items[list].indexOf(id) + 1,
      count: items[list].length,
    };
  };

  function start(id: string) {
    const list = listOf(options.items, id);
    if (!list) return;
    activeId.value = id;
    origin.value = { list, index: options.items[list].indexOf(id) };
    snapshot.value = cloneItems(options.items);
    options.announce(`Picked up ${options.itemName(id)}.`);
  }

  function over(_id: string, list: L, index: number) {
    if (!activeId.value) return;
    const from = listOf(options.items, activeId.value);
    if (!from) return;
    const reason = options.refuse?.(from, list, activeId.value) ?? null;
    refusal.value = reason ? { list, reason } : null;
    if (reason) return;
    const next = placeInList(options.items, activeId.value, list, index, options.lists);
    const place = where(next, activeId.value);
    if (place)
      options.announce(`Over ${place.place}, position ${place.position} of ${place.count}.`);
    options.onItemsChange(next);
  }

  function end() {
    const id = activeId.value;
    if (!id) return;
    const place = where(options.items, id);
    if (refusal.value) {
      const reason = refusal.value.reason;
      if (snapshot.value) options.onItemsChange(snapshot.value);
      options.announce(`${reason} Cancelled.`);
    } else if (place) {
      options.announce(
        `Dropped ${options.itemName(id)} in ${place.place}, position ${place.position}.`,
      );
    }
    activeId.value = null;
    snapshot.value = null;
    origin.value = null;
    refusal.value = null;
  }

  function cancel() {
    const id = activeId.value;
    if (!id) return;
    if (snapshot.value) options.onItemsChange(snapshot.value);
    options.announce(`Cancelled. ${options.itemName(id)} is back.`);
    activeId.value = null;
    snapshot.value = null;
    origin.value = null;
    refusal.value = null;
  }

  return {
    activeId: computed(() => activeId.value),
    cancel,
    end,
    origin: computed(() => origin.value),
    over,
    refusal: computed(() => refusal.value),
    start,
  };
}

export function useDragAnnouncer() {
  const message = ref("");
  let last = "";
  const announce = (text: string) => {
    if (!text || text === last) return;
    last = text;
    message.value = text;
  };
  return { announce, message };
}
