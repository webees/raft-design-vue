import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WorkspaceButton from "./WorkspaceButton.vue";
import { WorkspaceButtonName } from "./parts";

describe("WorkspaceButton", () => {
  it("renders a labelled workspace switcher", () => {
    const wrapper = mount(WorkspaceButton, { slots: { default: "Acme" } });
    const button = wrapper.get("button");

    expect(button.attributes("data-slot")).toBe("workspace-button");
    expect(button.text()).toContain("Acme");
    expect(button.find("[data-slot='workspace-button-chevron']").exists()).toBe(true);
  });

  it("forwards attributes to the name label", () => {
    const wrapper = mount(WorkspaceButtonName, {
      slots: { default: "Acme" },
      attrs: { id: "workspace-name", "data-testid": "name" },
    });

    expect(wrapper.attributes("id")).toBe("workspace-name");
    expect(wrapper.attributes("data-testid")).toBe("name");
    expect(wrapper.attributes("data-slot")).toBe("workspace-button-name");
  });
});
