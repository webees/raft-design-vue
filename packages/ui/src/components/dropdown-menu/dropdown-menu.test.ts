import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { h, nextTick } from "vue";
import DropdownMenu from "./DropdownMenu.vue";
import DropdownMenuContent from "./DropdownMenuContent.vue";
import DropdownMenuItem from "./DropdownMenuItem.vue";
import DropdownMenuItemLabel from "./DropdownMenuItemLabel.vue";
import DropdownMenuSeparator from "./DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "./DropdownMenuTrigger.vue";

afterEach(() => {
  document.body.innerHTML = "";
});

function mountMenu() {
  return mount(DropdownMenu, {
    attachTo: document.body,
    props: { defaultOpen: true },
    slots: {
      default: () =>
        h("div", { style: "display:flex" }, [
          h(DropdownMenuTrigger, {}, { default: () => "More" }),
          h(
            DropdownMenuContent,
            { "aria-label": "Message from Wug" },
            {
              default: () => [
                h(
                  DropdownMenuItem,
                  {},
                  {
                    default: () => h(DropdownMenuItemLabel, {}, { default: () => "Copy link" }),
                  },
                ),
                h(DropdownMenuSeparator),
                h(
                  DropdownMenuItem,
                  {},
                  {
                    default: () => h(DropdownMenuItemLabel, {}, { default: () => "Delete" }),
                  },
                ),
              ],
            },
          ),
        ]),
    },
  });
}

describe("DropdownMenu", () => {
  it("renders a menu with labelled items once open", async () => {
    const wrapper = mountMenu();
    await nextTick();
    await nextTick();

    const content = document.body.querySelector("[data-slot=dropdown-menu-content]");
    expect(content).not.toBeNull();
    expect(document.body.querySelector("[role=menu]")?.getAttribute("aria-label")).toBe(
      "Message from Wug",
    );
    expect(content?.textContent).toContain("Copy link");
    expect(document.body.querySelector("[role=menuitem]")).not.toBeNull();
    expect(document.body.querySelector("[role=separator]")).not.toBeNull();
    wrapper.unmount();
  });

  it("marks disabled items", async () => {
    const wrapper = mount(DropdownMenu, {
      attachTo: document.body,
      props: { defaultOpen: true },
      slots: {
        default: () =>
          h("div", {}, [
            h(DropdownMenuTrigger, {}, { default: () => "More" }),
            h(
              DropdownMenuContent,
              {},
              {
                default: () =>
                  h(
                    DropdownMenuItem,
                    { disabled: true },
                    {
                      default: () => "Unavailable",
                    },
                  ),
              },
            ),
          ]),
      },
    });
    await nextTick();
    await nextTick();

    const item = document.body.querySelector("[data-slot=dropdown-menu-item]");
    expect(item?.getAttribute("aria-disabled")).toBe("true");
    wrapper.unmount();
  });
});
