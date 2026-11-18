import { createSlotComponent } from "../../lib/create-slot-component";
import { lightbox } from "./lightbox.recipe";

export const LightboxHeader = createSlotComponent({
  name: "RaftLightboxHeader",
  tag: "div",
  dataSlot: "lightbox-header",
  classes: (className) => lightbox().header({ class: className }),
});

export const LightboxToolbar = createSlotComponent({
  name: "RaftLightboxToolbar",
  tag: "div",
  dataSlot: "lightbox-toolbar",
  classes: (className) => lightbox().toolbar({ class: className }),
});

export const LightboxHeaderMeta = createSlotComponent({
  name: "RaftLightboxHeaderMeta",
  tag: "div",
  dataSlot: "lightbox-header-meta",
  classes: (className) => lightbox().headerMeta({ class: className }),
});

export const LightboxHeaderLabel = createSlotComponent({
  name: "RaftLightboxHeaderLabel",
  tag: "span",
  dataSlot: "lightbox-header-label",
  classes: (className) => lightbox().headerLabel({ class: className }),
});

export const LightboxTitle = createSlotComponent({
  name: "RaftLightboxTitle",
  tag: "div",
  dataSlot: "lightbox-title",
  classes: (className) => lightbox().title({ class: className }),
});

export const LightboxActions = createSlotComponent({
  name: "RaftLightboxActions",
  tag: "div",
  dataSlot: "lightbox-actions",
  classes: (className) => lightbox().actions({ class: className }),
});

export const LightboxStage = createSlotComponent({
  name: "RaftLightboxStage",
  tag: "div",
  dataSlot: "lightbox-stage",
  classes: (className) => lightbox().stage({ class: className }),
});

export const LightboxMedia = createSlotComponent({
  name: "RaftLightboxMedia",
  tag: "div",
  dataSlot: "lightbox-media",
  classes: (className) => lightbox().media({ class: className }),
});

export const LightboxInfoDock = createSlotComponent({
  name: "RaftLightboxInfoDock",
  tag: "div",
  dataSlot: "lightbox-info-dock",
  classes: (className) => lightbox().infoDock({ class: className }),
});

export const LightboxInfoBar = createSlotComponent({
  name: "RaftLightboxInfoBar",
  tag: "div",
  dataSlot: "lightbox-info-bar",
  classes: (className) => lightbox().infoBar({ class: className }),
});

export const LightboxInfoTitle = createSlotComponent({
  name: "RaftLightboxInfoTitle",
  tag: "div",
  dataSlot: "lightbox-info-title",
  classes: (className) => lightbox().infoTitle({ class: className }),
});

export const LightboxInfoActions = createSlotComponent({
  name: "RaftLightboxInfoActions",
  tag: "div",
  dataSlot: "lightbox-info-actions",
  classes: (className) => lightbox().infoActions({ class: className }),
});

export const LightboxThumbnailStrip = createSlotComponent({
  name: "RaftLightboxThumbnailStrip",
  tag: "div",
  dataSlot: "lightbox-thumbnail-strip",
  classes: (className) => lightbox().thumbnailStrip({ class: className }),
});
