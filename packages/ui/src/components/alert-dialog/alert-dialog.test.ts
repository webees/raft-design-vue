import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import AlertDialog from "./AlertDialog.vue";
import AlertDialogAction from "./AlertDialogAction.vue";
import AlertDialogBody from "./AlertDialogBody.vue";
import AlertDialogCancel from "./AlertDialogCancel.vue";
import AlertDialogContent from "./AlertDialogContent.vue";
import AlertDialogDescription from "./AlertDialogDescription.vue";
import AlertDialogFooter from "./AlertDialogFooter.vue";
import AlertDialogHeader from "./AlertDialogHeader.vue";
import AlertDialogTitle from "./AlertDialogTitle.vue";

const components = {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
};

describe("AlertDialog", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders an alertdialog with a described decision", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <AlertDialog default-open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogBody>
                <AlertDialogDescription>
                  This removes every channel and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogBody>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const dialog = document.body.querySelector("[role=alertdialog]");
    expect(dialog).not.toBeNull();
    expect(dialog?.textContent).toContain("Delete workspace?");
    expect(dialog?.textContent).toContain("cannot be undone");
    expect(document.body.querySelector("[data-slot=alert-dialog-overlay]")).not.toBeNull();
    expect(document.body.querySelector("[data-slot=alert-dialog-cancel]")?.textContent).toContain(
      "Cancel",
    );
    expect(document.body.querySelector("[data-slot=alert-dialog-action]")?.textContent).toContain(
      "Delete",
    );
    wrapper.unmount();
  });

  it("closes from cancel", async () => {
    const wrapper = mount(
      {
        components,
        template: `
          <AlertDialog default-open>
            <AlertDialogContent>
              <AlertDialogTitle>Discard draft?</AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep editing</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        `,
      },
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();

    const cancel = document.body.querySelector("[data-slot=alert-dialog-cancel]") as HTMLElement;
    cancel.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 50));
    await nextTick();
    await nextTick();

    expect(document.body.querySelector("[role=alertdialog]")).toBeNull();
    wrapper.unmount();
  });
});
