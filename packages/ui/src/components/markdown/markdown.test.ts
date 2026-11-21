import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  MarkdownCell,
  MarkdownImage,
  MarkdownLink,
  MarkdownList,
  MarkdownListItem,
  MarkdownMark,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownRule,
  MarkdownTable,
  MarkdownTableRow,
} from "./parts";
import MarkdownBlockquote from "./MarkdownBlockquote.vue";
import MarkdownCheckbox from "./MarkdownCheckbox.vue";
import MarkdownHeaderCell from "./MarkdownHeaderCell.vue";
import MarkdownHeading from "./MarkdownHeading.vue";
import MarkdownInlineCode from "./MarkdownInlineCode.vue";
import MarkdownTableScroll from "./MarkdownTableScroll.vue";

describe("markdown", () => {
  it("renders headings with the requested level and slot", () => {
    const h2 = mount(MarkdownHeading, { props: { level: 2 }, slots: { default: "Title" } });
    const h6 = mount(MarkdownHeading, { props: { level: 6 }, slots: { default: "Note" } });

    expect(h2.element.tagName).toBe("H2");
    expect(h2.attributes("data-slot")).toBe("markdown-heading");
    expect(h2.classes()).toContain("text-headline");
    expect(h6.element.tagName).toBe("H6");
    expect(h6.classes()).toContain("text-footnote");
  });

  it("renders inline and block parts with their recipe slots", () => {
    const paragraph = mount(MarkdownParagraph, { slots: { default: "Body" } });
    const link = mount(MarkdownLink, { attrs: { href: "/docs" }, slots: { default: "Docs" } });
    const mark = mount(MarkdownMark, { slots: { default: "hit" } });
    const blockquote = mount(MarkdownBlockquote, { slots: { default: "Quote" } });
    const rule = mount(MarkdownRule);
    const image = mount(MarkdownImage, { attrs: { src: "/a.png", alt: "A" } });
    const inlineCode = mount(MarkdownInlineCode, { slots: { default: "bun" } });

    expect(paragraph.attributes("data-slot")).toBe("markdown-paragraph");
    expect(paragraph.classes()).toContain("mb-1");
    expect(link.attributes("href")).toBe("/docs");
    expect(link.classes()).toContain("decoration-2");
    expect(mark.classes()).toContain("bg-you");
    expect(blockquote.classes()).toContain("not-italic");
    expect(rule.attributes("data-slot")).toBe("markdown-rule");
    expect(image.attributes("alt")).toBe("A");
    expect(image.classes()).toContain("image-transparency-bg");
    expect(inlineCode.element.tagName).toBe("CODE");
    expect(inlineCode.classes()).toContain("wrap-anywhere");
  });

  it("renders unordered and ordered lists", () => {
    const list = mount(MarkdownList, { slots: { default: "<li>One</li>" } });
    const ordered = mount(MarkdownOrderedList, { slots: { default: "<li>One</li>" } });
    const item = mount(MarkdownListItem, { slots: { default: "One" } });

    expect(list.element.tagName).toBe("UL");
    expect(list.classes()).toContain("list-disc");
    expect(ordered.element.tagName).toBe("OL");
    expect(ordered.classes()).toContain("list-decimal");
    expect(item.attributes("data-slot")).toBe("markdown-list-item");
  });

  it("renders a scrollable table frame", () => {
    const wrapper = mount({
      components: {
        MarkdownTableScroll,
        MarkdownTable,
        MarkdownTableRow,
        MarkdownHeaderCell,
        MarkdownCell,
      },
      template: `
        <MarkdownTableScroll>
          <MarkdownTable>
            <MarkdownTableRow>
              <MarkdownHeaderCell>A</MarkdownHeaderCell>
            </MarkdownTableRow>
            <MarkdownTableRow>
              <MarkdownCell>1</MarkdownCell>
            </MarkdownTableRow>
          </MarkdownTable>
        </MarkdownTableScroll>
      `,
    });

    expect(wrapper.get("[data-slot=markdown-table-scroll]").classes()).toContain(
      "rounded-container",
    );
    expect(wrapper.get("[data-slot=markdown-table]").classes()).toContain("border-collapse");
    expect(wrapper.get("[data-slot=markdown-header-cell]").classes()).toContain("bg-fill-muted");
    expect(wrapper.get("[data-slot=markdown-cell]").text()).toBe("1");
  });

  it("keeps task-list checkboxes read-only", async () => {
    const wrapper = mount(MarkdownCheckbox, { props: { defaultChecked: false } });
    const input = wrapper.get("[data-slot=checkbox]");

    expect(input.attributes("aria-checked")).toBe("false");
    await input.trigger("click");
    expect(input.attributes("aria-checked")).toBe("false");
  });
});
