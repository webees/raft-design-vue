import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Spinner from "./Spinner.vue";

describe("Spinner", () => {
  it("renders four pixels with status semantics", () => {
    const wrapper = mount(Spinner);
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("aria-label")).toBe("Loading");
    expect(wrapper.findAll("[data-spinner-pixel]")).toHaveLength(4);
  });

  it("accepts a custom label and size", () => {
    const wrapper = mount(Spinner, { props: { label: "Connecting", size: "lg" } });
    expect(wrapper.attributes("aria-label")).toBe("Connecting");
    expect(wrapper.attributes("data-size")).toBe("lg");
  });
});
