import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vitest";

import { usePresenceStyle } from "./presence-style";

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const Surface = defineComponent({
  props: { open: { type: Boolean, default: true } },
  setup(props, { expose }) {
    const surface = ref<Element | null>(null);
    usePresenceStyle(() => props.open, surface);
    expose({ surface });
    return () => h("div", { ref: surface, "data-testid": "surface" });
  },
});

describe("usePresenceStyle", () => {
  it("marks an entering surface for two frames", async () => {
    const wrapper = mount(Surface, { props: { open: true } });
    const node = wrapper.get("[data-testid=surface]");
    await nextTick();
    expect(node.attributes("data-presence")).toBe("");
    expect(node.attributes("data-starting-style")).toBe("");

    await nextTick();
    await nextFrame();
    await nextFrame();
    expect(node.attributes("data-starting-style")).toBeUndefined();
  });

  it("holds a closing surface with data-ending-style and releases it", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Surface, { props: { open: true } });
    const node = wrapper.get("[data-testid=surface]");
    await wrapper.setProps({ open: false });
    await nextTick();
    expect(node.attributes("data-ending-style")).toBe("");
    expect(node.attributes("data-starting-style")).toBeUndefined();

    vi.advanceTimersByTime(500);
    await nextTick();
    expect(node.attributes("data-ending-style")).toBeUndefined();
    vi.useRealTimers();
  });

  it("never marks a surface that mounts closed", async () => {
    const wrapper = mount(Surface, { props: { open: false } });
    const node = wrapper.get("[data-testid=surface]");
    await nextTick();
    expect(node.attributes("data-starting-style")).toBeUndefined();
    expect(node.attributes("data-ending-style")).toBeUndefined();
  });
});
