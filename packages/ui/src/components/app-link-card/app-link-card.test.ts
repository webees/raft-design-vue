import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import {
  AppLinkCard,
  AppLinkCardActions,
  AppLinkCardBadge,
  AppLinkCardBody,
  AppLinkCardEyebrow,
  AppLinkCardHeader,
  AppLinkCardHost,
  AppLinkCardIcon,
  AppLinkCardMeta,
  AppLinkCardName,
  AppLinkCardPlaceholder,
  AppLinkCardTitle,
} from ".";

const Example = defineComponent({
  render() {
    return h(AppLinkCard, { "aria-labelledby": "title" }, () => [
      h(AppLinkCardHeader, () => [
        h(AppLinkCardIcon, () => "▦"),
        h(AppLinkCardName, () => "Acme"),
        h(AppLinkCardHost, () => "acme.test"),
      ]),
      h(AppLinkCardBody, () => [
        h(AppLinkCardEyebrow, () => "Issue"),
        h(AppLinkCardTitle, { id: "title" }, () => "Ship the release"),
        h(AppLinkCardMeta, () => [h(AppLinkCardBadge, () => "In progress")]),
      ]),
      h(AppLinkCardActions, () => [h("button", "Open")]),
    ]);
  },
});

describe("AppLinkCard", () => {
  it("renders the card frame and every part", () => {
    const wrapper = mount(Example);
    expect(wrapper.find('[data-slot="app-link-card"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="app-link-card-name"]').text()).toBe("Acme");
    expect(wrapper.find('[data-slot="app-link-card-host"]').text()).toBe("acme.test");
    expect(wrapper.find('[data-slot="app-link-card-title"]').text()).toBe("Ship the release");
    expect(wrapper.find('[data-slot="app-link-card-actions"]').text()).toBe("Open");
  });

  it("keeps the placeholder busy and labelable", () => {
    const wrapper = mount(AppLinkCardPlaceholder, {
      slots: { default: "Header" },
    });
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.text()).toContain("Header");
  });

  it("applies a custom fill to the badge", () => {
    const wrapper = mount(AppLinkCardBadge, { props: { fill: "#3366ff" } });
    expect(wrapper.attributes("style")).toContain("--badge-fill: #3366ff");
  });
});
