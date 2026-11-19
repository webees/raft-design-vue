import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import Tooltip from "./Tooltip.vue";
import TooltipContent from "./TooltipContent.vue";
import TooltipProvider from "./TooltipProvider.vue";
import TooltipTrigger from "./TooltipTrigger.vue";

afterEach(() => {
  document.body.innerHTML = "";
});

function mountOpenTooltip(slot: () => unknown, props: Record<string, unknown> = {}) {
  return mount(TooltipProvider, {
    attachTo: document.body,
    slots: {
      default: () =>
        h(
          Tooltip,
          { defaultOpen: true, ...props },
          {
            default: () =>
              h("div", { style: "display:flex" }, [
                h(TooltipTrigger, {}, { default: () => "Hover me" }),
                h(TooltipContent, {}, { default: slot }),
              ]),
          },
        ),
    },
  });
}

describe("Tooltip", () => {
  it("renders the trigger and a portalled content region", async () => {
    const wrapper = mountOpenTooltip(() => "Bold text");
    await nextTick();
    await nextTick();

    expect(wrapper.text()).toContain("Hover me");
    const content = document.body.querySelector("[data-slot=tooltip-content]");
    expect(content).not.toBeNull();
    expect(content?.textContent).toContain("Bold text");
    expect(content?.getAttribute("data-side")).toBe("top");
    wrapper.unmount();
  });

  it("passes shortcut markup through to the body", async () => {
    const wrapper = mountOpenTooltip(() => ["Save", h("kbd", { "data-slot": "kbd" }, "⌘S")]);
    await nextTick();
    await nextTick();

    const body = document.body.querySelector("[data-slot=tooltip-body]");
    expect(body?.querySelector("[data-slot=kbd]")?.textContent).toBe("⌘S");
    wrapper.unmount();
  });

  it("detects a leading icon and switches the body layout", async () => {
    const wrapper = mountOpenTooltip(() => [h("svg", { "data-testid": "lead" }), "Play"]);
    await nextTick();
    await nextTick();

    const body = document.body.querySelector("[data-slot=tooltip-body]");
    expect(body?.className).toContain("flex");
    expect(body?.className).toContain("items-center");
    wrapper.unmount();
  });
});
