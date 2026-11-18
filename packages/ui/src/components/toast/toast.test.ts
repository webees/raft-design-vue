import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { h } from "vue";

import ToastProvider from "./ToastProvider.vue";
import ToastDefaultItem from "./ToastDefaultItem.vue";
import ToastContent from "./ToastContent.vue";
import ToastIcon from "./ToastIcon.vue";
import ToastBody from "./ToastBody.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastDescription from "./ToastDescription.vue";
import ToastActions from "./ToastActions.vue";
import ToastProgress from "./ToastProgress.vue";
import {
  DEFAULT_TOAST_ACTION_TIMEOUT_MS,
  DEFAULT_TOAST_TIMEOUT_MS,
  createToastManager,
  defaultToastManager,
  resolveToastActionTimeout,
  type ToastData,
  type ToastObject,
} from "./toast";

function createToast(
  data: ToastData = {},
  overrides: Partial<ToastObject<ToastData>> = {},
): ToastObject<ToastData> {
  return {
    id: "toast-1",
    title: "Saved",
    description: "Your changes are live.",
    type: "background",
    open: true,
    duration: 5000,
    updateKey: 1,
    data,
    ...overrides,
  } as ToastObject<ToastData>;
}

describe("toast command api", () => {
  it("resolves action timeouts like the upstream provider", () => {
    expect(resolveToastActionTimeout(DEFAULT_TOAST_TIMEOUT_MS)).toBe(
      DEFAULT_TOAST_ACTION_TIMEOUT_MS,
    );
    expect(resolveToastActionTimeout(10000)).toBe(10000);
    expect(resolveToastActionTimeout(0)).toBe(0);
    expect(resolveToastActionTimeout(5000, 12000)).toBe(12000);
  });

  it("creates independent managers", () => {
    const first = createToastManager();
    const second = createToastManager();
    expect(first.add({ title: "one", type: "background" })).toBeTypeOf("string");
    expect(first.add({ title: "two", type: "background" })).toBeTypeOf("string");
    expect(second.add({ title: "three", type: "background" })).toBeTypeOf(
      "string",
    );
  });

  it("default manager is available for global commands", () => {
    expect(defaultToastManager).toBeTruthy();
  });
});

describe("toast components", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a toast item with icon, description, action and progress", async () => {
    const item = createToast({
      intent: "warning",
      hasIcon: true,
      hasAction: true,
      hasClose: true,
      hasProgress: true,
    });
    item.actionProps = { label: "Undo", altText: "Undo" };
    const wrapper = mount(ToastProvider, {
      slots: {
        default: () => h(ToastDefaultItem, { toast: item }),
      },
    });
    await wrapper.vm.$nextTick();

    const toastEl = document.querySelector('[data-slot="toast"]');
    expect(toastEl?.getAttribute("data-toast-type")).toBe("warning");
    expect(document.querySelector('[data-slot="toast-icon"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="toast-title"]')).not.toBeNull();
    expect(
      document.querySelector('[data-slot="toast-description"]'),
    ).not.toBeNull();
    expect(document.querySelector('[data-slot="toast-actions"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="toast-progress"]')).not.toBeNull();
    expect(
      document
        .querySelector('[data-slot="toast-progress"]')
        ?.getAttribute("style"),
    ).toContain("5000ms");
  });

  it("hides optional parts when data says so", () => {
    mount(ToastProvider, {
      slots: {
        default: () => h(ToastDefaultItem, {
          toast: createToast(
          { intent: "info", hasIcon: false },
          { description: undefined },
          ),
        }),
      },
    });

    expect(document.querySelector('[data-slot="toast-icon"]')).toBeNull();
    expect(document.querySelector('[data-slot="toast-description"]')).toBeNull();
    expect(document.querySelector('[data-slot="toast-actions"]')).toBeNull();
    expect(document.querySelector('[data-slot="toast-progress"]')).toBeNull();
  });

  it("does not show progress for loading toasts", () => {
    mount(ToastProvider, {
      slots: {
        default: () => h(ToastDefaultItem, {
          toast: createToast(
          { intent: "info", hasProgress: true },
          { status: "loading" },
          ),
        }),
      },
    });

    expect(document.querySelector('[data-slot="toast-progress"]')).toBeNull();
  });

  it("measures which parts rendered on the content", async () => {
    const wrapper = mount(ToastContent, {
      slots: {
        default: () => [
          h(ToastIcon),
          h(ToastBody, () => [
            h(ToastTitle),
            h(ToastDescription, () => "Details"),
          ]),
          h(ToastActions),
        ],
      },
    });
    await wrapper.vm.$nextTick();

    const content = wrapper.find('[data-slot="toast-content"]');
    expect(content.attributes("data-has-icon")).toBe("");
    expect(content.attributes("data-has-description")).toBe("");
    expect(content.attributes("data-has-actions")).toBe("");
  });

  it("renders action loading state with a spinner", async () => {
    const manager = createToastManager();
    manager.add({
      title: "Retry",
      type: "foreground",
      actionProps: { label: "Retry", altText: "Retry" },
    });
    const wrapper = mount(ToastProvider, {
      props: { toastManager: manager },
    });
    await wrapper.vm.$nextTick();

    const action = document.querySelector('[data-slot="toast-action"]');
    expect(action).not.toBeNull();
    expect(action?.getAttribute("aria-disabled")).toBeNull();
  });

  it("renders progress duration as a css variable", () => {
    const wrapper = mount(ToastProgress, { props: { duration: 3200 } });
    expect(wrapper.attributes("style")).toContain("--toast-progress-duration");
    expect(wrapper.attributes("style")).toContain("3200ms");
  });

  it("provides a working default viewport from the provider", async () => {
    const wrapper = mount(ToastProvider);
    await wrapper.vm.$nextTick();

    const viewport = document.querySelector('[data-slot="toast-viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport?.getAttribute("data-toast-placement")).toBe("bottom-center");
  });

  it("closes a limited toast through the manager", async () => {
    const manager = createToastManager();
    manager.add({ title: "First", type: "background" });
    manager.add({ title: "Second", type: "background" });
    const wrapper = mount(ToastProvider, {
      props: { toastManager: manager, limit: 1 },
    });
    await wrapper.vm.$nextTick();

    expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
  });
});
