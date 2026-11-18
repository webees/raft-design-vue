import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import CopyableCode from "./CopyableCode.vue";
import CopyableCodeAction from "./CopyableCodeAction.vue";
import CopyableCodeRoot from "./CopyableCodeRoot.vue";

function mountComposed() {
  return mount({
    components: { CopyableCodeRoot, CopyableCode },
    template: `
      <CopyableCodeRoot size="sm">
        <CopyableCode>bun install</CopyableCode>
      </CopyableCodeRoot>
    `,
  });
}

describe("CopyableCode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("composes root and code", () => {
    const wrapper = mountComposed();
    expect(wrapper.attributes("data-slot")).toBe("copyable-code-root");
    expect(wrapper.attributes("data-size")).toBe("sm");
    expect(wrapper.find("[data-slot=copyable-code]").text()).toBe("bun install");
  });

  it("copies the code and reports the copied state", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    const wrapper = mount({
      components: { CopyableCodeRoot, CopyableCode, CopyableCodeAction },
      template: `
        <CopyableCodeRoot>
          <CopyableCode>bun install</CopyableCode>
          <CopyableCodeAction />
        </CopyableCodeRoot>
      `,
    });

    await wrapper.find("[data-slot=copyable-code-action] button").trigger("click");
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(writeText).toHaveBeenCalledWith("bun install");
    expect(wrapper.find("[data-slot=copyable-code-root]").attributes("data-state")).toBe("copied");
  });
});
