import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import {
  ListRow,
  ListRowBody,
  ListRowChevron,
  ListRowDescription,
  ListRowGroup,
  ListRowMeta,
  ListRowTitle,
  ListRowValue,
} from ".";

describe("ListRow", () => {
  it("renders an interactive row as a button with its parts", () => {
    const wrapper = mount(ListRow, {
      props: { tone: "unread" },
      slots: {
        default: () => [
          h(ListRowBody, null, {
            default: () => [
              h(ListRowTitle, null, { default: () => "Avery Chen" }),
              h(ListRowDescription, null, {
                default: () => "See you at the workshop",
              }),
            ],
          }),
        ],
      },
    });
    const row = wrapper.find("[data-slot='list-row']");
    expect(row.element.tagName).toBe("BUTTON");
    expect(row.attributes("data-tone")).toBe("unread");
    expect(row.attributes("data-interactive")).toBe("");
    expect(wrapper.find("[data-slot='list-row-title']").text()).toBe("Avery Chen");
    expect(wrapper.find("[data-slot='list-row-description']").text()).toBe(
      "See you at the workshop",
    );
  });

  it("renders a non-interactive selected row and supports the plain variant", () => {
    const wrapper = mount(ListRow, {
      props: { interactive: false, selected: true, variant: "plain" },
      slots: {
        default: () => [
          h(ListRowValue, null, { default: () => "Enabled" }),
          h(ListRowChevron),
        ],
      },
    });
    const row = wrapper.find("[data-slot='list-row']");
    expect(row.element.tagName).toBe("DIV");
    expect(row.attributes("data-selected")).toBe("");
    expect(row.classes()).toContain("py-(--settings-row-inset)");
    expect(wrapper.find("[data-slot='list-row-chevron'] svg").exists()).toBe(true);
  });

  it("groups rows in the card container", () => {
    const wrapper = mount(ListRowGroup, {
      slots: { default: () => "Rows" },
    });
    expect(wrapper.find("[data-slot='list-row-group']").classes()).toContain(
      "rounded-container",
    );
  });

  it("renders meta in tabular mono type", () => {
    const wrapper = mount(ListRowMeta, { slots: { default: () => "2m" } });
    expect(wrapper.find("[data-slot='list-row-meta']").classes()).toContain("font-mono");
  });
});
