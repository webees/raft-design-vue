import { onBeforeUnmount, reactive, ref, watch, type Ref } from "vue";

import type {
  ScrollAreaEdges,
  ScrollAreaGuttersPosition,
  ScrollAreaOrientation,
  ScrollAreaTrigger,
} from "./types";
import {
  overflows,
  px,
  scrollOverflow,
  snap,
  thumbLength,
  thumbOffset,
  thumbPlacement,
  writeVar,
  type ScrollMetrics,
} from "./scroll-geometry";

type ScrollRails = {
  xRail: boolean;
  yRail: boolean;
};

type LogicalEdges = {
  xStart: boolean;
  xEnd: boolean;
  yStart: boolean;
  yEnd: boolean;
};

type Layout = {
  clientHeight: number;
  clientWidth: number;
  scrollHeight: number;
  scrollWidth: number;
  railX: number;
  railY: number;
  minLength: number;
};

type ScrollbarsOptions = {
  containerRef: Ref<HTMLElement | null>;
  contentRef?: Ref<HTMLElement | null>;
  fadeRef?: Ref<HTMLElement | null>;
  guttersPosition: ScrollAreaGuttersPosition;
  rootRef: Ref<HTMLElement | null>;
  guttersRef: Ref<HTMLElement | null>;
  orientation: ScrollAreaOrientation;
  hideDelay: number;
  trigger: ScrollAreaTrigger;
  fade?: boolean;
  onEdgeChange?: (edges: ScrollAreaEdges) => void;
};

const noEdges: LogicalEdges = {
  xStart: false,
  xEnd: false,
  yStart: false,
  yEnd: false,
};

const defaultMinThumbLength = 24;
const minScrollTriggerHideDelay = 100;

/** The container class when the gutters are outside it (the frame carries the root's classes). */
export const scrollAreaContainerClassName = "r-scroll-area__container";

function physicalEdges(edges: LogicalEdges, rtl: boolean): ScrollAreaEdges {
  return {
    bottom: !edges.yEnd,
    left: !(rtl ? edges.xEnd : edges.xStart),
    right: !(rtl ? edges.xStart : edges.xEnd),
    top: !edges.yStart,
  };
}

/** The `hideDelay` actually used: at least `minScrollTriggerHideDelay` when `trigger="scroll"`. */
export function effectiveHideDelay(trigger: ScrollAreaTrigger, hideDelay: number): number {
  return trigger === "scroll" ? Math.max(hideDelay, minScrollTriggerHideDelay) : hideDelay;
}

const stickyScrollTimelineCondition = "(animation-timeline: scroll())";
const scrollTimelineCondition = "(animation-timeline: scroll()) and (timeline-scope: none)";

function supportsScrollTimeline(position: ScrollAreaGuttersPosition = "absolute"): boolean {
  return (
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports(position === "sticky" ? stickyScrollTimelineCondition : scrollTimelineCondition)
  );
}

/**
 * Whether the CSS animates the thumbs from the container's timeline, so the script only sizes them.
 */
function timelineDrives(
  container: HTMLElement,
  root: HTMLElement,
  gutters: HTMLElement | null,
  position: ScrollAreaGuttersPosition,
): boolean {
  if (!supportsScrollTimeline(position) || gutters === null) return false;
  if (position === "sticky") {
    return (
      container === root &&
      root.classList.contains("r-scroll-area--sticky-gutters") &&
      gutters.parentElement === root
    );
  }
  return (
    root.classList.contains("r-scroll-area--absolute-gutters") &&
    container.parentElement === root &&
    container.classList.contains(scrollAreaContainerClassName) &&
    gutters.parentElement === root &&
    (container.compareDocumentPosition(gutters) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
  );
}

/**
 * Scrollbars for a container: measures it, draws the thumbs and reports the
 * edges. Native scrolling does the scrolling; the thumbs only reflect it.
 */
export function useScrollbars(options: ScrollbarsOptions) {
  const rails = reactive<ScrollRails>({ xRail: false, yRail: false });
  const xThumbRef = ref<HTMLElement | null>(null);
  const yThumbRef = ref<HTMLElement | null>(null);

  const layout: Layout = {
    clientHeight: 0,
    clientWidth: 0,
    minLength: defaultMinThumbLength,
    railX: 0,
    railY: 0,
    scrollHeight: 0,
    scrollWidth: 0,
  };

  const state = {
    edges: { ...noEdges } as LogicalEdges,
    rtl: false,
    scrolling: false,
    dragging: false,
    timeline: false,
    frame: 0,
    frameMeasures: false,
    idleTimer: 0 as ReturnType<typeof setTimeout> | 0,
    unbind: null as (() => void) | null,
  };

  const setRails = (next: ScrollRails) => {
    if (rails.xRail === next.xRail && rails.yRail === next.yRail) return;
    rails.xRail = next.xRail;
    rails.yRail = next.yRail;
  };

  const applyClasses = () => {
    const root = options.rootRef.value;
    if (!root) return;
    const list = root.classList;
    list.toggle("r-scroll-area--rtl", state.rtl);
    list.toggle("r-scroll-area--overflow-y-start", state.edges.yStart);
    list.toggle("r-scroll-area--overflow-y-end", state.edges.yEnd);
    list.toggle("r-scroll-area--overflow-x-start", state.edges.xStart);
    list.toggle("r-scroll-area--overflow-x-end", state.edges.xEnd);
    const gutters = options.guttersRef.value?.classList;
    gutters?.toggle("r-scroll-area__gutters--scrolling", state.scrolling);
    gutters?.toggle("r-scroll-area__gutters--dragging", state.dragging);
  };

  let remeasure = () => measure(true);

  const draw = () => {
    const container = options.containerRef.value;
    const root = options.rootRef.value;
    if (!container || !root) return;

    const scrollTop = container.scrollTop;
    const scrollLeft = Math.abs(container.scrollLeft);
    layout.scrollHeight = container.scrollHeight;
    layout.scrollWidth = container.scrollWidth;
    const metrics: ScrollMetrics = { ...layout, scrollLeft, scrollTop };

    for (const axis of ["y", "x"] as const) {
      const element = axis === "y" ? yThumbRef.value : xThumbRef.value;
      const placement = rails[axis === "y" ? "yRail" : "xRail"]
        ? thumbPlacement(metrics, axis)
        : null;
      if (!element || !placement) continue;
      const rail = axis === "y" ? layout.railY : layout.railX;
      const length = snap(thumbLength(placement.ratio, rail, layout.minLength));
      const sign = axis === "x" && state.rtl ? -1 : 1;
      if (state.timeline) {
        writeVar(element, "--r-scroll-area-thumb-length", px(length));
        writeVar(element, "--r-scroll-area-thumb-travel", px(sign * Math.max(0, rail - length)));
        continue;
      }
      const at = sign * snap(thumbOffset(placement.progress, rail, length));
      writeVar(
        element,
        "transform",
        axis === "y" ? `translate3d(0px, ${px(at)}, 0px)` : `translate3d(${px(at)}, 0px, 0px)`,
      );
    }

    const overflow = scrollOverflow(metrics, {
      x: rails.xRail && thumbPlacement(metrics, "x") !== null,
      y: rails.yRail && thumbPlacement(metrics, "y") !== null,
    });
    const masked = !options.fade
      ? null
      : options.guttersPosition === "absolute"
        ? container
        : options.fadeRef?.value;
    if (masked) {
      writeVar(masked, "--r-scroll-area-overflow-y-start", px(overflow.yStart));
      writeVar(masked, "--r-scroll-area-overflow-y-end", px(overflow.yEnd));
      writeVar(masked, "--r-scroll-area-overflow-x-start", px(overflow.xStart));
      writeVar(masked, "--r-scroll-area-overflow-x-end", px(overflow.xEnd));
    }

    const next: LogicalEdges = {
      xEnd: overflows(overflow.xEnd),
      xStart: overflows(overflow.xStart),
      yEnd: overflows(overflow.yEnd),
      yStart: overflows(overflow.yStart),
    };
    const previous = state.edges;
    if (
      previous.yStart === next.yStart &&
      previous.yEnd === next.yEnd &&
      previous.xStart === next.xStart &&
      previous.xEnd === next.xEnd
    ) {
      return;
    }
    state.edges = next;
    applyClasses();
    if (!options.onEdgeChange) return;
    const edges = physicalEdges(next, state.rtl);
    const before = physicalEdges(previous, state.rtl);
    if (
      edges.top !== before.top ||
      edges.bottom !== before.bottom ||
      edges.left !== before.left ||
      edges.right !== before.right
    ) {
      options.onEdgeChange(edges);
    }
  };

  const measure = (layoutMode = false) => {
    const container = options.containerRef.value;
    const root = options.rootRef.value;
    if (!container || !root) return;
    const axes = options.orientation;
    const gutters = options.guttersRef.value;

    if (layoutMode) {
      const style = getComputedStyle(container);
      state.rtl = axes !== "vertical" && style.direction === "rtl";
      if (gutters && options.guttersPosition === "sticky") {
        writeVar(gutters, "--r-scroll-area-padding-top", style.paddingTop || "0px");
        writeVar(gutters, "--r-scroll-area-padding-left", style.paddingLeft || "0px");
        writeVar(gutters, "--r-scroll-area-padding-right", style.paddingRight || "0px");
      }
      state.timeline = timelineDrives(container, root, gutters, options.guttersPosition);
      const min = Number.parseFloat(
        getComputedStyle(root).getPropertyValue("--r-scroll-area-thumb-min-length"),
      );
      layout.minLength = Number.isFinite(min) ? min : defaultMinThumbLength;
    }

    layout.clientHeight = container.clientHeight;
    layout.clientWidth = container.clientWidth;
    layout.scrollHeight = container.scrollHeight;
    layout.scrollWidth = container.scrollWidth;

    if (options.guttersPosition === "sticky") {
      const height = px(layout.clientHeight);
      if (gutters) writeVar(gutters, "--r-scroll-area-viewport-height", height);
      const masked = options.fade ? options.fadeRef?.value : null;
      if (masked) {
        writeVar(masked, "--r-scroll-area-viewport-height", height);
        writeVar(masked, "--r-scroll-area-viewport-width", px(layout.clientWidth));
      }
    }

    const sizes: ScrollMetrics = { ...layout, scrollLeft: 0, scrollTop: 0 };
    const next: ScrollRails = {
      xRail: axes !== "vertical" && thumbPlacement(sizes, "x") !== null,
      yRail: axes !== "horizontal" && thumbPlacement(sizes, "y") !== null,
    };
    const yRail = yThumbRef.value?.parentElement;
    const xRail = xThumbRef.value?.parentElement;
    layout.railY = next.yRail && yRail ? yRail.clientHeight : 0;
    layout.railX = next.xRail && xRail ? xRail.clientWidth : 0;
    setRails(next);
    applyClasses();
    draw();
  };

  const scheduleFrame = (layoutMode = false) => {
    if (layoutMode) state.frameMeasures = true;
    if (state.frame !== 0) return;
    const run = () => {
      state.frame = 0;
      if (state.frameMeasures) {
        state.frameMeasures = false;
        remeasure();
        return;
      }
      draw();
    };
    if (typeof requestAnimationFrame !== "function") {
      run();
      return;
    }
    state.frame = requestAnimationFrame(run);
  };
  remeasure = () => measure(true);

  const handleScroll = () => {
    state.scrolling = true;
    applyClasses();
    scheduleFrame(false);
    if (state.idleTimer) clearTimeout(state.idleTimer);
    state.idleTimer = setTimeout(
      () => {
        state.scrolling = false;
        applyClasses();
      },
      effectiveHideDelay(options.trigger, options.hideDelay),
    );
  };

  const bind = (container: HTMLElement) => {
    container.addEventListener("scroll", handleScroll, { passive: true });

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => scheduleFrame(true));
    const observed = new Set<Element>();
    const observe = (element: Element | null | undefined) => {
      if (!element || observed.has(element)) return;
      observed.add(element);
      observer?.observe(element);
    };
    const observeChildren = () => {
      const content = options.contentRef?.value;
      if (content) {
        observe(content);
        return;
      }
      for (const child of Array.from(container.children)) observe(child);
    };
    observe(container);
    observeChildren();
    observe(yThumbRef.value?.parentElement);
    observe(xThumbRef.value?.parentElement);

    const mutations =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => {
            observeChildren();
            scheduleFrame(true);
          });
    mutations?.observe(container, { childList: true });

    if (!observer) scheduleFrame(true);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      mutations?.disconnect();
      if (state.idleTimer) clearTimeout(state.idleTimer);
      if (state.frame) cancelAnimationFrame(state.frame);
    };
  };

  const rebind = () => {
    const container = options.containerRef.value;
    state.unbind?.();
    state.unbind = container ? bind(container) : null;
  };

  watch(
    () => [
      options.containerRef.value,
      options.contentRef?.value,
      options.rootRef.value,
      options.orientation,
      options.hideDelay,
    ],
    () => {
      rebind();
      measure(true);
    },
    { flush: "post" },
  );

  watch(
    () => [rails.xRail, rails.yRail],
    () => scheduleFrame(true),
    { flush: "post" },
  );

  const setDragging = (dragging: boolean) => {
    state.dragging = dragging;
    applyClasses();
  };

  onBeforeUnmount(() => {
    state.unbind?.();
    state.unbind = null;
    if (state.frame) cancelAnimationFrame(state.frame);
    if (state.idleTimer) clearTimeout(state.idleTimer);
    state.frame = 0;
    state.idleTimer = 0;
  });

  return {
    setGuttersRef: (element: HTMLElement | null) => {
      options.guttersRef.value = element;
    },
    setXThumbRef: (element: HTMLElement | null) => {
      xThumbRef.value = element;
    },
    setYThumbRef: (element: HTMLElement | null) => {
      yThumbRef.value = element;
    },
    measure,
    rails,
    rebind,
    scheduleFrame,
    scrollable: () => rails.xRail || rails.yRail,
    setDragging,
    xThumbRef,
    yThumbRef,
  };
}
