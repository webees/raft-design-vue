export interface OrderedTabItem<Id extends string = string> {
  id: Id;
}

/**
 * Items in the stored order, then whatever is new in source order: a stale
 * stored order never hides a tab, and a reorder survives a tab being added.
 */
export function reconcileTabOrder<T extends OrderedTabItem<string>>(
  items: readonly T[],
  order: readonly string[],
): T[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const seen = new Set<string>();
  const next: T[] = [];

  for (const id of order) {
    const item = byId.get(id);
    if (!item || seen.has(item.id)) continue;
    next.push(item);
    seen.add(item.id);
  }
  for (const item of items) {
    if (seen.has(item.id)) continue;
    next.push(item);
    seen.add(item.id);
  }
  return next;
}

export function useOrderedTabs<T extends OrderedTabItem<string>>(
  items: () => readonly T[],
  order: () => readonly string[],
) {
  return () => reconcileTabOrder(items(), order());
}
