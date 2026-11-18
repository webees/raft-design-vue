import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { Button } from "../button";
import {
  FileAction,
  FileActions,
  FileContent,
  FileImage,
  FileMeta,
  FileMetaItem,
  FileName,
  FileRow,
  FileRowOpen,
  FilesList,
  FilesPanel,
  FilesViewport,
  FileThumbnail,
} from ".";

const Files = defineComponent({
  setup() {
    return () =>
      h(FilesPanel, { "aria-label": "Files" }, () => [
        h(FilesViewport, () =>
          h(FilesList, () =>
            h(FileRow, () => [
              h(FileRowOpen, { "aria-label": "Open launch-plan.pdf" }, () => [
                h(FileThumbnail, () =>
                  h(FileImage, {
                    src: "/launch-plan.png",
                    alt: "",
                    fit: "contain",
                  }),
                ),
                h(FileContent, () => [
                  h(FileName, () => "launch-plan.pdf"),
                  h(FileMeta, () => [
                    h(FileMetaItem, () => "184 KB"),
                    h(FileMetaItem, () => "Yesterday, 4:18 PM"),
                  ]),
                ]),
              ]),
              h(FileActions, () => [
                h(FileAction, { "aria-label": "Jump to original message" }, () => "↗"),
                h(FileAction, { "aria-label": "Download file" }, () => "↓"),
              ]),
            ]),
          ),
        ),
      ]);
  },
});

describe("Files", () => {
  it("renders the panel, viewport, list and one row per file", () => {
    const wrapper = mount(Files);
    expect(wrapper.find("section[data-slot=files-panel]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=files-viewport]").classes()).toContain("r-scroll-area");
    expect(wrapper.find("[data-slot=files-list]").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot=file-row]")).toHaveLength(1);
    expect(wrapper.attributes("aria-label")).toBe("Files");
  });

  it("keeps row actions outside the row-open button", () => {
    const wrapper = mount(Files);
    const open = wrapper.find("button[data-slot=file-row-open]");
    const actions = wrapper.find("[data-slot=file-actions]");
    expect(open.attributes("type")).toBe("button");
    expect(open.element.contains(actions.element)).toBe(false);
    expect(actions.findAll("button")).toHaveLength(2);
    expect(open.text()).toContain("launch-plan.pdf");
    expect(open.text()).toContain("184 KB");
  });

  it("maps image fit to a data attribute and preserves native image props", () => {
    const wrapper = mount(Files);
    const image = wrapper.find("img[data-slot=file-image]");
    expect(image.attributes("data-fit")).toBe("contain");
    expect(image.attributes("src")).toBe("/launch-plan.png");
    expect(image.attributes("alt")).toBe("");
    expect(image.classes().join(" ")).toContain("data-[fit=contain]:object-contain");
  });

  it("renders file actions as ghost icon buttons by default", () => {
    const wrapper = mount(Files);
    const actions = wrapper.findAll("[data-slot=file-actions] button");
    const action = wrapper.findComponent(FileAction);
    expect(action.findComponent(Button).props("variant")).toBe("ghost");
    expect(action.findComponent(Button).props("size")).toBe("icon-md");
    expect(actions[0]?.attributes("aria-label")).toBe("Jump to original message");
  });

  it("supports rendering a slot as a child element", () => {
    const wrapper = mount(FilesList, {
      props: { asChild: true },
      slots: { default: () => h("ol", { "data-test": "files" }, [h("li", "one")]) },
    });
    expect(wrapper.element.tagName).toBe("OL");
    expect(wrapper.attributes("data-slot")).toBe("files-list");
    expect(wrapper.find("[data-test=files]").exists()).toBe(true);
  });
});
