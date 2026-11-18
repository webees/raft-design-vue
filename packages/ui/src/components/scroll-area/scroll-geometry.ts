/** What the scrollbars need to know about the scroll container, in px. */
export type ScrollMetrics = {
  clientHeight: number;
  clientWidth: number;
  scrollHeight: number;
  scrollWidth: number;
  scrollLeft: number;
  scrollTop: number;
};

export type ScrollAxis = "x" | "y";

export type ScrollPlacement = {
  /** How far the content is scrolled, from 0 at the start to 1 at the end. */
  progress: number;
  /** The visible share of the scrolled content, from 0 to 1. */
  ratio: number;
};

/** Where a thumb goes, or `null` when the axis has nothing to scroll. */
export function thumbPlacement(metrics: ScrollMetrics, axis: ScrollAxis): ScrollPlacement | null {
  const client = axis === "y" ? metrics.clientHeight : metrics.clientWidth;
  const scroll = axis === "y" ? metrics.scrollHeight : metrics.scrollWidth;
  const offset = axis === "y" ? metrics.scrollTop : metrics.scrollLeft;
  const overflow = scroll - client;
  if (client <= 0 || overflow <= 1) return null;
  return {
    progress: Math.min(1, Math.max(0, offset / overflow)),
    ratio: client / scroll,
  };
}

/** The thumb's length in px, but no shorter than the minimum. */
export function thumbLength(ratio: number, rail: number, minLength: number): number {
  return Math.max(minLength, rail * ratio);
}

/** Where the thumb starts along its rail, in px. */
export function thumbOffset(progress: number, rail: number, length: number): number {
  return Math.max(0, rail - length) * progress;
}

/** How many px are left to scroll past each edge; 0 on an axis that doesn't scroll. */
export type ScrollOverflow = {
  yStart: number;
  yEnd: number;
  /** The inline start: the left edge, or the right one in right-to-left layouts. */
  xStart: number;
  xEnd: number;
};

/** The scrolling distance left before the start and after the end of each axis. */
export function scrollOverflow(
  metrics: ScrollMetrics,
  axes: { x: boolean; y: boolean },
): ScrollOverflow {
  const [yStart, yEnd] = axes.y
    ? remaining(metrics.scrollTop, metrics.scrollHeight - metrics.clientHeight)
    : [0, 0];
  const [xStart, xEnd] = axes.x
    ? remaining(metrics.scrollLeft, metrics.scrollWidth - metrics.clientWidth)
    : [0, 0];
  return { xEnd, xStart, yEnd, yStart };
}

function remaining(offset: number, overflow: number): [start: number, end: number] {
  const start = Math.min(overflow, Math.max(0, offset));
  return [start, overflow - start];
}

/** Whether a remaining distance is enough to show an edge. */
export function overflows(remaining: number): boolean {
  return remaining > 1;
}

/** How far one page of the rail scrolls: a viewport, less a line of context at each side. */
export function pageDistance(client: number): number {
  return Math.round(client * 0.875);
}

/** Which way a rail click pages: before the thumb (-1), after it (1), or on it (0). */
export function pageDirection(pointer: number, thumbStart: number, thumbEnd: number): -1 | 0 | 1 {
  if (pointer < thumbStart) return -1;
  if (pointer > thumbEnd) return 1;
  return 0;
}

export function px(value: number): string {
  return `${value}px`;
}

/** Two decimals is enough for a device pixel, and keeps the style strings stable. */
export function snap(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Sets a style property unless it already has that value, so an unchanged frame touches no style. */
export function writeVar(element: HTMLElement, name: string, value: string) {
  if (element.style.getPropertyValue(name) !== value) {
    element.style.setProperty(name, value);
  }
}
