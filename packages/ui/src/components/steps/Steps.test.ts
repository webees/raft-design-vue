import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { h } from "vue";
import { Step, Steps } from ".";

const statuses = (wrapper: ReturnType<typeof mount>) =>
  wrapper
    .findAll("li")
    .map((item) => /r-step--(process|finish|error|wait)\b/.exec(item.classes().join(" "))?.[1]);

const list = (children: () => unknown[], props: Record<string, unknown> = {}) =>
  mount(Steps, { props, slots: { default: children } });

describe("Steps", () => {
  it("renders an ordered list with a direction modifier", () => {
    const wrapper = list(() => [h(Step, { title: "One" })], { vertical: true });
    const root = wrapper.find("ol");
    expect(root.attributes("data-slot")).toBe("steps");
    expect(root.classes()).toEqual(["r-steps", "r-steps--vertical"]);
    expect(wrapper.findAll("li")).toHaveLength(1);
  });

  it("defaults to a row", () => {
    const wrapper = list(() => [h(Step, { title: "One" })]);
    expect(wrapper.find("ol").classes()).toEqual(["r-steps", "r-steps--horizontal"]);
  });

  it("numbers the steps and derives each status from current", () => {
    const wrapper = list(
      () => [h(Step, { title: "A" }), h(Step, { title: "B" }), h(Step, { title: "C" })],
      { current: 2, status: "error" },
    );
    expect(statuses(wrapper)).toEqual(["finish", "error", "wait"]);
    const [first, second, third] = wrapper.findAll("li");
    expect(second?.attributes("aria-current")).toBe("step");
    expect(first?.attributes("aria-current")).toBeUndefined();
    expect(third?.find(".r-step__index").text()).toBe("3");
  });

  it("puts every step in progress without current, and a step's own status wins", () => {
    const wrapper = list(() => [h(Step, { title: "A" }), h(Step, { title: "B", status: "wait" })]);
    expect(statuses(wrapper)).toEqual(["process", "wait"]);
    expect(wrapper.find("li[aria-current='step']").exists()).toBe(false);
  });

  it("shows the finish and error icons and names those statuses for screen readers", () => {
    const wrapper = list(
      () => [
        h(Step, { title: "Build", icon: () => h("svg", { "data-testid": "ignored" }) }),
        h(Step, { title: "Deploy" }),
        h(Step, { title: "Verify", icon: () => h("svg", { "data-testid": "icon" }) }),
      ],
      {
        current: 2,
        status: "error",
        finishIcon: () => h("svg", { "data-testid": "finish" }),
        errorIcon: () => h("svg", { "data-testid": "error" }),
      },
    );
    expect(wrapper.find("[data-testid='finish']").element.parentElement?.className).toBe(
      "r-step__indicator",
    );
    expect(wrapper.find("[data-testid='error']").element.parentElement?.className).toBe(
      "r-step__indicator",
    );
    expect(wrapper.find("[data-testid='icon']").element.parentElement?.className).toBe(
      "r-step__indicator",
    );
    expect(wrapper.find("[data-testid='ignored']").exists()).toBe(false);
    expect(wrapper.findAll(".r-step__title")[0]?.text()).toBe("Build Completed");
    expect(wrapper.findAll(".r-step__title")[1]?.text()).toBe("Deploy Failed");
    expect(wrapper.findAll(".r-step__title")[2]?.text()).toBe("Verify");
  });

  it("takes the status labels from finishLabel and errorLabel", () => {
    const wrapper = list(() => [h(Step, { title: "A" }), h(Step, { title: "B" })], {
      current: 2,
      status: "error",
      finishLabel: "已完成",
      errorLabel: "失败",
    });
    expect(wrapper.findAll(".r-step__title")[0]?.text()).toBe("A 已完成");
    expect(wrapper.findAll(".r-step__title")[1]?.text()).toBe("B 失败");
  });

  it("renders the description, with children overriding it", () => {
    const wrapper = mount(Step, {
      props: { title: "Deploy", description: "ignored" },
      slots: { default: () => "Ship it" },
    });
    expect(wrapper.find(".r-step__description").text()).toBe("Ship it");
    expect(wrapper.text()).not.toContain("ignored");
  });

  it("has no buttons unless a listener is set", () => {
    const wrapper = list(() => [h(Step, { title: "A" }), h(Step, { title: "B" })], {
      current: 1,
    });
    expect(wrapper.findAll("button")).toHaveLength(0);
  });

  it("reports the clicked step and skips disabled and current steps", async () => {
    const onUpdateCurrent = vi.fn();
    const wrapper = list(
      () => [
        h(Step, { title: "A", description: "First" }),
        h(Step, { title: "B" }),
        h(Step, { title: "C", disabled: true }),
      ],
      { current: 1, onUpdateCurrent },
    );
    const buttons = wrapper.findAll("button");
    expect(buttons[0]?.attributes("aria-describedby")).toBe(
      wrapper.find(".r-step__description").attributes("id"),
    );
    await buttons[0]!.trigger("click");
    expect(onUpdateCurrent).not.toHaveBeenCalled();
    await buttons[1]!.trigger("click");
    expect(onUpdateCurrent).toHaveBeenCalledWith(2);
    expect(buttons[2]?.attributes("disabled")).toBeDefined();
    const items = wrapper.findAll("li");
    expect(items[2]?.classes()).toContain("r-step--disabled");
    expect(items[2]?.classes()).not.toContain("r-step--clickable");
    expect(items[1]?.classes()).toContain("r-step--clickable");
    expect(statuses(wrapper)).toEqual(["process", "wait", "wait"]);
  });

  it("moves the current step on click when uncontrolled", async () => {
    const onUpdateCurrent = vi.fn();
    const wrapper = list(
      () => [h(Step, { title: "A" }), h(Step, { title: "B" }), h(Step, { title: "C" })],
      { defaultCurrent: 1, onUpdateCurrent },
    );
    await wrapper.findAll("button")[2]!.trigger("click");
    expect(onUpdateCurrent).toHaveBeenCalledWith(3);
    expect(statuses(wrapper)).toEqual(["finish", "finish", "process"]);
    expect(wrapper.findAll("li")[2]?.attributes("aria-current")).toBe("step");
  });
});

describe("Step icons", () => {
  it("falls back to the index and renders the icon slot", () => {
    const withoutIcon = list(() => [h(Step, { title: "A" })], { status: "process" });
    expect(withoutIcon.find(".r-step__index").text()).toBe("1");

    const wrapper = mount(Step, {
      props: { title: "A", index: 4, status: "process" },
      slots: { icon: () => h("svg", { "data-testid": "slot-icon" }) },
    });
    expect(wrapper.find("[data-testid='slot-icon']").exists()).toBe(true);
  });
});
