<script setup lang="ts">
import { cn } from "../../lib/cn";
import { inputVariants } from "./input.variants";

defineOptions({ name: "RaftInput", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    invalid?: boolean;
    suppressPasswordManager?: boolean;
  }>(),
  { invalid: false, suppressPasswordManager: false },
);

const attrs = useAttrs();

const rootClass = computed(() =>
  inputVariants().root({
    className: cn(props.suppressPasswordManager && "keeper-ignore", attrs.class as string),
  }),
);

const managerAttrs = computed(() =>
  props.suppressPasswordManager
    ? {
        "data-1p-ignore": "true",
        "data-bwignore": "true",
        "data-form-type": "other",
        "data-lpignore": "true",
      }
    : {},
);

const invalidAttrs = computed(() => {
  const fromAttrs = attrs["data-invalid"] as string | undefined;
  const invalid = props.invalid || fromAttrs !== undefined;
  return {
    "data-invalid": invalid ? (fromAttrs ?? "") : undefined,
    "aria-invalid": invalid ? ("true" as const) : undefined,
  };
});

const controlAttrs = computed(() => ({
  ...attrs,
  class: undefined,
  ...managerAttrs.value,
  ...invalidAttrs.value,
}));
const slotName = computed(() => (attrs["data-slot"] as string | undefined) ?? "input");
</script>

<template>
  <input v-bind="controlAttrs" :class="rootClass" :data-slot="slotName" />
</template>
