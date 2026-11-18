import { describe, expect, it } from "vitest";

import { createDragAnnouncements } from "./drag-announcements";
import { moveBetweenLists, placeInList } from "./drag-lists";
import { listKeyboardCoordinates } from "./drag-sensors";

const rect = (top: number, left = 0, width = 100, height = 40) => ({
  top,
  left,
  width,
  height,
});

describe("drag", () => {
  it("finds the next place by keyboard in each direction", () => {
    const a = { id: "a", rect: rect(0) };
    const b = { id: "b", rect: rect(100) };
    const left = { id: "left", rect: rect(100, -200) };
    const right = { id: "right", rect: rect(100, 200) };

    expect(listKeyboardCoordinates(a, [a, b], "down")?.id).toBe("b");
    expect(listKeyboardCoordinates(b, [a, b], "up")?.id).toBe("a");
    expect(listKeyboardCoordinates(b, [left, right], "left")?.id).toBe("left");
    expect(listKeyboardCoordinates(b, [left, right], "right")?.id).toBe("right");
  });

  it("moves an item between lists at a position", () => {
    const items = { todo: ["a", "b"], doing: ["c"] };
    const next = moveBetweenLists(items, "todo", "doing", "b", 1);
    expect(next.todo).toEqual(["a"]);
    expect(next.doing).toEqual(["c", "b"]);
    expect(items.todo).toEqual(["a", "b"]);
  });

  it("places an item in its own list", () => {
    const items = { todo: ["a", "b", "c"] };
    const next = placeInList(items, "c", "todo", 0, ["todo"]);
    expect(next.todo).toEqual(["c", "a", "b"]);
  });

  it("announces a lift, a move over and a drop", () => {
    const announcements = createDragAnnouncements({
      name: (id) => String(id),
      place: (_activeId, overId) => ({
        place: overId == null ? "Todo" : "Doing",
        position: overId == null ? 1 : 2,
        count: 3,
      }),
    });
    expect(announcements.onDragStart({ activeId: "a" })).toContain("Picked up a");
    expect(announcements.onDragOver({ activeId: "a", overId: "doing" })).toContain(
      "Doing, position 2 of 3",
    );
    expect(announcements.onDragEnd({ activeId: "a", overId: "doing" })).toContain("Dropped a");
  });
});
