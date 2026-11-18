import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FormSection from "./FormSection.vue";

describe("FormSection", () => {
  it("renders a titled section with optional status and description", () => {
    const wrapper = mount(FormSection, {
      props: { title: "Profile", description: "How people find you" },
      slots: { status: "<span data-test='status'>Required</span>", default: "<input />" },
    });

    expect(wrapper.attributes("data-slot")).toBe("form-section");
    expect(wrapper.get("h3").text()).toBe("Profile");
    expect(wrapper.get("[data-slot='form-section-head'] p").text()).toBe(
      "How people find you",
    );
    expect(wrapper.find("[data-test='status']").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("omits the description when none is provided", () => {
    const wrapper = mount(FormSection, { props: { title: "Details" } });
    expect(wrapper.find("[data-slot='form-section-head'] p").exists()).toBe(false);
  });
});
