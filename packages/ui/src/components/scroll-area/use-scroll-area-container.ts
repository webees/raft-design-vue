import { computed, ref, type CSSProperties, type Ref } from "vue";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import { scrollAreaClassNames } from "./class-names";
import { scrollToElement } from "./scroll-to-element";
import type {
  ScrollAreaActions,
  ScrollAreaGuttersPosition,
  ScrollAreaOrientation,
  ScrollAreaOverscroll,
  ScrollAreaScrollToElementOptions,
  ScrollAreaSize,
  ScrollAreaTrigger,
} from "./types";
import { effectiveHideDelay, scrollAreaContainerClassName, useScrollbars } from "./use-scrollbars";

const railInsetEdges = ["top", "bottom", "left", "right"] as const;
let timelineIds = 0;

function rootStyle(
  timelines: string,
  railInset: Partial<Record<(typeof railInsetEdges)[number], number | undefined>>,
): CSSProperties {
  const vars: Record<string, string> = {
    "--r-scroll-area-timeline-x": `--r-scroll-area-x-${timelines}`,
    "--r-scroll-area-timeline-y": `--r-scroll-area-y-${timelines}`,
  };
  for (const edge of railInsetEdges) {
    const value = railInset[edge];
    if (value !== undefined) vars[`--r-scroll-area-rail-inset-${edge}`] = `${value}px`;
  }
  return vars as CSSProperties;
}

export type ScrollAreaContainerOptions = {
  actionsRef?: Ref<ScrollAreaActions | null>;
  containerRef?: Ref<HTMLElement | null>;
  contentRef?: Ref<HTMLElement | null>;
  fadeRef?: Ref<HTMLElement | null>;
  frameRef?: Ref<HTMLElement | null>;
  guttersRef?: Ref<HTMLElement | null>;
  fade?: boolean;
  guttersPosition?: ScrollAreaGuttersPosition;
  hideDelay?: number;
  onEdgeChange?: (edges: import("./types").ScrollAreaEdges) => void;
  orientation?: ScrollAreaOrientation;
  overscroll?: ScrollAreaOverscroll;
  railInset?: Partial<Record<(typeof railInsetEdges)[number], number>>;
  size?: ScrollAreaSize;
  trigger?: ScrollAreaTrigger;
};

/**
 * ScrollArea's scrollbars for an element you render yourself. It measures
 * the element that scrolls (the container), listens to its scroll, and keeps
 * the state; you render the elements.
 */
export function useScrollAreaContainer(options: ScrollAreaContainerOptions = {}) {
  const {
    actionsRef,
    fade = false,
    guttersPosition = "sticky",
    hideDelay = 600,
    onEdgeChange,
    orientation = "vertical",
    overscroll = "none",
    railInset,
    size = "medium",
    trigger = "hover",
  } = options;

  const sticky = guttersPosition === "sticky";
  const containerRef = options.containerRef ?? ref<HTMLElement | null>(null);
  const frameRef = options.frameRef ?? ref<HTMLElement | null>(null);
  const guttersRef = options.guttersRef ?? ref<HTMLElement | null>(null);
  const contentRef = options.contentRef ?? ref<HTMLElement | null>(null);
  const fadeRef = options.fadeRef ?? ref<HTMLElement | null>(null);
  const timelines = `${timelineIds++}`;

  const bars = useScrollbars({
    containerRef,
    contentRef,
    fadeRef,
    guttersPosition,
    guttersRef,
    hideDelay: effectiveHideDelay(trigger, hideDelay),
    onEdgeChange,
    orientation,
    rootRef: sticky ? containerRef : frameRef,
    trigger,
  });

  const insetTop = railInset?.top;
  const insetBottom = railInset?.bottom;
  const insetLeft = railInset?.left;
  const insetRight = railInset?.right;

  const blockStyle = computed(() =>
    rootStyle(timelines, {
      bottom: insetBottom,
      left: insetLeft,
      right: insetRight,
      top: insetTop,
    }),
  );

  const blockClassName = computed(() =>
    scrollAreaClassNames({
      fade,
      guttersPosition,
      orientation,
      overscroll,
      rails: bars.rails,
      size,
      trigger,
    }),
  );

  const scroller = computed(() => cn(sticky ? blockClassName.value : scrollAreaContainerClassName));

  const binding = {
    containerRef,
    rails: bars.rails,
    setDragging: bars.setDragging,
    setGuttersRef: bars.setGuttersRef,
    setXThumbRef: bars.setXThumbRef,
    setYThumbRef: bars.setYThumbRef,
  };

  const setContainer = (element: unknown) => {
    containerRef.value = toElement(element);
  };

  const scrollTo = (element: Element, scrollOptions?: ScrollAreaScrollToElementOptions) => {
    const container = containerRef.value;
    if (container) scrollToElement(container, element, orientation, scrollOptions);
  };

  const measure = () => bars.measure(true);

  if (actionsRef) actionsRef.value = { measure, scrollToElement: scrollTo };

  return {
    binding,
    blockClassName,
    blockStyle,
    containerRef,
    contentRef,
    fadeRef,
    frameRef,
    guttersPosition,
    guttersRef,
    measure,
    orientation,
    rails: bars.rails,
    scrollToElement: scrollTo,
    scrollable: bars.scrollable,
    scroller,
    setContainer,
    setDragging: bars.setDragging,
    setGuttersRef: bars.setGuttersRef,
    setXThumbRef: bars.setXThumbRef,
    setYThumbRef: bars.setYThumbRef,
    xThumbRef: bars.xThumbRef,
    yThumbRef: bars.yThumbRef,
  };
}
