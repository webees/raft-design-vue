import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import {
  ProfilePanel,
  ProfilePanelBody,
  ProfilePanelHeader,
  ProfilePanelHeaderContent,
  ProfilePanelSection,
} from ".";

const Profile = defineComponent({
  setup() {
    return () =>
      h(ProfilePanel, { edge: "attached" }, () => [
        h(ProfilePanelHeader, () => [
          h(ProfilePanelHeaderContent, () => "Profile"),
        ]),
        h(ProfilePanelBody, () => [
          h(ProfilePanelSection, () => "Details"),
        ]),
      ]);
  },
});

describe("ProfilePanel", () => {
  it("wraps the shared panel primitives", () => {
    const wrapper = mount(Profile);
    expect(wrapper.find("[data-slot=profile-panel]").attributes("data-edge")).toBe("attached");
    expect(wrapper.find("[data-slot=profile-panel-header]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=profile-panel-header-content]").text()).toBe("Profile");
    expect(wrapper.find("[data-slot=profile-panel-body]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=profile-panel-section]").text()).toBe("Details");
  });

  it("keeps asChild behavior for panel slots", () => {
    const wrapper = mount(ProfilePanelSection, {
      props: { asChild: true },
      slots: { default: () => h("article", "About") },
    });
    expect(wrapper.element.tagName).toBe("ARTICLE");
    expect(wrapper.attributes("data-slot")).toBe("profile-panel-section");
  });
});
