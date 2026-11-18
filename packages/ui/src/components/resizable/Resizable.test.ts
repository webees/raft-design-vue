import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { ResizableGroup, ResizableHandle, ResizablePanel } from ".";

const Demo = defineComponent({
  setup() {
    return () =>
      h(ResizableGroup, { orientation: "horizontal", class: "demo" }, () => [
        h(ResizablePanel, { defaultSize: 50 }, () => "Left"),
        h(ResizableHandle, { ariaLabel: "Resize sidebar" }),
        h(ResizablePanel, { defaultSize: 50 }, () => "Right"),
      ]);
  },
});

describe("Resizable", () => {
  it("renders group, panels and handle slots", () => {
    const wrapper = mount(Demo);
    expect(wrapper.find("[data-slot='resizable-group']").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot='resizable-panel']")).toHaveLength(2);
    expect(wrapper.find("[data-slot='resizable-handle']").exists()).toBe(true);
    expect(wrapper.text()).toContain("Left");
    expect(wrapper.text()).toContain("Right");
  });

  it("applies horizontal orientation and an accessible handle label", () => {
    const wrapper = mount(Demo);
    const group = wrapper.find("[data-slot='resizable-group']");
    const handle = wrapper.find("[data-slot='resizable-handle']");
    expect(group.attributes("data-orientation")).toBe("horizontal");
    expect(group.classes()).not.toContain("flex-col");
    expect(handle.attributes("aria-label")).toBe("Resize sidebar");
    expect(handle.attributes("data-orientation")).toBe("vertical");
    expect(handle.classes()).toContain("cursor-ew-resize");
  });

  it("supports a vertical group", () => {
    const wrapper = mount(ResizableGroup, {
      props: { orientation: "vertical" },
      slots: {
        default: () => [
          h(ResizablePanel, () => "Top"),
          h(ResizableHandle),
          h(ResizablePanel, () => "Bottom"),
        ],
      },
    });
    const group = wrapper.find("[data-slot='resizable-group']");
    const handle = wrapper.find("[data-slot='resizable-handle']");
    expect(group.attributes("data-orientation")).toBe("vertical");
    expect(group.classes()).toContain("data-[orientation=vertical]:flex-col");
    expect(handle.attributes("data-orientation")).toBe("horizontal");
    expect(handle.classes()).toContain("data-[orientation=horizontal]:cursor-ns-resize");
  });
});
