import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ToggleGroup from "./ToggleGroup.vue";
import ToggleGroupItem from "./ToggleGroupItem.vue";

describe("ToggleGroup", () => {
  const Harness = defineComponent({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ value: ref("grid") }),
    template: `
      <ToggleGroup v-model="value" type="single" aria-label="Layout">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  it("renders an accessible single-select group", () => {
    const wrapper = mount(Harness);
    expect(wrapper.attributes("role")).toBe("group");
    expect(wrapper.attributes("aria-label")).toBe("Layout");
    expect(wrapper.attributes("data-orientation")).toBe("horizontal");
    expect(wrapper.findAll("[data-slot='toggle-group-item']")).toHaveLength(2);
  });

  it("marks the selected item and updates the model", async () => {
    const wrapper = mount(Harness);
    const items = wrapper.findAll("button");
    expect(items[0]?.attributes("aria-pressed")).toBe("true");

    await items[1]?.trigger("click");
    expect(wrapper.vm.value).toBe("list");
    expect(items[1]?.attributes("aria-pressed")).toBe("true");
  });
});
