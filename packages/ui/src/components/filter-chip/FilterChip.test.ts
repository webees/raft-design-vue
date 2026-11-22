import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { FilterChip, FilterChipLabel } from "./parts";
import FilterChipRemove from "./FilterChipRemove.vue";

describe("FilterChip", () => {
  it("renders an applied filter with a labelled reset control", () => {
    const Harness = defineComponent({
      components: { FilterChip, FilterChipLabel, FilterChipRemove },
      template: `
        <FilterChip>
          <FilterChipLabel>Status: Open</FilterChipLabel>
          <FilterChipRemove label="Clear status filter" />
        </FilterChip>
      `,
    });
    const wrapper = mount(Harness);
    expect(wrapper.attributes("data-slot")).toBe("filter-chip");
    expect(wrapper.text()).toContain("Status: Open");
    const remove = wrapper.find("[data-slot='filter-chip-remove']");
    expect(remove.attributes("aria-label")).toBe("Clear status filter");
    expect(remove.attributes("type")).toBe("button");
  });
});
