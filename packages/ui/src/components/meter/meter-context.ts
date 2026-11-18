import type { ComputedRef, InjectionKey } from "vue";
import type { MeterLevel, MeterSize } from "./meter.variants";

export interface MeterContextValue {
  labelId: string;
  level: MeterLevel;
  share: number;
  size: MeterSize;
  valueText: string;
}

export const meterContextKey: InjectionKey<ComputedRef<MeterContextValue>> = Symbol("raft-meter");
