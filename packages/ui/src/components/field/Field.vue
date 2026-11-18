<script setup lang="ts">
import { fieldVariants } from "./field.variants";
import { provideFieldContext } from "./field-context";

defineOptions({ name: "RaftField", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    size?: "sm" | "md";
  }>(),
  { disabled: false, invalid: false, size: "md" },
);

const attrs = useAttrs();
const generatedId = useId();
const controlId = computed(() => props.id ?? `raft-field-${generatedId}`);

provideFieldContext({
  controlId: controlId.value,
  descriptionId: `${controlId.value}-description`,
  errorId: `${controlId.value}-error`,
  disabled: props.disabled,
  invalid: props.invalid,
  size: props.size,
});

const rootClass = computed(() => fieldVariants().root({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="field"
    :data-disabled="disabled ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
