import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick } from "vue";

import Draggable from "./Draggable.vue";
import DragLift from "./DragLift.vue";
import DragScope from "./DragScope.vue";

const Host = defineComponent({
  components: { Draggable, DragLift, DragScope },
  template: `
    <DragScope>
      <Draggable id="a"><span>Item A</span></Draggable>
      <DragLift v-slot="{ active }">
        <span v-if="active" data-test="lifted">{{ active.id }}</span>
      </DragLift>
    </DragScope>
  `,
});

const lifted = () => document.querySelector('[data-test="lifted"]');

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("data-dragging");
});

describe("DragLift", () => {
  it("keeps the overlay content alive while the drop glides home", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Host, { attachTo: document.body });
    const draggable = wrapper.get("[data-drag-draggable]");

    await draggable.trigger("keydown", { code: "Space" });
    expect(lifted()).not.toBeNull();

    await draggable.trigger("keydown", { code: "Space" });
    await nextTick();
    expect(lifted()).not.toBeNull();

    await vi.advanceTimersByTimeAsync(200);
    await nextTick();
    expect(lifted()).toBeNull();
    wrapper.unmount();
  });
});
