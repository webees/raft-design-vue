import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./index";

describe("Card", () => {
  it("renders slots with variant styling", () => {
    const wrapper = mount(Card, { slots: { default: "body" } });
    expect(wrapper.attributes("data-slot")).toBe("card");
    expect(wrapper.classes()).toContain("border-line-hairline");
  });

  it("composes the header and content", () => {
    const Host = defineComponent({
      render() {
        return h(Card, { variant: "inset" }, () => [
          h(CardHeader, () => h(CardTitle, () => "Title")),
          h(CardContent, () => "Body"),
          h(CardFooter, () => "Footer"),
        ]);
      },
    });
    const wrapper = mount(Host);
    expect(wrapper.find("[data-slot=card-title]").text()).toBe("Title");
    expect(wrapper.find("[data-slot=card-content]").text()).toBe("Body");
    expect(wrapper.find("[data-slot=card-footer]").text()).toBe("Footer");
    expect(wrapper.find("[data-slot=card]").classes()).toContain("border-line-hairline");
  });
});
