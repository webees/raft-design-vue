import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import Dialog from "./Dialog.vue";
import DialogBody from "./DialogBody.vue";
import DialogClose from "./DialogClose.vue";
import { DialogPortal } from "./DialogPortal";
import DialogContent from "./DialogContent.vue";
import DialogDescription from "./DialogDescription.vue";
import DialogFooter from "./DialogFooter.vue";
import DialogFooterActions from "./DialogFooterActions.vue";
import DialogHeader from "./DialogHeader.vue";
import DialogSheetContent from "./DialogSheetContent.vue";
import DialogTitle from "./DialogTitle.vue";
import { Button } from "../button";

const components = {
  Dialog,
  DialogBody,
  DialogClose,
  DialogPortal,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogFooterActions,
  DialogHeader,
  DialogSheetContent,
  DialogTitle,
  Button,
};

describe("Dialog", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a labelled modal in a portal", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create channel</DialogTitle>
                <DialogDescription>Channels are where work happens.</DialogDescription>
              </DialogHeader>
              <DialogBody>Body</DialogBody>
              <DialogFooter>
                <DialogFooterActions>
                  <Button>Create</Button>
                </DialogFooterActions>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const dialog = document.body.querySelector("[role=dialog]");
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute("aria-labelledby")).toBeTruthy();
    expect(document.body.textContent).toContain("Create channel");
    expect(document.body.querySelector("[data-slot=dialog-overlay]")).not.toBeNull();
    expect(document.body.querySelector("[data-slot=dialog-body]")?.textContent).toBe("Body");
    wrapper.unmount();
  });

  it("applies the selected width", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent size="lg">
              <DialogTitle>Wide enough</DialogTitle>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    expect(document.body.querySelector("[role=dialog]")?.className).toContain("max-w-160");
    wrapper.unmount();
  });

  it("omits the overlay when asked", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent :overlay="false">
              <DialogTitle>No scrim</DialogTitle>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    expect(document.body.querySelector("[role=dialog]")).not.toBeNull();
    expect(document.body.querySelector("[data-slot=dialog-overlay]")).toBeNull();
    wrapper.unmount();
  });

  it("keeps the caller class and desktop bar sizing on the close action", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Close me</DialogTitle>
                <DialogClose class="custom-close" />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const close = document.body.querySelector("[data-slot=dialog-close]");
    expect(close?.className).toContain("custom-close");
    expect(close?.className).toContain("-my-1.5");
    expect(close?.className).toContain("md:pointer-fine:size-(--bar-button-size)");
    expect(close?.getAttribute("aria-label")).toBe("Close");
    wrapper.unmount();
  });

  it("forwards portal attributes without warnings", async () => {
    const warn = vi.spyOn(console, "warn");
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogPortal class="portal-test" data-testid="portal" />
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("Extraneous non-props"));
    wrapper.unmount();
    warn.mockRestore();
  });

  it("takes an overlay object's class names", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent :overlay="{ className: 'overlay-a', class: 'overlay-b' }">
              <DialogHeader><DialogTitle>Overlay</DialogTitle></DialogHeader>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const overlay = document.body.querySelector("[data-slot=dialog-overlay]");
    expect(overlay?.className).toContain("overlay-a");
    expect(overlay?.className).toContain("overlay-b");
    wrapper.unmount();
  });

  it("resets the sheet scope for a dialog opened inside a sheet", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogSheetContent :sheet="true">
              <DialogHeader><DialogTitle>Sheet</DialogTitle></DialogHeader>
              <DialogBody>
                <Dialog default-open>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Nested</DialogTitle></DialogHeader>
                  </DialogContent>
                </Dialog>
              </DialogBody>
            </DialogSheetContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const heads = [...document.body.querySelectorAll("[data-slot=dialog-header]")];
    const sheetHead = heads.find((node) => node.textContent?.includes("Sheet"));
    const nestedHead = heads.find((node) => node.textContent?.includes("Nested"));
    expect(sheetHead?.hasAttribute("data-sheet")).toBe(true);
    expect(nestedHead?.hasAttribute("data-sheet")).toBe(false);
    wrapper.unmount();
  });

  it("wraps the body in a ScrollArea when unstableScrollArea is set", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent>
              <DialogTitle>Scrolling</DialogTitle>
              <DialogBody :unstable-scroll-area="true" wrapper-class-name="min-h-0">
                <p>Body</p>
              </DialogBody>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const frame = document.body.querySelector("[data-slot=dialog-body-frame]");
    const body = frame?.querySelector("[data-slot=dialog-body]");
    expect(frame?.className).toContain("min-h-0");
    expect(body?.className).toContain("r-scroll-area");
    expect(body?.textContent).toContain("Body");
    wrapper.unmount();
  });

  it("gives a nested dialog the nested scrim without an explicit prop", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <Dialog default-open>
            <DialogContent>
              <DialogTitle>Outer</DialogTitle>
              <Dialog default-open>
                <DialogContent>
                  <DialogTitle>Inner</DialogTitle>
                </DialogContent>
              </Dialog>
            </DialogContent>
          </Dialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const overlays = Array.from(document.body.querySelectorAll("[data-slot=dialog-overlay]"));
    expect(overlays).toHaveLength(2);
    expect(overlays[0]?.className).not.toContain("bg-layer-backdrop-nested");
    expect(overlays[1]?.className).toContain("bg-layer-backdrop-nested");
    expect(overlays[1]?.hasAttribute("data-nested")).toBe(true);
    wrapper.unmount();
  });
});
