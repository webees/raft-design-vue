import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ScrollArea from "./ScrollArea.vue";
import ScrollAreaTextarea from "./ScrollAreaTextarea.vue";
import { scrollAreaClassNames } from "./class-names";
import {
  overflows,
  pageDirection,
  pageDistance,
  thumbLength,
  thumbOffset,
  thumbPlacement,
} from "./scroll-geometry";
import { effectiveHideDelay } from "./use-scrollbars";

describe("scroll-area", () => {
  it("roots the scrolling container with its modifiers", () => {
    const wrapper = mount(ScrollArea, { slots: { default: "<p>content</p>" } });
    const area = wrapper.element as HTMLElement;

    expect(area.dataset.slot).toBe("scroll-area");
    expect(area.classList).toContain("r-scroll-area");
    expect(area.classList).toContain("r-scroll-area--medium");
    expect(area.classList).toContain("r-scroll-area--vertical-orientation");
    expect(area.classList).toContain("r-scroll-area--sticky-gutters");
    expect(area.classList).toContain("r-scroll-area--hover-trigger");
    expect(area.querySelector('[data-slot="scroll-area-gutters"]')).not.toBeNull();
    expect(wrapper.text()).toBe("content");
  });

  it("wraps the content when asked to, for the fade mask", () => {
    const wrapper = mount(ScrollArea, {
      props: { fade: true, contentClass: "gap-2" },
      slots: { default: "<p>content</p>" },
    });
    const content = wrapper.find('[data-slot="scroll-area-content"]');

    expect(content.classes()).toContain("r-scroll-area__content");
    expect(content.classes()).toContain("gap-2");
    expect((wrapper.element as HTMLElement).classList).toContain("r-scroll-area--fade");
  });

  it("renders a textarea with the overlay gutter layer", () => {
    const wrapper = mount(ScrollAreaTextarea, { props: { placeholder: "Write" } });
    const frame = wrapper.element as HTMLElement;
    const textarea = wrapper.find("textarea");

    expect(frame.dataset.slot).toBe("scroll-area-textarea");
    expect(frame.classList).toContain("r-scroll-area--textarea");
    expect(textarea.attributes("placeholder")).toBe("Write");
    expect(textarea.classes()).toContain("r-scroll-area__textarea");
    expect(frame.querySelector('[data-slot="scroll-area-gutters"]')).not.toBeNull();
  });

  it("composes the area classes from its state", () => {
    expect(
      scrollAreaClassNames({
        fade: true,
        guttersPosition: "absolute",
        orientation: "both",
        overscroll: "contain",
        rails: { xRail: true, yRail: true },
        size: "small",
        trigger: "scroll",
      }),
    ).toBe(
      [
        "r-scroll-area",
        "r-scroll-area--small",
        "r-scroll-area--both-orientation",
        "r-scroll-area--absolute-gutters",
        "r-scroll-area--scroll-trigger",
        "r-scroll-area--scrollable-y",
        "r-scroll-area--scrollable-x",
        "r-scroll-area--contain-overscroll-y",
        "r-scroll-area--contain-overscroll-x",
        "r-scroll-area--fade",
      ].join(" "),
    );
  });

  it("measures scroll thumb geometry", () => {
    const metrics = {
      clientHeight: 100,
      clientWidth: 100,
      scrollHeight: 400,
      scrollLeft: 0,
      scrollTop: 150,
      scrollWidth: 400,
    };
    const placement = thumbPlacement(metrics, "y");

    expect(placement).toEqual({ progress: 0.5, ratio: 0.25 });
    expect(thumbPlacement({ ...metrics, scrollHeight: 101 }, "y")).toBeNull();
    expect(thumbLength(0.25, 300, 24)).toBe(75);
    expect(thumbLength(0.01, 300, 24)).toBe(24);
    expect(thumbOffset(0.5, 300, 75)).toBe(112.5);
    expect(pageDistance(400)).toBe(350);
    expect(pageDirection(10, 20, 40)).toBe(-1);
    expect(pageDirection(30, 20, 40)).toBe(0);
    expect(pageDirection(50, 20, 40)).toBe(1);
    expect(overflows(2)).toBe(true);
    expect(overflows(1)).toBe(false);
  });

  it("keeps the scrollbar visible long enough to grab it", () => {
    expect(effectiveHideDelay("hover", 200)).toBe(200);
    expect(effectiveHideDelay("scroll", 20)).toBe(100);
    expect(effectiveHideDelay("scroll", 400)).toBe(400);
  });
});
