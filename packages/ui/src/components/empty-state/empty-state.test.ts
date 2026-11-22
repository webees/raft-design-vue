import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./parts";

describe("EmptyState", () => {
  it("renders a composed empty state", () => {
    const wrapper = mount({
      components: {
        EmptyState,
        EmptyStateContent,
        EmptyStateIcon,
        EmptyStateTitle,
        EmptyStateDescription,
      },
      template: `
        <EmptyState>
          <EmptyStateContent>
            <EmptyStateIcon>icon</EmptyStateIcon>
            <EmptyStateTitle>No projects yet</EmptyStateTitle>
            <EmptyStateDescription>Create your first project.</EmptyStateDescription>
          </EmptyStateContent>
        </EmptyState>
      `,
    });

    expect(wrapper.attributes("data-slot")).toBe("empty-state");
    expect(wrapper.text()).toContain("No projects yet");
    expect(wrapper.find("[data-slot=empty-state-icon]").attributes("aria-hidden")).toBe("true");
  });
});
