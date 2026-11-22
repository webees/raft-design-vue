import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { CodeBlock, CodeBlockAction } from "./parts";
import CodeBlockBody from "./CodeBlockBody.vue";
import { CodeBlockHeader } from "./parts";
import CodeBlockPre from "./CodeBlockPre.vue";

describe("CodeBlock", () => {
  it("renders the composed block", () => {
    const wrapper = mount({
      components: {
        CodeBlock,
        CodeBlockHeader,
        CodeBlockAction,
        CodeBlockBody,
        CodeBlockPre,
      },
      template: `
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockAction>x</CodeBlockAction>
          </CodeBlockHeader>
          <CodeBlockBody>
            <CodeBlockPre>bun install</CodeBlockPre>
          </CodeBlockBody>
        </CodeBlock>
      `,
    });

    expect(wrapper.attributes("data-slot")).toBe("code-block");
    expect(wrapper.find("[data-slot=code-block-header]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=code-block-pre]").text()).toBe("bun install");
  });

  it("marks an action as a native button", () => {
    const wrapper = mount(CodeBlockAction, { slots: { default: "Copy" } });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("type")).toBe("button");
  });
});
