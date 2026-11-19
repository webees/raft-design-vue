import { afterEach, describe, expect, it } from "vitest";

import { attachTapActivation } from "./tap-activation";

const touch = (identifier: number, clientX = 0, clientY = 0, touchType = "direct") =>
  ({ identifier, clientX, clientY, touchType }) as unknown as Touch;

let detach: (() => void) | undefined;

function dispatch(element: HTMLElement, type: string, init: Record<string, unknown>) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, init);
  element.dispatchEvent(event);
  return event;
}

function mountButton() {
  const button = document.createElement("button");
  document.body.append(button);
  let clicks = 0;
  button.addEventListener("click", () => clicks++);
  detach = attachTapActivation(button);
  return { button, clicks: () => clicks };
}

describe("attachTapActivation", () => {
  afterEach(() => {
    detach?.();
    detach = undefined;
    document.body.innerHTML = "";
  });

  it("clicks when the finger lifts, and swallows the browser's echo click", () => {
    const { button, clicks } = mountButton();

    dispatch(button, "touchstart", { touches: [touch(1)], changedTouches: [touch(1)] });
    const end = dispatch(button, "touchend", { touches: [], changedTouches: [touch(1)] });

    expect(end.defaultPrevented).toBe(true);
    expect(clicks()).toBe(1);

    const echo = new MouseEvent("click", { bubbles: true, cancelable: true });
    button.dispatchEvent(echo);
    expect(echo.defaultPrevented).toBe(true);
    expect(clicks()).toBe(1);
  });

  it("does not activate when the finger moved past the slop", () => {
    const { button, clicks } = mountButton();

    dispatch(button, "touchstart", { touches: [touch(1)], changedTouches: [touch(1)] });
    dispatch(button, "touchmove", { touches: [touch(1, 40, 0)], changedTouches: [] });
    dispatch(button, "touchend", { touches: [], changedTouches: [touch(1, 40, 0)] });

    expect(clicks()).toBe(0);
  });
});
