import { cn } from "../../lib/cn";
import type { ScrollAreaState } from "./types";

/**
 * The area's classes. The ones that change while scrolling (`--rtl`,
 * `--overflow-{y,x}-{start,end}`) are not rendered: `useScrollbars` sets them
 * on the element, so scrolling never renders.
 */
export function scrollAreaClassNames(state: ScrollAreaState): string {
  const { rails } = state;
  return cn(
    "r-scroll-area",
    `r-scroll-area--${state.size}`,
    `r-scroll-area--${state.orientation}-orientation`,
    `r-scroll-area--${state.guttersPosition}-gutters`,
    `r-scroll-area--${state.trigger}-trigger`,
    rails.yRail && "r-scroll-area--scrollable-y",
    rails.xRail && "r-scroll-area--scrollable-x",
    state.overscroll !== "auto" && rails.yRail && `r-scroll-area--${state.overscroll}-overscroll-y`,
    state.overscroll !== "auto" && rails.xRail && `r-scroll-area--${state.overscroll}-overscroll-x`,
    state.fade && "r-scroll-area--fade",
  );
}
