import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { detectKeyboardPlatform, resetDetectedPlatform } from "../../lib/use-platform";
import KbdShortcut from "./KbdShortcut.vue";
import { resolveKbdKeys } from "./kbd-keys";

describe("resolveKbdKeys", () => {
  it("draws modifiers in the platform's order, whatever order written", () => {
    expect(resolveKbdKeys(["shift", "mod", "alt"], "mac").map((key) => key.label)).toEqual([
      "Option",
      "Shift",
      "Command",
    ]);
    expect(resolveKbdKeys(["shift", "mod", "alt"], "other").map((key) => key.label)).toEqual([
      "Control",
      "Alt",
      "Shift",
    ]);
  });

  it("keeps other keys in written order after the modifiers", () => {
    expect(resolveKbdKeys(["k", "mod", "enter"], "mac").map((key) => key.name)).toEqual([
      "mod",
      "k",
      "enter",
    ]);
  });

  it("draws one key once when two names mean the same modifier", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(resolveKbdKeys(["ctrl", "control"], "other")).toHaveLength(1);
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("uses spoken names for punctuation", () => {
    expect(resolveKbdKeys(["/"], "mac")[0]?.label).toBe("Slash");
    expect(resolveKbdKeys(["?"], "other")[0]?.label).toBe("Question Mark");
    expect(resolveKbdKeys(["&"], "other")[0]?.label).toBe("Ampersand");
  });

  it("draws single letters as capitals and keeps function keys", () => {
    expect(resolveKbdKeys(["k", "F5"], "other").map((key) => key.text)).toEqual(["K", "F5"]);
  });
});

describe("KbdShortcut", () => {
  it("renders the caps and a spoken label", () => {
    const wrapper = mount(KbdShortcut, {
      props: { keys: ["mod", "shift", "k"], platform: "mac" },
    });
    expect(wrapper.find("[data-slot=kbd-shortcut]").attributes("data-platform")).toBe("mac");
    expect(wrapper.findAll("[data-slot=kbd]")).toHaveLength(3);
    expect(wrapper.find("[data-slot=kbd-shortcut-label]").text()).toBe("Shift Command K");
  });

  it("lets the label override the spoken summary", () => {
    const wrapper = mount(KbdShortcut, {
      props: { keys: ["mod", "enter"], platform: "other", label: "Send message" },
    });
    expect(wrapper.find("[data-slot=kbd-shortcut-label]").text()).toBe("Send message");
  });
});

describe("detectKeyboardPlatform", () => {
  it("prefers Client Hints, then navigator.platform", () => {
    resetDetectedPlatform();
    expect(
      detectKeyboardPlatform({ platform: "Win32", userAgentData: { platform: "macOS" } }),
    ).toBe("mac");
    expect(detectKeyboardPlatform({ platform: "MacIntel" })).toBe("mac");
    expect(detectKeyboardPlatform({ platform: "Linux x86_64" })).toBe("other");
  });
});
