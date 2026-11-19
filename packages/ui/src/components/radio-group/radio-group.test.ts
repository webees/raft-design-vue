import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import RadioGroup from "./RadioGroup.vue";
import RadioGroupItem from "./RadioGroupItem.vue";

describe("RadioGroup", () => {
  it("renders the group with items", () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: "a" },
      slots: {
        default: () => [h(RadioGroupItem, { value: "a" }), h(RadioGroupItem, { value: "b" })],
      },
    });
    expect(wrapper.attributes("data-slot")).toBe("radio-group");
    expect(wrapper.findAll("[data-slot=radio-group-item]")).toHaveLength(2);
  });
});
