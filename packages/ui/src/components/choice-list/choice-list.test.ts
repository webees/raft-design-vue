import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ChoiceList from "./ChoiceList.vue";

const items = [
  { value: "a", label: "Alpha", description: "First" },
  { value: "b", label: "Beta", action: "Edit" },
];

describe("ChoiceList", () => {
  it("renders rows, search and actions", () => {
    const wrapper = mount(ChoiceList, { props: { items, search: "always" } });
    expect(wrapper.findAll("[data-slot=choice-list-item]")).toHaveLength(2);
    expect(wrapper.find("input[type=search]").exists()).toBe(true);
    expect(wrapper.text()).toContain("Edit");
  });

  it("selects a single value", async () => {
    const wrapper = mount(ChoiceList, { props: { items, search: "always" } });
    await wrapper.findAll("[data-slot=radio-group-item]")[0]!.trigger("click");
    expect(wrapper.emitted("update:value")?.at(-1)).toEqual(["a"]);
  });

  it("selects multiple values", async () => {
    const wrapper = mount(ChoiceList, {
      props: { items, multiple: true, search: "always", defaultValue: ["a"] },
    });
    await wrapper.findAll("[data-slot=checkbox]")[1]!.trigger("click");
    expect(wrapper.emitted("update:value")?.at(-1)).toEqual([["a", "b"]]);
  });

  it("filters by search text", async () => {
    const wrapper = mount(ChoiceList, { props: { items, search: "always" } });
    await wrapper.find("input[type=search]").setValue("beta");
    expect(wrapper.findAll("[data-slot=choice-list-item]")).toHaveLength(1);
  });

  it("hides auto search below six items", () => {
    const wrapper = mount(ChoiceList, { props: { items } });
    expect(wrapper.find("input[type=search]").exists()).toBe(false);
  });

  it("keeps pinned rows above the rest while searching", async () => {
    const wrapper = mount(ChoiceList, {
      props: {
        items: [
          { value: "a", label: "One" },
          { value: "b", label: "Two" },
        ],
        defaultValue: "b",
        search: "always",
      },
    });
    await wrapper.find("input[type=search]").setValue("one");
    const rows = wrapper.findAll("[data-slot=choice-list-item]");
    expect(rows).toHaveLength(2);
    expect(rows[0]?.text()).toContain("Two");
  });
});
