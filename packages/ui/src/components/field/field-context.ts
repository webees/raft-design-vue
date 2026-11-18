import { inject, provide, type InjectionKey } from "vue";

export interface FieldContext {
  controlId: string;
  descriptionId?: string;
  errorId?: string;
  disabled: boolean;
  invalid: boolean;
  size: "sm" | "md";
}

const FIELD_CONTEXT: InjectionKey<FieldContext> = Symbol("raft-field");

export function provideFieldContext(context: FieldContext) {
  provide(FIELD_CONTEXT, context);
}

export function useFieldContext(): FieldContext | undefined {
  return inject(FIELD_CONTEXT, undefined);
}
