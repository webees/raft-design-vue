import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import VirtualList from "./VirtualList.vue";

const items = Array.from({ length: 200 }, (_, index) => ({
  id: `row-${index}`,
  label: `Row ${index}`,
}));

const renderRow = (row: unknown) =>
  h("span", { class: "row" }, (row as { item: { label: string } }).item.label);

const getKey = (item: unknown) => (item as (typeof items)[number]).id;

function stubViewport(height = 400) {
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    get() {
      return this.getAttribute("data-slot") === "virtual-list" ? height : 40;
    },
  });
}

describe("VirtualList", () => {
  it("renders a window of rows, not every item", async () => {
    stubViewport();
    const wrapper = mount(VirtualList, {
      props: {
        items,
        getKey,
        itemEstimatedSize: 40,
        itemMinSize: 40,
        class: "h-[400px]",
        children: renderRow,
      },
    });
    await nextTick();
    const rendered = wrapper.findAll(".row");
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(items.length);
    expect(wrapper.find('[data-slot="virtual-list-items"]').exists()).toBe(true);
  });

  it("scrolls to an item by key and keeps rendering around it", async () => {
    stubViewport();
    const wrapper = mount(VirtualList, {
      props: {
        items,
        getKey,
        itemEstimatedSize: 40,
        itemMinSize: 40,
        children: renderRow,
      },
    });
    await nextTick();
    const api = wrapper.vm as unknown as {
      scrollTo: (options: { key: string; align: "center"; behavior: "instant" }) => void;
      getOffsetTopOfKey: (key: string) => number | undefined;
    };
    expect(api.getOffsetTopOfKey("row-150")).toBe(6000);
    api.scrollTo({ key: "row-150", align: "center", behavior: "instant" });
    await nextTick();
    const labels = wrapper.findAll(".row").map((node) => node.text());
    expect(labels).toContain("Row 150");
  });

  it("renders every row when virtualization is off", async () => {
    stubViewport();
    const wrapper = mount(VirtualList, {
      props: {
        items,
        getKey,
        itemEstimatedSize: 40,
        itemMinSize: 40,
        virtual: false,
        children: renderRow,
      },
    });
    await nextTick();
    expect(wrapper.findAll(".row").length).toBe(items.length);
  });

  it("reports render thrashing through onRenderAnomaly", async () => {
    stubViewport();
    const anomalies: unknown[] = [];
    const wrapper = mount(VirtualList, {
      props: {
        items,
        getKey,
        itemEstimatedSize: 40,
        itemMinSize: 40,
        onRenderAnomaly: (anomaly: unknown) => anomalies.push(anomaly),
        children: renderRow,
      },
    });
    await nextTick();
    const root = wrapper.element as HTMLElement;
    for (let index = 0; index < 130; index += 1) {
      root.scrollTop = index % 2 === 0 ? 0 : 6000;
      root.dispatchEvent(new Event("scroll"));
    }
    await nextTick();
    expect(anomalies.length).toBeGreaterThan(0);
    expect(anomalies[0]).toMatchObject({ type: "renderThrashing" });
  });
});
