import { h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DescriptionList from "./DescriptionList.vue";
import DescriptionItem from "./DescriptionItem.vue";
import DescriptionTerm from "./DescriptionTerm.vue";
import DescriptionDetails from "./DescriptionDetails.vue";

describe("DescriptionList", () => {
  it("renders semantic term and details pairs", () => {
    const wrapper = mount(DescriptionList, {
      props: { direction: "horizontal" },
      slots: {
        default: () =>
          h(DescriptionItem, () => [
            h(DescriptionTerm, () => "Owner"),
            h(DescriptionDetails, () => "Ada"),
          ]),
      },
    });

    expect(wrapper.attributes("data-slot")).toBe("description-list");
    expect(wrapper.attributes("data-direction")).toBe("horizontal");
    expect(wrapper.get("dt").text()).toBe("Owner");
    expect(wrapper.get("dd").text()).toBe("Ada");
    expect(wrapper.find("[data-slot='description-item']").exists()).toBe(true);
  });
});
