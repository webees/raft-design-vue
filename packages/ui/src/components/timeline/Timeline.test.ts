import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { Timeline, TimelineContent, TimelineItem, TimelineTime, TimelineTitle } from ".";

const Demo = defineComponent({
  setup() {
    return () =>
      h(Timeline, { size: "lg" }, () => [
        h(TimelineItem, { taskStatus: "done" }, () => [
          h(TimelineTitle, () => "Bugen claimed it"),
          h(TimelineContent, () => "commit c41e09 · 4 files changed"),
          h(TimelineTime, () => "2m"),
        ]),
        h(TimelineItem, { variant: "warning", lineType: "dashed" }, () => [
          h(TimelineTitle, () => "CI failed"),
        ]),
      ]);
  },
});

describe("Timeline", () => {
  it("renders an ordered list with one list item per event", () => {
    const wrapper = mount(Demo);
    expect(wrapper.find("ol[data-slot='timeline']").exists()).toBe(true);
    expect(wrapper.findAll("li[data-slot='timeline-item']")).toHaveLength(2);
    expect(wrapper.text()).toContain("Bugen claimed it");
    expect(wrapper.text()).toContain("commit c41e09");
  });

  it("maps size and placement to modifier classes", () => {
    const wrapper = mount(Demo);
    const root = wrapper.find("[data-slot='timeline']");
    expect(root.classes()).toContain("r-timeline");
    expect(root.classes()).toContain("r-timeline--lg");
    expect(root.classes()).toContain("r-timeline--left");

    const right = mount(Timeline, { props: { itemPlacement: "right" } });
    expect(right.find("[data-slot='timeline']").classes()).toContain("r-timeline--right");

    const horizontal = mount(Timeline, { props: { horizontal: true } });
    expect(horizontal.find("[data-slot='timeline']").classes()).toContain("r-timeline--horizontal");
  });

  it("paints markers from task status tokens and keeps custom colours winning", () => {
    const wrapper = mount(Demo);
    const items = wrapper.findAll("[data-slot='timeline-item']");
    expect(items[0]?.attributes("data-task-status")).toBe("done");
    expect(items[0]?.classes()).toContain("r-timeline-item--color");
    expect(items[0]?.attributes("style")).toContain(
      "--r-timeline-custom-color: var(--task-status-done)",
    );
    expect(items[1]?.classes()).toContain("r-timeline-item--warning");
    expect(items[1]?.classes()).toContain("r-timeline-item--dashed");

    const custom = mount(TimelineItem, {
      props: { taskStatus: "done", color: "tomato" },
    });
    expect(custom.attributes("style")).toContain("--r-timeline-custom-color: tomato");
  });

  it("leaves the backlog marker hollow and accepts a custom icon size", () => {
    const backlog = mount(TimelineItem, { props: { taskStatus: "backlog" } });
    const style = backlog.attributes("style") ?? "";
    expect(style).toContain("--r-timeline-custom-color: var(--line-strong)");
    expect(style).toContain("--r-timeline-marker-fill: 0%");

    const sized = mount(Timeline, { props: { iconSize: 14 } });
    expect(sized.find("[data-slot='timeline']").attributes("style")).toContain(
      "--r-timeline-custom-icon-size: 14px",
    );
  });

  it("renders a custom icon instead of the marker", () => {
    const wrapper = mount(TimelineItem, {
      slots: { icon: () => h("svg", { "data-test": "icon" }), default: () => "Step" },
    });
    expect(wrapper.find("[data-slot='timeline-item']").attributes("data-icon")).toBe("");
    expect(wrapper.find("[data-slot='timeline-item-icon']").exists()).toBe(true);
    expect(wrapper.find("[data-slot='timeline-item-marker']").exists()).toBe(false);
  });
});
