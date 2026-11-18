import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CommentMarker from "./CommentMarker.vue";
import { resolveCommentMarginLayout } from "./comment-margin-layout";

describe("Comment", () => {
  it("stacks margin cards without overlapping", () => {
    const { tops, height } = resolveCommentMarginLayout([
      { id: "a", top: 0, height: 100 },
      { id: "b", top: 40, height: 100 },
      { id: "c", top: 42, height: 50 },
    ]);

    expect(tops.a).toBe(0);
    expect(tops.b).toBe(108);
    expect(tops.c).toBe(216);
    expect(height).toBe(266);
  });

  it("keeps the active card at its anchor and pushes earlier cards up", () => {
    const { tops } = resolveCommentMarginLayout(
      [
        { id: "a", top: 200, height: 100 },
        { id: "b", top: 120, height: 100 },
      ],
      { activeId: "b" },
    );

    expect(tops.b).toBe(120);
    expect(tops.a).toBe(228);
  });

  it("marks the active anchor", () => {
    const wrapper = mount(CommentMarker, { props: { active: true }, slots: { default: "2" } });
    expect(wrapper.attributes("data-active")).toBe("");
    expect(wrapper.attributes("data-slot")).toBe("comment-marker");
  });
});
