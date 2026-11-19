import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  Panel,
  PanelAction,
  PanelActions,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderIcon,
  PanelHeading,
  PanelMeta,
  PanelNotice,
  PanelNoticeActions,
  PanelNoticeContent,
  PanelScrollContent,
  PanelScrollViewport,
  PanelSplitAction,
  PanelSplitActionMain,
  PanelSplitActionMenu,
  PanelStatus,
  PanelTitle,
  PanelTitleTrigger,
  PanelToggleAction,
} from ".";

const PanelExample = defineComponent({
  setup() {
    const pressed = ref(false);
    return { pressed };
  },
  render() {
    return h(
      Panel,
      { edge: "attached", "data-test": "panel" },
      {
        default: () => [
          h(PanelHeader, () => [
            h(PanelHeaderIcon, () => h("svg", { "data-test": "icon" })),
            h(PanelHeaderContent, () => [
              h(PanelHeading, () => [
                h(PanelTitle, () => "Project Atlas"),
                h(PanelStatus, () => "Archived"),
              ]),
              h(PanelMeta, { size: "md" }, () => "Edited 4m ago"),
            ]),
            h(PanelActions, () => [
              h(PanelAction, { "aria-label": "Search" }, () => "S"),
              h(
                PanelToggleAction,
                {
                  "aria-label": "Pin panel",
                  pressed: this.pressed,
                  "onUpdate:pressed": (value: boolean) => {
                    this.pressed = value;
                  },
                },
                () => "P",
              ),
            ]),
          ]),
          h(PanelNotice, { status: "warning" }, () => [
            h(PanelNoticeContent, () => "Changes are not saved."),
            h(PanelNoticeActions, () => "Retry"),
          ]),
          h(PanelBody, () =>
            h(PanelScrollViewport, () => h(PanelScrollContent, () => "Panel content")),
          ),
          h(PanelFooter, () => "Footer"),
        ],
      },
    );
  },
});

describe("Panel", () => {
  it("renders the panel structure and edge variant", () => {
    const wrapper = mount(PanelExample);
    expect(wrapper.find("section[data-slot=panel]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=panel]").attributes("data-edge")).toBe("attached");
    expect(wrapper.find("[data-slot=panel-header]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=panel-header-icon]").exists()).toBe(true);
    expect(wrapper.find("[data-slot=panel-title]").text()).toBe("Project Atlas");
    expect(wrapper.find("[data-slot=panel-meta]").attributes("data-size")).toBe("md");
    expect(wrapper.find("[data-slot=panel-footer]").text()).toBe("Footer");
  });

  it("renders the scrolling viewport with the upstream slot contract", () => {
    const wrapper = mount(PanelExample);
    const viewport = wrapper.find("[data-slot=panel-scroll-viewport]");
    expect(viewport.classes()).toContain("r-scroll-area");
    expect(wrapper.find("[data-slot=panel-scroll-content]").text()).toBe("Panel content");
  });

  it("supports uncontrolled and controlled toggle actions", async () => {
    const wrapper = mount(PanelExample);
    const toggle = wrapper.find("[data-slot=panel-toggle-action]");
    expect(toggle.attributes("aria-pressed")).toBe("false");
    await toggle.trigger("click");
    expect(wrapper.vm.pressed).toBe(true);
    expect(wrapper.find("[data-slot=panel-toggle-action]").attributes("aria-pressed")).toBe("true");
    expect(wrapper.find("[data-slot=panel-toggle-action]").attributes("data-pressed")).toBe("");
  });

  it("keeps actions and split actions as separate native buttons", () => {
    const wrapper = mount(PanelSplitAction, {
      slots: {
        default: () => [
          h(PanelSplitActionMain, () => "Comment"),
          h(PanelSplitActionMenu, { "aria-label": "Comment options" }),
        ],
      },
    });
    expect(wrapper.attributes("role")).toBe("group");
    expect(wrapper.findAll("button")).toHaveLength(2);
    expect(wrapper.find("[data-slot=panel-split-action-main]").text()).toBe("Comment");
    expect(wrapper.find("[data-slot=panel-split-action-menu] svg").exists()).toBe(true);
  });

  it("renders title triggers and notice status", () => {
    const wrapper = mount(PanelExample);
    expect(wrapper.find("[data-slot=panel-notice]").attributes("data-status")).toBe("warning");
    expect(wrapper.find("[data-slot=panel-notice-content]").text()).toContain("not saved");
    expect(wrapper.find("[data-slot=panel-notice-actions]").text()).toBe("Retry");

    const trigger = mount(PanelTitleTrigger, {
      slots: { default: () => "Atlas" },
      attrs: { "aria-expanded": "false" },
    });
    expect(trigger.element.tagName).toBe("BUTTON");
    expect(trigger.attributes("type")).toBe("button");
    expect(trigger.find("[data-slot=panel-title-trigger-label]").text()).toBe("Atlas");
    expect(trigger.find("svg").exists()).toBe(true);
  });

  it("supports rendering as a child element", () => {
    const wrapper = mount(PanelHeader, {
      props: { asChild: true },
      slots: { default: () => h("nav", { "data-test": "custom-header" }, "Nav") },
    });
    expect(wrapper.element.tagName).toBe("NAV");
    expect(wrapper.attributes("data-slot")).toBe("panel-header");
    expect(wrapper.text()).toBe("Nav");
  });
});
