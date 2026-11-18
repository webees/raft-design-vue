import { createSlotComponent } from "../../lib/create-slot-component";
import { composer } from "./composer.recipe";

export const ComposerToolbar = createSlotComponent({
  name: "RaftComposerToolbar",
  tag: "div",
  dataSlot: "composer-toolbar",
  classes: (className) => composer().toolbar({ class: className }),
});

export const ComposerActions = createSlotComponent({
  name: "RaftComposerActions",
  tag: "div",
  dataSlot: "composer-actions",
  classes: (className) => composer().actions({ class: className }),
});

export const ComposerMeta = createSlotComponent({
  name: "RaftComposerMeta",
  tag: "div",
  dataSlot: "composer-meta",
  classes: (className) => composer().meta({ class: className }),
});
