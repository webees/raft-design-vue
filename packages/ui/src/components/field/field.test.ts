import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "./index";

describe("Field", () => {
  it("wires the label, control, description and error", () => {
    const Host = defineComponent({
      render() {
        return h(Field, { id: "email", invalid: true }, () => [
          h(FieldLabel, () => "Email"),
          h(FieldControl, { type: "email" }),
          h(FieldDescription, () => "We never share it."),
          h(FieldError, () => "Email is required."),
        ]);
      },
    });
    const wrapper = mount(Host);

    expect(wrapper.attributes("data-slot")).toBe("field");
    expect(wrapper.find("[data-slot=field-label]").attributes("for")).toBe("email");
    expect(wrapper.find("[data-slot=field-control]").attributes("id")).toBe("email");
    expect(wrapper.find("[data-slot=field-control]").attributes("aria-invalid")).toBe("true");
    expect(wrapper.find("[data-slot=field-control]").attributes("aria-describedby")).toBe(
      "email-error",
    );
    expect(wrapper.find("[data-slot=field-error]").text()).toBe("Email is required.");
  });

  it("hides the error until the field is invalid", () => {
    const wrapper = mount(Field, {
      slots: { default: () => h(FieldError, () => "Nope") },
    });
    expect(wrapper.find("[data-slot=field-error]").exists()).toBe(false);
  });
});
