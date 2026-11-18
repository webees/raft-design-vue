import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AnnouncementDialogAction from "./AnnouncementDialogAction.vue";
import AnnouncementDialogBody from "./AnnouncementDialogBody.vue";
import AnnouncementDialogFooter from "./AnnouncementDialogFooter.vue";
import AnnouncementDialogHeader from "./AnnouncementDialogHeader.vue";
import AnnouncementDialogLabel from "./AnnouncementDialogLabel.vue";
import AnnouncementDialogPicture from "./AnnouncementDialogPicture.vue";
import AnnouncementDialogSecondaryAction from "./AnnouncementDialogSecondaryAction.vue";
import AnnouncementDialogText from "./AnnouncementDialogText.vue";

describe("announcement-dialog", () => {
  it("labels the announcement with an attention square", () => {
    const wrapper = mount(AnnouncementDialogLabel, { slots: { default: "What's new" } });

    expect(wrapper.attributes("data-slot")).toBe("announcement-label");
    expect(wrapper.classes()).toContain("text-caption");
    expect(wrapper.find("[aria-hidden=true]").classes()).toContain("bg-attention-400");
  });

  it("scrolls its body natively and caps it at 70dvh", () => {
    const wrapper = mount(AnnouncementDialogBody, { slots: { default: "Notes" } });

    expect(wrapper.attributes("data-slot")).toBe("announcement-body");
    expect(wrapper.classes()).toContain("r-scroll-area");
    expect(wrapper.classes()).toContain("max-h-[70dvh]");
  });

  it("lays out header, picture, text and footer", () => {
    const header = mount(AnnouncementDialogHeader);
    const picture = mount(AnnouncementDialogPicture);
    const text = mount(AnnouncementDialogText, { slots: { default: "<p>Body</p>" } });
    const footer = mount(AnnouncementDialogFooter);

    expect(header.attributes("data-slot")).toBe("announcement-header");
    expect(picture.classes()).toContain("h-44");
    expect(text.classes()).toContain("text-subhead");
    expect(footer.classes()).toContain("justify-between");
  });

  it("makes the primary action the announcement target", () => {
    const action = mount(AnnouncementDialogAction, { slots: { default: "Read more" } });
    const secondary = mount(AnnouncementDialogSecondaryAction, {
      slots: { default: "Dismiss" },
    });

    expect(action.attributes("data-announcement-action")).toBeDefined();
    expect(action.classes()).toContain("font-bold");
    expect(secondary.classes()).toContain("whitespace-normal");
  });
});
