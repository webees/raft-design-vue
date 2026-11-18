export type CommentMarginLayoutItem = {
  id: string;
  top: number;
  height: number;
};

export type CommentMarginLayoutOptions = {
  gap?: number;
  activeId?: string | null;
};

export type CommentMarginLayout = {
  tops: Record<string, number>;
  height: number;
};

export function resolveCommentMarginLayout(
  items: readonly CommentMarginLayoutItem[],
  { gap = 8, activeId = null }: CommentMarginLayoutOptions = {},
): CommentMarginLayout {
  const order = items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => a.item.top - b.item.top || a.index - b.index)
    .map(({ item }) => item);
  const tops = order.map((item) => item.top);

  const stackDown = (from: number, floor: number) => {
    let next = floor;
    for (let i = from; i < order.length; i += 1) {
      tops[i] = Math.max(order[i]!.top, next);
      next = tops[i]! + order[i]!.height + gap;
    }
  };

  const pinned = activeId == null ? -1 : order.findIndex((item) => item.id === activeId);
  if (pinned < 0) {
    stackDown(0, 0);
  } else {
    tops[pinned] = Math.max(order[pinned]!.top, 0);
    for (let i = pinned - 1; i >= 0; i -= 1) {
      tops[i] = Math.min(order[i]!.top, tops[i + 1]! - gap - order[i]!.height);
    }
    if (pinned > 0 && tops[0]! < 0) {
      stackDown(0, 0);
    } else {
      stackDown(pinned + 1, tops[pinned]! + order[pinned]!.height + gap);
    }
  }

  const result: Record<string, number> = {};
  let height = 0;
  order.forEach((item, i) => {
    result[item.id] = tops[i]!;
    height = Math.max(height, tops[i]! + item.height);
  });
  return { tops: result, height };
}
