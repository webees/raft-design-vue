import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Status from "./Status.vue";

describe("Status", () => {
  it("paints presence over the variant colour", () => {
    const status = mount(Status, {
      props: { presence: "busy", variant: "default" },
      attrs: { "aria-label": "Busy" },
    });
    const el = status.get('[data-slot="status"]');
    expect(el.attributes("aria-label")).toBe("Busy");
    expect(el.attributes("data-presence")).toBe("busy");
    expect(el.classes()).toContain("[--status-color:var(--presence-busy)]");
  });

  it("falls back to the variant colour", () => {
    const status = mount(Status, { props: { variant: "danger" } });
    expect(status.get('[data-slot="status"]').classes()).toContain(
      "[--status-color:var(--danger)]",
    );
  });
});
