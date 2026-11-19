import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import Select from "./Select.vue";
import SelectContent from "./SelectContent.vue";
import SelectIcon from "./SelectIcon.vue";
import SelectItem from "./SelectItem.vue";
import SelectItemIndicator from "./SelectItemIndicator.vue";
import SelectItemText from "./SelectItemText.vue";
import SelectList from "./SelectViewport.vue";
import SelectTrigger from "./SelectTrigger.vue";
import SelectValue from "./SelectValue.vue";

const components = {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectTrigger,
  SelectValue,
};

describe("Select", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a combobox and opens its listbox", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Select default-value="balanced">
            <SelectTrigger aria-label="Model">
              <SelectValue placeholder="Choose a model" />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                <SelectItem value="fast">
                  <SelectItemText>Fast</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="balanced">
                  <SelectItemText>Balanced</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectList>
            </SelectContent>
          </Select>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();

    const trigger = document.body.querySelector("[role=combobox]");
    expect(trigger).not.toBeNull();
    expect(trigger?.textContent).toContain("Balanced");
    expect(trigger?.className).toContain("border-line-field");
    wrapper.unmount();
  });

  it("opens the listbox and exposes the selected option", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Select default-value="b" :default-open="true">
            <SelectTrigger aria-label="Letter">
              <SelectValue placeholder="Pick" />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                <SelectItem value="a"><SelectItemText>A</SelectItemText></SelectItem>
                <SelectItem value="b"><SelectItemText>B</SelectItemText></SelectItem>
              </SelectList>
            </SelectContent>
          </Select>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    expect(document.body.querySelector("[role=listbox]")).not.toBeNull();
    const selected = document.body.querySelector("[role=option][data-state=checked]");
    expect(selected?.textContent).toContain("B");
    wrapper.unmount();
  });

  it("applies the field chrome", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Select chrome="field">
            <SelectTrigger aria-label="Field select">
              <SelectValue placeholder="Pick one" />
              <SelectIcon />
            </SelectTrigger>
          </Select>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();

    expect(document.body.querySelector("[role=combobox]")?.className).toContain("text-field");
    wrapper.unmount();
  });
});
