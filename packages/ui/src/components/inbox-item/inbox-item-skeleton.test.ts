import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import InboxItemSkeleton from "./InboxItemSkeleton.vue";
import InboxItemSkeletonList from "./InboxItemSkeletonList.vue";

describe("InboxItemSkeleton", () => {
  it("is built from the real InboxItem parts", () => {
    const wrapper = mount(InboxItemSkeleton, { props: { leading: true, context: true } });
    const root = wrapper.find("[data-slot=inbox-item]");

    expect(root.attributes("data-skeleton")).toBe("");
    expect(root.attributes("aria-hidden")).toBe("true");
    expect(root.attributes("data-disabled")).toBe("");
    expect(wrapper.find("[data-slot=inbox-item-leading]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=inbox-item-context]").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot=skeleton]").length).toBeGreaterThanOrEqual(4);
  });

  it("drops the trailing column in a compact line row", () => {
    const wrapper = mount(InboxItemSkeleton, {
      props: { density: "compact", line: true },
    });

    expect(wrapper.find("[data-slot=inbox-item-trailing]").exists()).toBe(false);
    expect(wrapper.find("[data-slot=inbox-item-line]").exists()).toBe(true);
  });
});

describe("InboxItemSkeletonList", () => {
  it("waits before showing rows, then shows the requested count", async () => {
    const wrapper = mount(InboxItemSkeletonList, { props: { count: 3, delay: 0 } });
    await nextTick();

    expect(wrapper.findAll("[data-slot=inbox-item]")).toHaveLength(3);
    expect(wrapper.attributes("data-waiting")).toBeUndefined();
  });

  it("renders children instead of generated rows", () => {
    const wrapper = mount(InboxItemSkeletonList, {
      props: { delay: 0 },
      slots: { default: "<div data-test=row />" },
    });

    expect(wrapper.find("[data-test=row]").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot=inbox-item]")).toHaveLength(0);
  });
});
