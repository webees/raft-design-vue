import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SortableComposerAttachments from "./SortableComposerAttachments.vue";

const items = ["a", "b", "c"];

function mountList() {
  return mount(SortableComposerAttachments, {
    props: { items },
    slots: { default: ({ id }: { id: string }) => id },
    attachTo: document.body,
  });
}

describe("SortableComposerAttachments", () => {
  it("renders one row per attachment and exposes the slot id", () => {
    const wrapper = mountList();
    const rows = wrapper.findAll("[data-slot=sortable-composer-attachment]");
    expect(rows).toHaveLength(3);
    expect(rows.map((row) => row.text())).toEqual(items);
    wrapper.unmount();
  });

  it("reorders with the keyboard and emits the new order", async () => {
    const wrapper = mountList();
    const first = wrapper.findAll("[data-slot=sortable-composer-attachment]")[0]!;

    await first.trigger("keydown", { code: "Space" });
    await first.trigger("keydown", { code: "ArrowRight" });
    await first.trigger("keydown", { code: "Space" });

    expect(wrapper.emitted("reorder")).toEqual([[["b", "a", "c"]]]);
    wrapper.unmount();
  });

  it("Escape cancels without emitting", async () => {
    const wrapper = mountList();
    const first = wrapper.findAll("[data-slot=sortable-composer-attachment]")[0]!;

    await first.trigger("keydown", { code: "Space" });
    await first.trigger("keydown", { code: "ArrowRight" });
    await first.trigger("keydown", { code: "Escape" });

    expect(wrapper.emitted("reorder")).toBeUndefined();
    wrapper.unmount();
  });
});
