import { mount } from "@vue/test-utils";
import { h } from "vue";
import { describe, expect, it, vi } from "vitest";
import TaskCompletionControl from "./TaskCompletionControl.vue";

describe("TaskCompletionControl", () => {
  it("exposes checkbox semantics", () => {
    const wrapper = mount(TaskCompletionControl, {
      props: { checked: true, "aria-label": "#25 Fix onboarding copy" },
    });

    expect(wrapper.attributes("role")).toBe("checkbox");
    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("aria-checked")).toBe("true");
    expect(wrapper.attributes("aria-label")).toBe("#25 Fix onboarding copy");
    expect(wrapper.attributes("data-checked")).toBe("");
    expect(wrapper.find("[data-slot=checkbox-indicator-graphic]").exists()).toBe(true);
  });

  it("asks for the opposite state on click and stops propagation", async () => {
    const parentClick = vi.fn();
    const handleClick = vi.fn();
    const wrapper = mount({
      render: () =>
        h("div", { onClick: parentClick }, [
          h(TaskCompletionControl, {
            checked: false,
            "aria-label": "Task",
            onClick: handleClick,
          }),
        ]),
    });

    await wrapper.get("[data-slot=task-completion-control]").trigger("click");

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(parentClick).not.toHaveBeenCalled();
  });

  it("stays focusable but inert when disabled", async () => {
    const wrapper = mount(TaskCompletionControl, {
      props: { checked: false, disabled: true, "aria-label": "Task" },
    });

    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.attributes("disabled")).toBeUndefined();
    expect(wrapper.attributes("data-disabled")).toBe("");

    await wrapper.trigger("click");
    expect(wrapper.emitted("checkedChange")).toBeUndefined();
  });

  it("only Space toggles; Enter stays with the row", async () => {
    const wrapper = mount(TaskCompletionControl, {
      props: { checked: false, "aria-label": "Task" },
    });

    const space = new KeyboardEvent("keydown", { key: " ", cancelable: true, bubbles: true });
    wrapper.element.dispatchEvent(space);
    expect(space.defaultPrevented).toBe(false);

    const enter = new KeyboardEvent("keydown", { key: "Enter", cancelable: true, bubbles: true });
    wrapper.element.dispatchEvent(enter);
    expect(enter.defaultPrevented).toBe(true);
  });
});
