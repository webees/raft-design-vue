import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import Composer from "./Composer.vue";
import { ComposerAttachment as CommentAttachmentPart } from "./composer-attachment-parts";
import ComposerAttachmentRemove from "./ComposerAttachmentRemove.vue";
import ComposerInput from "./ComposerInput.vue";
import ComposerSubmit from "./ComposerSubmit.vue";
import { ComposerToolbar } from "./composer-parts";
import { useComposerSuggestions } from "./use-composer-suggestions";

describe("Composer", () => {
  it("renders the input, toolbar and submit", async () => {
    const wrapper = mount({
      components: { Composer, ComposerInput, ComposerSubmit, ComposerToolbar },
      template: `
        <Composer>
          <ComposerInput placeholder="Write a message" />
          <ComposerToolbar>
            <ComposerSubmit>Send</ComposerSubmit>
          </ComposerToolbar>
        </Composer>
      `,
    });
    await nextTick();

    expect(wrapper.find('[data-slot="composer-input"]').exists()).toBe(true);
    expect(wrapper.find("textarea").attributes("placeholder")).toBe("Write a message");
    expect(wrapper.find('[data-slot="composer-submit"]').text()).toBe("Send");
  });

  it("renders an attachment with its remove button", async () => {
    const wrapper = mount({
      components: {
        ComposerAttachment: CommentAttachmentPart,
        ComposerAttachmentRemove,
      },
      template: `
        <ComposerAttachment>
          <span>report.pdf</span>
          <ComposerAttachmentRemove aria-label="Remove" />
        </ComposerAttachment>
      `,
    });

    expect(wrapper.find('[data-slot="composer-attachment"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="composer-attachment-remove"]').attributes("type")).toBe("button");
  });

  it("detects a trigger, highlights items and selects one", async () => {
    const value = { current: "Hi @" };
    const suggestions = useComposerSuggestions({
      value: () => value.current,
      onValueChange: (next) => {
        value.current = next;
      },
      detectTrigger: (text) => {
        const at = text.lastIndexOf("@");
        return at < 0 ? null : { marker: "@", query: text.slice(at + 1), start: at };
      },
      getItems: () => [{ id: "ada", label: "ada" }, { id: "lin", label: "lin" }],
      getItemText: (item) => `@${item.label}`,
    });

    const input = document.createElement("textarea");
    input.value = "Hi @";
    input.selectionStart = input.value.length;
    const inputProps = suggestions.getInputProps();
    (inputProps.onInput as (event: Event) => void)({
      currentTarget: input,
    } as unknown as Event);
    expect(suggestions.items.value).toHaveLength(2);

    const keydown = inputProps.onKeydown as (event: KeyboardEvent) => void;
    keydown({ key: "ArrowDown", preventDefault() {} } as KeyboardEvent);
    expect(suggestions.highlightedIndex.value).toBe(1);
    suggestions.select(suggestions.items.value[1]!);

    expect(value.current).toBe("Hi @lin");
  });
});
