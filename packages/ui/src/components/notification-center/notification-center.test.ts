import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { h, nextTick } from "vue";

import NotificationCenter from "./NotificationCenter.vue";
import NotificationCenterPopup from "./NotificationCenterPopup.vue";
import NotificationCenterTrigger from "./NotificationCenterTrigger.vue";

afterEach(() => {
  document.body.innerHTML = "";
});

function mountCenter(initialFocus: boolean) {
  return mount(NotificationCenter, {
    attachTo: document.body,
    props: { defaultOpen: true },
    slots: {
      default: () => [
        h(NotificationCenterTrigger, {}, { default: () => "Notifications" }),
        h(
          NotificationCenterPopup,
          { initialFocus },
          { default: () => h("button", { id: "first-action" }, "Mark all read") },
        ),
      ],
    },
  });
}

describe("NotificationCenterPopup", () => {
  it("keeps focus on the trigger unless initialFocus is on", async () => {
    mountCenter(false);
    await nextTick();
    await nextTick();

    expect(document.activeElement?.id).not.toBe("first-action");

    document.body.innerHTML = "";
    mountCenter(true);
    await nextTick();
    await nextTick();

    expect(document.activeElement?.id).toBe("first-action");
  });
});
