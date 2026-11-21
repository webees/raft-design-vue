import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { PopoverBody, PopoverHeader, PopoverTitle } from "./parts";
import Popover from "./Popover.vue";
import PopoverActions from "./PopoverActions.vue";
import PopoverContent from "./PopoverContent.vue";
import PopoverDescription from "./PopoverDescription.vue";
import PopoverSeparator from "./PopoverSeparator.vue";
import PopoverTrigger from "./PopoverTrigger.vue";

afterEach(() => {
  document.body.innerHTML = "";
});

function mountPopover(props: Record<string, unknown> = {}) {
  const size = (props.size as "default" | "item" | undefined) ?? "default";
  return mount(Popover, {
    attachTo: document.body,
    props: { defaultOpen: true, ...props },
    slots: {
      default: () =>
        h("div", { style: "display:flex" }, [
          h(PopoverTrigger, {}, { default: () => "Open" }),
          h(
            PopoverContent,
            { size },
            {
              default: () => [
                h(
                  PopoverHeader,
                  {},
                  { default: () => h(PopoverTitle, {}, { default: () => "Rename" }) },
                ),
                h(
                  PopoverBody,
                  {},
                  {
                    default: () => [
                      h(PopoverDescription, {}, { default: () => "Choose a new name." }),
                      h(PopoverSeparator),
                    ],
                  },
                ),
                h(PopoverActions, {}, { default: () => "Save" }),
              ],
            },
          ),
        ]),
    },
  });
}

describe("Popover", () => {
  it("renders portalled content with the default frame", async () => {
    const wrapper = mountPopover();
    await nextTick();
    await nextTick();

    const content = document.body.querySelector("[data-slot=popover-content]");
    expect(content).not.toBeNull();
    expect(content?.textContent).toContain("Rename");
    expect(content?.className).toContain("rounded-container");
    expect(content?.getAttribute("data-size")).toBe("default");
    wrapper.unmount();
  });

  it("supports the item size", async () => {
    const wrapper = mountPopover({ size: "item" });
    await nextTick();
    await nextTick();

    const content = document.body.querySelector("[data-slot=popover-content]");
    expect(content?.getAttribute("data-size")).toBe("item");
    expect(content?.className).toContain("w-[400px]");
    wrapper.unmount();
  });

  it("renders a separator with the separator role", async () => {
    const wrapper = mountPopover();
    await nextTick();
    await nextTick();

    expect(document.body.querySelector("[role=separator]")).not.toBeNull();
    wrapper.unmount();
  });
});
