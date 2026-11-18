export { default as ScrollArea } from "./ScrollArea.vue";
export { default as ScrollAreaContent } from "./ScrollAreaContent.vue";
export { default as ScrollAreaGutters } from "./ScrollAreaGutters.vue";
export { default as ScrollAreaTextarea } from "./ScrollAreaTextarea.vue";
export { scrollAreaClassNames } from "./class-names";
export { effectiveHideDelay, scrollAreaContainerClassName } from "./use-scrollbars";
export { useScrollAreaContainer } from "./use-scroll-area-container";
export { scrollToElement } from "./scroll-to-element";
export {
  overflows,
  pageDirection,
  pageDistance,
  scrollOverflow,
  thumbLength,
  thumbOffset,
  thumbPlacement,
} from "./scroll-geometry";
export type {
  ScrollAreaActions,
  ScrollAreaContainerOptions,
  ScrollAreaContainerProps,
  ScrollAreaEdges,
  ScrollAreaFrameProps,
  ScrollAreaGuttersPosition,
  ScrollAreaOrientation,
  ScrollAreaOverscroll,
  ScrollAreaOptions,
  ScrollAreaOwnProps,
  ScrollAreaProps,
  ScrollAreaRailInset,
  ScrollAreaScrollToElementOptions,
  ScrollAreaSize,
  ScrollAreaTextareaOwnProps,
  ScrollAreaTextareaProps,
  ScrollAreaTrigger,
} from "./types";
export type { ScrollAreaGuttersBinding } from "./ScrollAreaGutters.vue";
export type ScrollAreaContainer = ReturnType<
  typeof import("./use-scroll-area-container").useScrollAreaContainer
>;
