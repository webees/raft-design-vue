import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h } from "vue";

import MessageForwardedBundle from "./MessageForwardedBundle.vue";
import MessageForwardedBundleFooter from "./MessageForwardedBundleFooter.vue";
import MessageForwardedBundleItems from "./MessageForwardedBundleItems.vue";
import {
  MessageForwardedBundleItem,
  MessageForwardedBundleItemContent,
} from "./message-forwarded-bundle-parts";

const originalResizeObserver = globalThis.ResizeObserver;

/**
 * jsdom has no layout: `getBoundingClientRect` always reports 0. The fold is
 * measured from real boxes, so the stub serves every element a fixed height.
 */
function stubRowHeight(height: number) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    height,
    width: 320,
    top: 0,
    left: 0,
    right: 320,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
}

function mountBundle(foldLineLimit?: number) {
  return mount(MessageForwardedBundle, {
    slots: {
      default: () => [
        h(
          MessageForwardedBundleItems,
          { foldLineLimit },
          {
            default: () =>
              h(MessageForwardedBundleItem, null, {
                default: () => h(MessageForwardedBundleItemContent, null, () => "Forwarded"),
              }),
          },
        ),
        h(MessageForwardedBundleFooter),
      ],
    },
  });
}

describe("message-forwarded-bundle fold", () => {
  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver;
    vi.restoreAllMocks();
  });

  it("stays open when the items fit the fold", async () => {
    stubRowHeight(20);
    const wrapper = mountBundle(8);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-slot="message-embed-content"]').attributes("style")).toBeUndefined();
  });

  it("folds measured content past the line limit", async () => {
    stubRowHeight(80);
    const wrapper = mountBundle(1);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-slot="message-embed-content"]').attributes("style")).toContain(
      "max-height: 20px",
    );
  });
});
