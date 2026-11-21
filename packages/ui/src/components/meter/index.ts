import MeterRoot from "./Meter.vue";
import MeterHeaderRoot from "./MeterHeader.vue";
import MeterTrackRoot from "./MeterTrack.vue";
import { MeterIndicator, MeterLabel, MeterValue } from "./parts";

export const Meter = MeterRoot;
export const MeterHeader = MeterHeaderRoot;
export const MeterTrack = MeterTrackRoot;
export { MeterIndicator, MeterLabel, MeterValue };

export { meter } from "./meter.variants";
export type { MeterLevel, MeterSize } from "./meter.variants";
