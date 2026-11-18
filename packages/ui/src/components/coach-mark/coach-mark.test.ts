import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import CoachMark from "./CoachMark.vue";
import CoachMarkContent from "./CoachMarkContent.vue";
import CoachMarkCount from "./CoachMarkCount.vue";

const anchors: HTMLElement[] = [];

function anchor() {
  const element = document.createElement("button");
  document.body.appendChild(element);
  anchors.push(element);
  return element;
}

afterEach(() => {
  for (const element of anchors.splice(0)) element.remove();
});

describe("CoachMark", () => {
  it("holds the Located wash for the stop and restores it on teardown", async () => {
    const target = anchor();
    target.setAttribute("data-located", "flash");
    const wrapper = mount(CoachMark, {
      props: { anchor: target },
      slots: { default: () => "Tour" },
      attachTo: document.body,
    });
    await nextTick();
    expect(target.getAttribute("data-located")).toBe("held");
    wrapper.unmount();
    expect(target.getAttribute("data-located")).toBe("flash");
  });

  it("marks the content slot inside the provider", async () => {
    const wrapper = mount(CoachMark, {
      props: { anchor: anchor() },
      slots: { default: () => h(CoachMarkContent, null, () => "Body") },
      attachTo: document.body,
    });
    await nextTick();
    expect(document.querySelector("[data-slot=coach-mark-content]")?.textContent).toContain("Body");
    wrapper.unmount();
  });

  it("renders the stop count from its children", () => {
    const wrapper = mount(CoachMarkCount, { slots: { default: "2 of 6" } });
    expect(wrapper.text()).toBe("2 of 6");
    expect(wrapper.classes()).toContain("me-auto");
  });
});
