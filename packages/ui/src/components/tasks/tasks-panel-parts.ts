import { fixedPartFactory } from "../../lib/slot-part";
import { tasksPanel } from "./tasks-panel.variants";

const createPart = fixedPartFactory(tasksPanel);

export const TasksPanelToolbar = createPart("TasksPanelToolbar", "toolbar");
export const TasksPanelToolbarGroup = createPart("TasksPanelToolbarGroup", "toolbarGroup");
export const TasksPanelToolbarNewTask = createPart("TasksPanelToolbarNewTask", "toolbarNewTask");
export const TasksPanelToolbarFilters = createPart("TasksPanelToolbarFilters", "toolbarFilters");
export const TasksPanelToolbarView = createPart("TasksPanelToolbarView", "toolbarView");
export const TasksPanelToolbarLabel = createPart("TasksPanelToolbarLabel", "toolbarLabel", "span");
export const TasksPanelEmpty = createPart("TasksPanelEmpty", "empty");
