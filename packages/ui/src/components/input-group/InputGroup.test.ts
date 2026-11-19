import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import InputGroup from "./InputGroup.vue";
import InputGroupAddon from "./InputGroupAddon.vue";
import InputGroupAddonText from "./InputGroupAddonText.vue";
import InputGroupInput from "./InputGroupInput.vue";

describe("InputGroup", () => {
  it("wires the control, addon and text inside one field shell", () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: () => [
          h(InputGroupAddon, () => [h(InputGroupAddonText, () => "https://")]),
          h(InputGroupInput, { modelValue: "raft.build" }),
          h(InputGroupAddon, { align: "inline-end", variant: "container" }, () => [
            h("span", "Go"),
          ]),
        ],
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("input-group");
    expect(wrapper.attributes("data-size")).toBe("lg");
    expect(wrapper.get("[data-slot='input-group-control']").attributes("data-slot")).toBe(
      "input-group-control",
    );
    expect(wrapper.get("[data-slot='input-group-text']").text()).toContain("https://");
    const trailing = wrapper.get("[data-slot='input-group-addon'][data-align='inline-end']");
    expect(trailing.attributes("data-variant")).toBe("container");
    expect(trailing.attributes("data-input-group-trim")).toBeUndefined();
  });

  it("marks the control invalid for both the field and assistive technology", () => {
    const wrapper = mount(InputGroupInput, { props: { invalid: true } });
    expect(wrapper.attributes("data-invalid")).toBe("true");
    expect(wrapper.attributes("aria-invalid")).toBe("true");
  });
});
