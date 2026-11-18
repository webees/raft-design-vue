import type { Component, CSSProperties, VNodeChild } from "vue";

export interface VirtualListColumn {
  width: number;
}

export interface VirtualListRenderColInfo {
  column: VirtualListColumn | undefined;
  left: number;
  item: unknown;
  key: number;
}

export interface VirtualListRenderItemWithColsInfo {
  itemIndex: number | undefined;
  startColIndex: number;
  endColIndex: number;
  allColumns: readonly VirtualListColumn[];
  item: unknown;
  getLeft: (index: number) => number;
}

export type VirtualListMeasuredRef = (el: Element | null) => void;

export interface VirtualListItemRenderProps<T> {
  domRef: VirtualListMeasuredRef | null;
  item: T;
  index: number | undefined;
  renderedCols: VNodeChild | undefined;
  renderedItemWithCols: VNodeChild | undefined;
  style: CSSProperties | undefined;
}

export type VirtualListScrollAlign = "start" | "center" | "end";
export type VirtualListScrollPosition = "top" | "bottom";

export type VirtualListRenderReason =
  | "sessionChanged"
  | "itemsChanged"
  | "listScroll"
  | "batchItemResize"
  | "listResize";

export interface VirtualListRenderAnomaly {
  type: "renderThrashing";
  message: string;
  payload: {
    renderCount: number;
    windowMs: number;
    triggerReason: VirtualListRenderReason;
    itemCount: number;
  };
}

export interface VirtualListScrollToOptions {
  left?: number;
  top?: number;
  index?: number;
  key?: string;
  position?: VirtualListScrollPosition;
  behavior?: ScrollBehavior;
  debounce?: boolean;
  scrollMarginTop?: number;
  scrollMarginBottom?: number;
  align?: VirtualListScrollAlign;
}

export interface VirtualListApi {
  listElRef: { value: HTMLDivElement | null };
  itemsElRef: { value: HTMLDivElement | null };
  scrollTo: (options: VirtualListScrollToOptions | number, topIfNumber?: number) => void;
  syncViewport: () => void;
  getOffsetTopOfKey: (key: string) => number | undefined;
  submitScrollAdjustingTask: (task: () => void) => void;
  refreshListWidth: () => void;
}

export type VirtualListFooterRender = (props: { domRef: VirtualListMeasuredRef }) => VNodeChild;

export interface VirtualListProps<T> {
  virtual?: boolean;
  sessionId?: string;
  showScrollbar?: boolean;
  columns?: readonly VirtualListColumn[];
  renderCol?: (info: VirtualListRenderColInfo) => VNodeChild;
  renderItemWithCols?: (info: VirtualListRenderItemWithColsInfo) => VNodeChild;
  items?: readonly T[];
  getKey: (item: T) => string;
  itemEstimatedSize?: number;
  itemMinSize?: number;
  itemResizable?: boolean;
  itemsStyle?: CSSProperties;
  visibleItemsTag?: string | Component;
  visibleItemsProps?: Record<string, unknown>;
  ignoreItemResize?: boolean;
  onScroll?: (event: Event) => void;
  onWheel?: (event: WheelEvent) => void;
  onResize?: (entry: ResizeObserverEntry) => void;
  defaultScrollKey?: string;
  defaultScrollIndex?: number;
  paddingTop?: number;
  paddingBottom?: number;
  children?: (props: VirtualListItemRenderProps<T> & { key: string | undefined }) => VNodeChild;
  ItemComponent?: Component;
  empty?: VNodeChild | VirtualListFooterRender;
  emptyAlign?: "start" | "center";
  class?: string;
  style?: CSSProperties;
  itemsClassName?: string;
  footer?: VNodeChild | VirtualListFooterRender;
  footerAfterBottomPadding?: VNodeChild;
  header?: VNodeChild;
  domRef?: { value: HTMLDivElement | null };
  onContentResize?: () => void;
  onTransformChange?: () => void;
  componentRef?: { value: VirtualListApi | undefined };
  printable?: boolean;
  catchWheel?: boolean;
  keyboardPageBottomOcclusion?: number;
  focusable?: boolean;
  onRenderAnomaly?: (anomaly: VirtualListRenderAnomaly) => void;
  keepAnchorOnItemsChange?: boolean;
  canAnchorItem?: (item: T) => boolean;
}
