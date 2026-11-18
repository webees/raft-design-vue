import type { CSSProperties, HTMLAttributes, Ref } from "vue";

export type ScrollAreaEdges = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type ScrollAreaTrigger = "hover" | "scroll" | "none";

export type ScrollAreaSize = "small" | "medium";

/** The directions the area scrolls in, each with its own scrollbar. */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

/** Where the gutters sit: inside the scrolling container, or beside it in a frame. */
export type ScrollAreaGuttersPosition = "sticky" | "absolute";

/**
 * What a scroll does at its end: `none` stops it, `contain` keeps the scroll in the area but
 * lets Mac trackpads and iOS bounce the area; `auto` carries on to the page behind.
 */
export type ScrollAreaOverscroll = "none" | "contain" | "auto";

export type ScrollAreaActions = {
  measure: () => void;
  scrollToElement: (element: Element, options?: ScrollAreaScrollToElementOptions) => void;
};

export type ScrollAreaScrollToElementOptions = {
  block?: "start" | "center" | "end" | "nearest";
  offset?: number;
  behavior?: ScrollBehavior;
};

export type ScrollAreaState = {
  fade: boolean;
  guttersPosition: ScrollAreaGuttersPosition;
  orientation: ScrollAreaOrientation;
  overscroll: ScrollAreaOverscroll;
  rails: { xRail: boolean; yRail: boolean };
  size: ScrollAreaSize;
  trigger: ScrollAreaTrigger;
};

export type ScrollAreaOptions = {
  actionsRef?: { value: ScrollAreaActions | null };
  fade?: boolean;
  hideDelay?: number;
  onEdgeChange?: (edges: ScrollAreaEdges) => void;
  onScroll?: (event: Event) => void;
  orientation?: ScrollAreaOrientation;
  overscroll?: ScrollAreaOverscroll;
  railInset?: ScrollAreaRailInset;
  size?: ScrollAreaSize;
  trigger?: ScrollAreaTrigger;
};

/** Inset of the scrollbars from the frame's edges. */
export type ScrollAreaRailInset = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

/** The props the hook puts on the scrolling element. */
export type ScrollAreaContainerProps = {
  class?: unknown;
  style?: CSSProperties;
  tabindex?: number;
  onScroll?: (event: Event) => void;
};

/** The props the hook puts on a frame with absolute gutters. */
export type ScrollAreaFrameProps = {
  class?: unknown;
  style?: CSSProperties;
};

export type ScrollAreaOwnProps = ScrollAreaOptions & {
  class?: unknown;
  contentClass?: unknown;
  contentStyle?: CSSProperties;
  style?: CSSProperties;
  tabIndex?: number;
  as?: string;
};

export type ScrollAreaProps = ScrollAreaOwnProps;

export type ScrollAreaTextareaOwnProps = ScrollAreaOptions & {
  class?: unknown;
  frameClass?: unknown;
  modelValue?: string;
  mirrorClass?: unknown;
  wrapperClass?: unknown;
};

export type ScrollAreaTextareaProps = ScrollAreaTextareaOwnProps &
  Omit<HTMLAttributes, keyof ScrollAreaTextareaOwnProps>;

export type ScrollAreaContainerOptions = ScrollAreaOptions & {
  containerRef?: Ref<HTMLElement | null>;
  contentRef?: Ref<HTMLElement | null>;
  fadeRef?: Ref<HTMLElement | null>;
  frameRef?: Ref<HTMLElement | null>;
  guttersPosition?: ScrollAreaGuttersPosition;
};
