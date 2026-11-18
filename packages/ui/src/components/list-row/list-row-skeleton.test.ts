import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ListRowSkeleton from "./ListRowSkeleton.vue";

describe("ListRowSkeleton", () => {
  it("shows the real row with a leading tile and two bars", () => {
    const wrapper = mount(ListRowSkeleton);
    expect(wrapper.attributes("data-skeleton")).toBe("");
    expect(wrapper.findAll("[data-slot=skeleton]")).toHaveLength(4);
    expect(wrapper.find("[data-slot=list-row-title]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=list-row-description]").exists()).toBe(true);
  });

  it("leaves out the parts the variant does not have", () => {
    const wrapper = mount(ListRowSkeleton, { props: { variant: "plain" } });
    expect(wrapper.findAll("[data-slot=skeleton]")).toHaveLength(1);
    expect(wrapper.find("[data-slot=list-row-description]").exists()).toBe(false);
  });

  it("lets a caller force either optional part", () => {
    const wrapper = mount(ListRowSkeleton, {
      props: { variant: "plain", leading: true, description: true },
    });
    expect(wrapper.findAll("[data-slot=skeleton]")).toHaveLength(3);
  });
});
