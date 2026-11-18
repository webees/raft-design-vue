import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FilePreview from "./FilePreview.vue";
import FilePreviewBadge from "./FilePreviewBadge.vue";
import FilePreviewCode from "./FilePreviewCode.vue";
import FilePreviewDocument from "./FilePreviewDocument.vue";
import FilePreviewFile from "./FilePreviewFile.vue";
import FilePreviewMedia from "./FilePreviewMedia.vue";

describe("file-preview", () => {
  it("frames a 40px icon", () => {
    const wrapper = mount(FilePreview, { slots: { default: "<span />" } });

    expect(wrapper.attributes("data-slot")).toBe("file-preview");
    expect(wrapper.classes()).toContain("h-10");
    expect(wrapper.classes()).toContain("w-10");
  });

  it.each([
    [FilePreviewDocument, "file-preview-document"],
    [FilePreviewFile, "file-preview-file"],
    [FilePreviewCode, "file-preview-code"],
    [FilePreviewMedia, "file-preview-media"],
  ])("renders the %s page shape", (component, slot) => {
    const wrapper = mount(component);

    expect(wrapper.attributes("data-slot")).toBe(slot);
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.classes()).toContain("ring-line-hairline");
  });

  it("tags a type in the corner by default and inline when asked", () => {
    const corner = mount(FilePreviewBadge, { slots: { default: "PDF" } });
    const inline = mount(FilePreviewBadge, {
      props: { placement: "inline" },
      slots: { default: "PDF" },
    });

    expect(corner.classes()).toContain("-right-1.5");
    expect(inline.classes()).toContain("h-3.5");
    expect(corner.text()).toBe("PDF");
  });
});
