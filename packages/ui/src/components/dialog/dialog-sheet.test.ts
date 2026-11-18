import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import Dialog from "./Dialog.vue";
import DialogBody from "./DialogBody.vue";
import DialogClose from "./DialogClose.vue";
import DialogFooter from "./DialogFooter.vue";
import DialogHeader from "./DialogHeader.vue";
import DialogSheetBack from "./DialogSheetBack.vue";
import DialogSheetContent from "./DialogSheetContent.vue";
import DialogTitle from "./DialogTitle.vue";
import TextLink from "../text-link/TextLink.vue";

function mountSheet() {
  return mount(
    {
      components: {
        Dialog,
        DialogSheetContent,
        DialogHeader,
        DialogTitle,
        DialogBody,
        DialogFooter,
        TextLink,
      },
      template: `
        <Dialog default-open>
          <DialogSheetContent sheet>
            <DialogHeader>
              <DialogTitle>Create channel</DialogTitle>
            </DialogHeader>
            <DialogBody>Body</DialogBody>
            <DialogFooter>
              <TextLink href="#">Learn more</TextLink>
            </DialogFooter>
          </DialogSheetContent>
        </Dialog>
      `,
    },
    { attachTo: document.body },
  );
}

describe("DialogSheet", () => {
  it("marks the surface and head as a sheet", async () => {
    const wrapper = mountSheet();
    await nextTick();
    await nextTick();
    expect(document.querySelector("[data-sheet]")).not.toBeNull();
    expect(document.querySelector("[data-slot=dialog-header][data-sheet]")).not.toBeNull();
    wrapper.unmount();
  });

  it("moves the footer's silent note to the end of the body", async () => {
    const wrapper = mountSheet();
    await nextTick();
    await nextTick();
    const bodyEnd = document.querySelector("[data-slot=dialog-sheet-body-end]");
    expect(bodyEnd?.textContent).toContain("Learn more");
    expect(document.querySelector("[data-slot=dialog-footer]")?.hasAttribute("hidden")).toBe(true);
    wrapper.unmount();
  });

  it("puts the close first in the DOM, even when written last", async () => {
    const wrapper = mount(
      {
        components: { Dialog, DialogSheetContent, DialogHeader, DialogTitle, DialogClose },
        template: `
          <Dialog default-open>
            <DialogSheetContent sheet>
              <DialogHeader>
                <DialogTitle>Create channel</DialogTitle>
                <DialogClose />
              </DialogHeader>
            </DialogSheetContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const head = document.querySelector("[data-slot=dialog-header]")!;
    expect(head.firstElementChild?.getAttribute("data-slot")).toBe("dialog-close");
    wrapper.unmount();
  });

  it("prefers a back action over close at the start of the head", async () => {
    const wrapper = mount(
      {
        components: {
          Dialog,
          DialogSheetContent,
          DialogHeader,
          DialogTitle,
          DialogClose,
          DialogSheetBack,
        },
        template: `
          <Dialog default-open>
            <DialogSheetContent sheet>
              <DialogHeader>
                <DialogTitle>Step two</DialogTitle>
                <DialogClose />
                <DialogSheetBack />
              </DialogHeader>
            </DialogSheetContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const head = document.querySelector("[data-slot=dialog-header]")!;
    expect(head.firstElementChild?.getAttribute("data-slot")).toBe("dialog-sheet-back");
    wrapper.unmount();
  });
});
