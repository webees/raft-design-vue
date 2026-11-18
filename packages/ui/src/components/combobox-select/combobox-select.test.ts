import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import ComboboxSelect from "./ComboboxSelect.vue";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

describe("ComboboxSelect", () => {
  it("filters, highlights and selects with the keyboard", async () => {
    const wrapper = mount(ComboboxSelect, {
      props: { options, "aria-label": "Pick one" },
      attachTo: document.body,
    });
    const input = wrapper.find("input");

    await input.trigger("focus");
    await nextTick();
    const list = document.body.querySelector("[id][role=listbox]");
    expect(list).not.toBeNull();

    await input.trigger("keydown", { key: "ArrowDown" });
    expect(input.attributes("aria-activedescendant")).toBe(`${list!.id}-1`);

    await input.trigger("keydown", { key: "Enter" });
    await nextTick();

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["b"]);
    expect(wrapper.emitted("value-change")?.at(-1)).toEqual(["b"]);
    expect(document.body.querySelector("[role=listbox]")).toBeNull();
    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const wrapper = mount(ComboboxSelect, {
      props: { options, defaultOpen: true },
      attachTo: document.body,
    });

    await wrapper.find("input").trigger("keydown", { key: "Escape" });
    await nextTick();

    expect(document.body.querySelector("[role=listbox]")).toBeNull();
    wrapper.unmount();
  });
});
