import MeterRoot from "./Meter.vue";
import MeterHeaderRoot from "./MeterHeader.vue";
import MeterLabelRoot from "./MeterLabel.vue";
import MeterValueRoot from "./MeterValue.vue";
import MeterTrackRoot from "./MeterTrack.vue";
import MeterIndicatorRoot from "./MeterIndicator.vue";

export const Meter = MeterRoot;
export const MeterHeader = MeterHeaderRoot;
export const MeterLabel = MeterLabelRoot;
export const MeterValue = MeterValueRoot;
export const MeterTrack = MeterTrackRoot;
export const MeterIndicator = MeterIndicatorRoot;

export { meter } from "./meter.variants";
export type { MeterLevel, MeterSize } from "./meter.variants";
