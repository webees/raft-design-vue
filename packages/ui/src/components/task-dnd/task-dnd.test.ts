import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";

import TaskDndProvider from "./TaskDndProvider.vue";
import TaskDraggable from "./TaskDraggable.vue";
import TaskDragOverlay from "./TaskDragOverlay.vue";
import TaskDropPlaceholder from "./TaskDropPlaceholder.vue";
import TaskDropZone from "./TaskDropZone.vue";

const components = {
  TaskDndProvider,
  TaskDraggable,
  TaskDragOverlay,
  TaskDropPlaceholder,
  TaskDropZone,
};

describe("TaskDnd", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a draggable card and its drop zones", async () => {
    const wrapper = mount({
      components,
      template: `
        <TaskDndProvider>
          <TaskDropZone id="doing">
            <TaskDropPlaceholder id="doing" placement="before" />
            <TaskDraggable id="card" drop-id="card-drop">
              Card
            </TaskDraggable>
          </TaskDropZone>
        </TaskDndProvider>
      `,
    });
    await nextTick();

    expect(wrapper.find('[data-slot="task-draggable"]').text()).toBe("Card");
    expect(wrapper.find('[data-slot="task-drop-zone"]').attributes("data-drop-state")).toBe("idle");
    expect(wrapper.find('[data-slot="task-drop-placeholder"]').exists()).toBe(true);
  });
});
