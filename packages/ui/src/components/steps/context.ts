import type { InjectionKey } from "vue";
import type { StepStatus } from ".";

export type StepsContextValue = {
  current: number | undefined;
  status: StepStatus;
  finishIcon: unknown;
  errorIcon: unknown;
  finishLabel: string;
  errorLabel: string;
  select: ((index: number) => void) | undefined;
};

export const STEPS_KEY: InjectionKey<StepsContextValue> = Symbol("raft-steps");
