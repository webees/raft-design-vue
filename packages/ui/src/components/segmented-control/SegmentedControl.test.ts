import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  SegmentedControl,
  SegmentedControlCount,
  SegmentedControlItem,
  SegmentedControlLabel,
} from ".";

const Control = defineComponent({
  props: {
    iconsOnlyBelow: { type: String, default: undefined },
    variant: { type: String as () => "default" | "on-frame", default: "default" },
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    const value = ref("grid");
    return () =>
      h(
        SegmentedControl,
        {
          modelValue: value.value,
          "onUpdate:modelValue": (next: string) => (value.value = next),
          iconsOnlyBelow: props.iconsOnlyBelow,
          variant: props.variant,
          disabled: props.disabled,
          "aria-label": "View",
        },
        () => [
          h(SegmentedControlItem, { value: "grid" }, () => [
            h("svg", { "data-testid": "grid-icon" }),
            h(SegmentedControlLabel, () => "Grid"),
          ]),
          h(SegmentedControlItem, { value: "list" }, () => [
            h("svg", { "data-testid": "list-icon" }),
            h(SegmentedControlLabel, () => "List"),
            h(SegmentedControlCount, () => "12"),
          ]),
        ],
      );
  },
});

describe("SegmentedControl", () => {
  it("renders a horizontal radio group with labelled segments", () => {
    const wrapper = mount(Control);
    const root = wrapper.find("[data-slot=segmented-control]");
    expect(root.attributes("role")).toBe("radiogroup");
    expect(root.attributes("aria-label")).toBe("View");
    expect(root.attributes("data-slot")).toBe("segmented-control");
    expect(root.classes()).toContain("inline-flex");
    expect(wrapper.findAll("[data-slot=segmented-control-item]")).toHaveLength(2);
    expect(wrapper.find("[data-slot=segmented-control-label]").text()).toBe("Grid");
    expect(wrapper.find("[data-slot=segmented-control-count]").text()).toBe("12");
  });

  it("marks the selected segment and updates the model", async () => {
    const wrapper = mount(Control);
    const items = wrapper.findAll("[role=radio]");
    expect(items[0]?.attributes("data-state")).toBe("checked");
    expect(items[0]?.attributes("aria-checked")).toBe("true");
    await items[1]!.trigger("click");
    expect(items[1]?.attributes("data-state")).toBe("checked");
    expect(items[0]?.attributes("data-state")).toBe("unchecked");
  });

  it("supports the on-frame variant and disabled groups", () => {
    const wrapper = mount(Control, { props: { variant: "on-frame", disabled: true } });
    const root = wrapper.find("[data-slot=segmented-control]");
    expect(root.classes()).toContain("bg-fill-frame-medium");
    expect(root.attributes("data-disabled")).toBeDefined();
    expect(wrapper.findAll("[role=radio]")[0]?.attributes("disabled")).toBeDefined();
  });

  it("passes preset and measured icon-only modes to the root", () => {
    const preset = mount(Control, { props: { iconsOnlyBelow: "md" } });
    expect(preset.find("[data-slot=segmented-control]").classes().join(" ")).toContain("@max-md");

    const measured = mount(Control, { props: { iconsOnlyBelow: "auto" } });
    expect(measured.find("[data-slot=segmented-control]").classes().join(" ")).toContain(
      "data-[icons-only]",
    );
  });

  it("renders a disabled segment", () => {
    const wrapper = mount(SegmentedControl, {
      props: { modelValue: "a" },
      slots: {
        default: () => [
          h(SegmentedControlItem, { value: "a" }, () => "A"),
          h(SegmentedControlItem, { value: "b", disabled: true }, () => "B"),
        ],
      },
    });
    expect(wrapper.findAll("[role=radio]")[1]?.attributes("disabled")).toBeDefined();
  });
});
