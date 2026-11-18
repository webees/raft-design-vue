import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { RaftLogo, RaftLogoLockup, RaftWordmark } from ".";

describe("Raft logo", () => {
  it("renders the mark with three paths", () => {
    const wrapper = mount(RaftLogo, { props: { class: "size-8" } });
    expect(wrapper.find("svg").attributes("viewBox")).toBe("0 0 113 104");
    expect(wrapper.findAll("path")).toHaveLength(3);
    expect(wrapper.find("svg").classes()).toContain("size-8");
  });

  it("renders the wordmark and the lockup", () => {
    const wordmark = mount(RaftWordmark);
    expect(wordmark.find("svg").attributes("viewBox")).toBe("128 0 294 104");
    const lockup = mount(RaftLogoLockup);
    expect(lockup.find("svg").attributes("viewBox")).toBe("0 0 422 104");
    expect(lockup.findAll("path")).toHaveLength(6);
  });

  it("switches artwork colours in dark mode", () => {
    const wrapper = mount(RaftLogo);
    const fills = wrapper.findAll("path").map((path) => ({
      fill: path.attributes("fill"),
      className: path.attributes("class"),
    }));
    expect(fills.map((path) => path.fill)).toEqual(["#141111", "#fffaef", "#fffaef"]);
    for (const path of fills) {
      expect(path.className).toBe(
        path.fill === "#141111"
          ? "dark:fill-[oklch(1_0_0)]"
          : "dark:fill-[oklch(0.1813_0.005_17.62)]",
      );
    }
  });
});
