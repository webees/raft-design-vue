import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import KbdButton from "./KbdButton.vue";
import KbdButtonCaret from "./KbdButtonCaret.vue";
import { KbdButtonPlaceholder } from "./parts";

describe("KbdButton", () => {
  it("is a native button that names its shortcut", () => {
    const wrapper = mount(KbdButton, {
      attrs: { "aria-label": "Change the shortcut for Search", "aria-keyshortcuts": "Meta+K" },
      slots: { default: "<kbd data-slot='kbd'>⌘K</kbd>" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("aria-keyshortcuts")).toBe("Meta+K");
    expect(wrapper.attributes("data-recording")).toBeUndefined();
  });

  it("marks recording and invalid states", () => {
    const Harness = defineComponent({
      components: { KbdButton, KbdButtonPlaceholder, KbdButtonCaret },
      template: `
        <KbdButton recording invalid aria-label="Recording a shortcut">
          <KbdButtonPlaceholder>Press keys</KbdButtonPlaceholder>
          <KbdButtonCaret />
        </KbdButton>
      `,
    });
    const wrapper = mount(Harness);
    expect(wrapper.attributes("data-recording")).toBe("");
    expect(wrapper.attributes("data-invalid")).toBe("");
    expect(wrapper.find("[data-slot='kbd-button-placeholder']").text()).toBe("Press keys");
    expect(wrapper.find("[data-slot='kbd-button-caret']").attributes("aria-hidden")).toBe("true");
  });
});
