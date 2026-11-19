import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
  TaskChip,
  TaskLoadingList,
  TaskLoadingRow,
  TaskStatusBadge,
  TaskStatusIcon,
  TasksPanelEmpty,
  TasksPanelRoot,
  TasksPanelToolbar,
  TasksPanelToolbarLabel,
  TasksPanelViewport,
} from ".";
import {
  TaskBoardColumn,
  TaskBoardColumnEmpty,
  TaskBoardColumnPanel,
  TaskBoardColumnTrigger,
  TaskBoardRoot,
} from "../task-board";
import { TaskCard, TaskCardMeta, TaskCardStatus, TaskCardTitle } from "../task-card";
import {
  TaskListRoot,
  TaskSection,
  TaskSectionBadge,
  TaskSectionCount,
  TaskSectionHeading,
  TaskSectionPanel,
  TaskSectionTrigger,
} from "../task-list";

describe("Tasks", () => {
  it("renders a task chip with its status and inline reference hook", () => {
    const wrapper = mount(TaskChip, {
      props: { status: "in-progress" },
      slots: { default: "In progress" },
    });
    const chip = wrapper.get("[data-slot=task-chip]");
    expect(chip.attributes("data-inline-reference")).toBe("");
    expect(chip.classes().join(" ")).toContain("bg-task-status-in-progress-soft");
    expect(chip.text()).toBe("In progress");
  });

  it("marks loading chips", () => {
    const wrapper = mount(TaskChip, {
      props: { status: "todo", loading: true },
    });
    expect(wrapper.get("[data-slot=task-chip]").attributes("data-loading")).toBe("true");
  });

  it("renders the status pixel with the status fill", () => {
    const wrapper = mount(TaskStatusIcon, { props: { status: "done" } });
    const icon = wrapper.get("[data-slot=task-status-icon]");
    expect(icon.attributes("data-status")).toBe("done");
    expect(icon.get("rect").attributes("style")).toContain("--task-status-done");
  });

  it("renders a status badge with the icon and label", () => {
    const wrapper = mount(TaskStatusBadge, {
      props: { status: "in-review" },
      slots: { default: "In review" },
    });
    const badge = wrapper.get("[data-slot=task-status-badge]");
    expect(badge.attributes("data-status")).toBe("in-review");
    expect(badge.find("[data-slot=task-status-icon]").exists()).toBe(true);
    expect(badge.text()).toBe("In review");
  });

  it("renders the tasks panel shell and loading rows", () => {
    const wrapper = mount(
      defineComponent({
        render: () =>
          h(TasksPanelRoot, () => [
            h(TasksPanelToolbar, () => [h(TasksPanelToolbarLabel, () => "Board")]),
            h(TasksPanelViewport, () => [
              h(TaskLoadingList, () => [h(TaskLoadingRow), h(TaskLoadingRow)]),
              h(TasksPanelEmpty, () => "No tasks"),
            ]),
          ]),
      }),
    );
    expect(wrapper.find("section[data-slot=tasks-panel-root]").exists()).toBe(true);
    expect(wrapper.findAll("[data-slot=task-loading-row]")).toHaveLength(2);
    expect(wrapper.get("[data-slot=task-loading-list]").attributes("aria-busy")).toBe("true");
    expect(wrapper.get("[data-slot=tasks-panel-viewport]").classes()).toContain("r-scroll-area");
    expect(wrapper.get("[data-slot=tasks-panel-viewport]").attributes("data-slot")).toBe(
      "tasks-panel-viewport",
    );
  });

  it("opens and closes a task section", async () => {
    const wrapper = mount(TaskSection, {
      props: { defaultOpen: true },
      slots: {
        default: () => [
          h(TaskSectionTrigger, () => [
            h(TaskSectionHeading, () => "Todo"),
            h(TaskSectionCount, () => "2"),
          ]),
          h(TaskSectionPanel, () => "Section content"),
        ],
      },
    });
    const root = wrapper.get("[data-slot=task-section]");
    expect(root.attributes("data-panel-open")).toBe("");
    await wrapper.get("[data-slot=task-section-trigger]").trigger("click");
    expect(root.attributes("data-panel-open")).toBeUndefined();
  });

  it("renders a section badge with the status pixel", () => {
    const wrapper = mount(TaskSectionBadge, {
      props: { status: "closed" },
      slots: { default: "Closed" },
    });
    expect(wrapper.get("[data-slot=task-section-badge]").text()).toContain("Closed");
    expect(wrapper.find("[data-status=closed]").exists()).toBe(true);
  });

  it("renders the task list shell", () => {
    const wrapper = mount(TaskListRoot, {
      slots: { default: () => h(TaskSection, () => "Section") },
    });
    expect(wrapper.get("[data-slot=task-list-root]").classes().join(" ")).toContain("stack-y-6");
  });

  it("renders task card metadata and status", () => {
    const wrapper = mount(TaskCard, {
      props: { busy: true },
      slots: {
        default: () => [
          h(TaskCardMeta, () => "ENG-42"),
          h(TaskCardTitle, () => "Ship the board"),
          h(TaskCardStatus, { status: "todo" }, () => "Todo"),
        ],
      },
    });
    expect(wrapper.get("[data-slot=task-card]").attributes("data-busy")).toBe("true");
    expect(wrapper.get("[data-slot=task-card-status]").classes().join(" ")).toContain(
      "bg-task-status-todo-soft",
    );
  });

  it("opens and closes a task board column", async () => {
    const wrapper = mount(TaskBoardColumn, {
      props: { defaultOpen: true },
      slots: {
        default: () => [
          h(TaskBoardColumnTrigger, () => "Todo"),
          h(TaskBoardColumnPanel, () => [h(TaskBoardColumnEmpty, () => "No tasks")]),
        ],
      },
    });
    const column = wrapper.get("[data-slot=task-board-column]");
    expect(column.attributes("data-panel-open")).toBe("");
    await wrapper.get("[data-slot=task-board-column-trigger]").trigger("click");
    expect(column.attributes("data-panel-open")).toBeUndefined();
  });

  it("renders the task board shell", () => {
    const wrapper = mount(TaskBoardRoot, {
      slots: { default: () => h(TaskBoardColumn, () => "Column") },
    });
    expect(wrapper.get("[data-slot=task-board-root]").classes().join(" ")).toContain("min-w-max");
  });
});
