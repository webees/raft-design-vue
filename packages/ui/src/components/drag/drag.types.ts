export type DragLiftProps = {
  /** Classes for the copy, carrying the item's own radius. */
  class?: string;
  /** Inline style for the copy. */
  style?: string | Record<string, string | number>;
  /** Scroll whatever scrolls near the pointer's edge. @default true */
  autoScroll?: boolean;
  /** Where the copy renders; `null` renders it in place. */
  container?: Element | DocumentFragment | null;
  /** @default 999 */
  zIndex?: number;
};

export type DropPlaceholderProps = {
  /** Opaque `layer-canvas` under the wash, for a gap in a layout. */
  opaque?: boolean;
  /** The item's radius class. */
  radius?: string;
  class?: string;
};

export type DragRefusalHintProps = {
  /** Why the place under the hand won't take the item. */
  children: string;
  /** Render the hint in another element; the body by default. */
  container?: Element | DocumentFragment | null;
};

export type DragRemeasureProps = {
  /** Anything that changes when an item moves list. */
  version: unknown;
};
