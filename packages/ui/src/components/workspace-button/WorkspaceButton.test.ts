import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WorkspaceButton from "./WorkspaceButton.vue";

describe("WorkspaceButton", () => {
  it("renders a labelled workspace switcher", () => {
    const wrapper = mount(WorkspaceButton, { slots: { default: "Acme" } });
    const button = wrapper.get("button");

    expect(button.attributes("data-slot")).toBe("workspace-button");
    expect(button.text()).toContain("Acme");
    expect(button.find("[data-slot='workspace-button-chevron']").exists()).toBe(true);
  });
});
