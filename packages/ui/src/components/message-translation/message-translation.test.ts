import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MessageItemTranslationAction from "./MessageItemTranslationAction.vue";
import MessageItemTranslationFailedStatus from "./MessageItemTranslationFailedStatus.vue";
import MessageItemTranslationOriginal from "./MessageItemTranslationOriginal.vue";
import MessageItemTranslationOriginalLabel from "./MessageItemTranslationOriginalLabel.vue";
import MessageItemTranslationProgressTrack from "./MessageItemTranslationProgressTrack.vue";
import MessageItemTranslationRetryAction from "./MessageItemTranslationRetryAction.vue";
import MessageItemTranslationStatus from "./MessageItemTranslationStatus.vue";

describe("message-translation", () => {
  it("marks the original as a non-italic blockquote", () => {
    const wrapper = mount(MessageItemTranslationOriginal, { slots: { default: "Bonjour" } });

    expect(wrapper.element.tagName).toBe("BLOCKQUOTE");
    expect(wrapper.attributes("data-slot")).toBe("message-item-translation-original");
    expect(wrapper.classes()).toContain("not-italic");
    expect(wrapper.text()).toBe("Bonjour");
  });

  it("renders labels and statuses with mono meta type", () => {
    const label = mount(MessageItemTranslationOriginalLabel, { slots: { default: "Original" } });
    const status = mount(MessageItemTranslationStatus, { slots: { default: "Translating…" } });
    const failed = mount(MessageItemTranslationFailedStatus, {
      slots: { default: "Translation failed" },
    });

    expect(label.classes()).toContain("font-mono");
    expect(label.attributes("data-slot")).toBe("message-item-translation-original-label");
    expect(status.classes()).toContain("text-foreground-hint");
    expect(failed.classes()).toContain("text-warning-strong");
    expect(failed.attributes("data-slot")).toBe("message-item-translation-status");
  });

  it("slims the progress track to 4px", () => {
    const wrapper = mount(MessageItemTranslationProgressTrack);

    expect(wrapper.attributes("data-slot")).toBe("progress-track");
    expect(wrapper.classes()).toContain("h-1");
    expect(wrapper.classes()).toContain("rounded-sticker");
  });

  it("renders both translation actions as buttons", () => {
    const action = mount(MessageItemTranslationAction, { slots: { default: "Show original" } });
    const retry = mount(MessageItemTranslationRetryAction, { slots: { default: "Retry" } });

    expect(action.attributes("type")).toBe("button");
    expect(action.attributes("data-slot")).toBe("message-item-translation-action");
    expect(action.classes()).toContain("text-caption");
    expect(retry.attributes("data-slot")).toBe("message-item-translation-retry-action");
    expect(retry.classes()).toContain("hover:underline");
  });
});
