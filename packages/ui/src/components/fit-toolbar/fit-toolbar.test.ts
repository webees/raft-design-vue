import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h } from "vue";

import FitToolbar from "./FitToolbar.vue";
import {
  FIT_SEARCH_MAX_LEAST,
  STEPS,
  fitPlaceholder,
  keepsArrow,
  measure,
  readingOrder,
} from "./fit-toolbar-measure";

const rect = (left: number, top: number, width: number, height = 10) =>
  ({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

function show(element: Element, box = rect(0, 0, 10)) {
  Object.defineProperty(element, "getClientRects", { value: () => [box] });
  Object.defineProperty(element, "getBoundingClientRect", { value: () => box });
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("fit toolbar steps", () => {
  it("gives way label, more, collapse, wrap, plus", () => {
    expect(STEPS).toEqual(["label", "more", "collapse", "wrap", "plus"]);
  });

  it("caps a search's measured least width", () => {
    expect(FIT_SEARCH_MAX_LEAST).toBe(120);
  });
});

describe("readingOrder", () => {
  it("keeps shown controls in DOM order and leaves out hidden ones", () => {
    const root = document.createElement("div");
    const first = document.createElement("button");
    const hidden = document.createElement("button");
    const inert = document.createElement("button");
    const disabled = document.createElement("button");
    hidden.setAttribute("aria-hidden", "true");
    inert.setAttribute("inert", "");
    disabled.disabled = true;
    root.append(first, hidden, inert, disabled);
    document.body.append(root);
    for (const element of [first, hidden, inert, disabled]) {
      show(element);
    }

    expect(readingOrder(root)).toEqual([first]);
  });

  it("reads wrapped lines in the order they show, not the DOM's", () => {
    const root = document.createElement("div");
    const line = document.createElement("div");
    const first = document.createElement("button");
    const second = document.createElement("button");
    line.append(second, first);
    root.append(line);
    document.body.append(root);
    for (const element of [first, second]) {
      show(element);
    }
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      (element) =>
        ({
          display: "block",
          order: element === line ? "2" : "0",
        }) as CSSStyleDeclaration,
    );

    expect(readingOrder(root)).toEqual([second, first]);
  });
});

describe("keepsArrow", () => {
  it("keeps an arrow key while a text field's caret can move", () => {
    const input = document.createElement("input");
    input.value = "hello";
    input.setSelectionRange(2, 2);
    expect(keepsArrow(input, true)).toBe(true);
    expect(keepsArrow(input, false)).toBe(true);

    input.setSelectionRange(0, 0);
    expect(keepsArrow(input, false)).toBe(false);
    expect(keepsArrow(input, true)).toBe(true);

    input.setSelectionRange(5, 5);
    expect(keepsArrow(input, true)).toBe(false);
    expect(keepsArrow(input, false)).toBe(true);

    input.setSelectionRange(1, 3);
    expect(keepsArrow(input, true)).toBe(true);
  });

  it("lets arrows leave anything else", () => {
    expect(keepsArrow(document.createElement("button"), true)).toBe(false);
  });
});

describe("fitPlaceholder", () => {
  const width = (text: string) => text.length * 10;

  it("keeps the whole text when it fits", () => {
    expect(fitPlaceholder("Search", 100, width)).toBe("Search");
  });

  it("cuts at a word, then a character, then an ellipsis", () => {
    expect(fitPlaceholder("Search all tasks", 60, width)).toBe("Searc…");
    expect(fitPlaceholder("搜索所有任务", 25, width)).toBe("搜…");
    expect(fitPlaceholder("Search", 5, width)).toBe("");
  });
});

describe("measure", () => {
  it("gives way an item that has a step before one that has none", () => {
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          paddingRight: "0px",
          paddingLeft: "0px",
          columnGap: "0px",
          display: "block",
          order: "0",
        }) as CSSStyleDeclaration,
    );
    const root = document.createElement("div");
    root.setAttribute("data-slot", "fit-toolbar");
    const item = document.createElement("button");
    item.setAttribute("data-fit-id", "a");
    item.setAttribute("data-fit-steps", "more:0");
    const plain = document.createElement("button");
    plain.setAttribute("data-fit-id", "b");
    const trigger = document.createElement("button");
    trigger.setAttribute("data-fit-more-trigger", "");
    root.append(item, plain, trigger);
    document.body.append(root);

    show(root, rect(0, 0, 100));
    const children = [item, plain, trigger];
    children.forEach((child, index) => {
      show(child, rect(index * 60, 0, 60));
    });

    const applied = measure(root, false);
    expect(applied.more).toEqual(["a"]);
    expect(applied.items.get("a")).toEqual(new Set(["more"]));
    expect(applied.items.has("b")).toBe(false);
  });
});

describe("FitToolbar", () => {
  it("renders a toolbar and re-measures without throwing", async () => {
    const wrapper = mount(FitToolbar, {
      slots: { default: () => h("button", { type: "button" }, "Mine") },
    });
    expect(wrapper.attributes("role")).toBe("toolbar");
    expect(wrapper.attributes("data-slot")).toBe("fit-toolbar");
    wrapper.vm.measure();
    await wrapper.vm.$nextTick();
    wrapper.unmount();
  });
});
