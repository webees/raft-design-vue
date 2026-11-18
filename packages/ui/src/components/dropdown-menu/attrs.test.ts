import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import DropdownMenuFooter from "./DropdownMenuFooter.vue";
import DropdownMenuShortcut from "./DropdownMenuShortcut.vue";

function occurrences(value: string, token: string) {
  return value.split(/\s+/).filter((name) => name === token).length;
}

describe("dropdown menu part attrs", () => {
  it("passes a class once and keeps other attrs", () => {
    const wrapper = mount(DropdownMenuFooter, {
      attrs: { class: "probe-class", id: "probe-id" },
    });
    expect(occurrences(wrapper.attributes("class") ?? "", "probe-class")).toBe(1);
    expect(wrapper.attributes("id")).toBe("probe-id");
  });

  it("passes a class once on a Reka primitive", () => {
    const wrapper = mount(DropdownMenuShortcut, {
      attrs: { class: "probe-class", "data-testid": "probe" },
    });
    expect(occurrences(wrapper.attributes("class") ?? "", "probe-class")).toBe(1);
    expect(wrapper.attributes("data-testid")).toBe("probe");
  });
});
