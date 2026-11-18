import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import PreviewCard from "./PreviewCard.vue";
import PreviewCardActions from "./PreviewCardActions.vue";
import PreviewCardBody from "./PreviewCardBody.vue";
import PreviewCardDescription from "./PreviewCardDescription.vue";
import PreviewCardEyebrow from "./PreviewCardEyebrow.vue";
import PreviewCardFooter from "./PreviewCardFooter.vue";
import PreviewCardHeader from "./PreviewCardHeader.vue";
import PreviewCardMeta from "./PreviewCardMeta.vue";
import PreviewCardSeparator from "./PreviewCardSeparator.vue";
import PreviewCardTitle from "./PreviewCardTitle.vue";

describe("preview-card", () => {
  it("roots a hover card and renders its slot", () => {
    const wrapper = mount(PreviewCard, { slots: { default: "<span>trigger</span>" } });

    expect(wrapper.text()).toBe("trigger");
  });

  it("lays out the profile head", () => {
    const header = mount(PreviewCardHeader);
    const title = mount(PreviewCardTitle, { slots: { default: "Release notes" } });
    const description = mount(PreviewCardDescription, { slots: { default: "Engineer" } });
    const separator = mount(PreviewCardSeparator);

    expect(header.classes()).toContain("gap-3");
    expect(title.classes()).toContain("text-headline");
    expect(description.attributes("data-slot")).toBe("preview-card-description");
    expect(separator.attributes("role")).toBe("separator");
  });

  it("reuses message card parts for item cards", () => {
    const body = mount(PreviewCardBody);
    const eyebrow = mount(PreviewCardEyebrow, { slots: { default: "APP" } });
    const meta = mount(PreviewCardMeta, { slots: { default: "2 min" } });
    const actions = mount(PreviewCardActions);
    const footer = mount(PreviewCardFooter, { slots: { default: "raft.build" } });

    expect(body.classes()).toContain("p-3");
    expect(eyebrow.classes()).toContain("font-mono");
    expect(meta.classes()).toContain("text-callout");
    expect(actions.classes()).toContain("justify-end");
    expect(footer.element.tagName).toBe("P");
    expect(footer.classes()).toContain("border-t");
  });
});
