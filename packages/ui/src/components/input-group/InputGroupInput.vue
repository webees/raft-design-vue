<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { inputGroup } from "./input-group.variants";

defineOptions({ name: "RaftInputGroupInput", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    invalid?: boolean;
    suppressPasswordManager?: boolean;
  }>(),
  { invalid: false, suppressPasswordManager: false },
);

const attrs = useAttrs();
const controlClass = computed(() =>
  cn(
    inputGroup().control(),
    props.suppressPasswordManager && "keeper-ignore",
    props.class,
    attrs.class as string,
  ),
);
</script>

<template>
  <input
    v-bind="{ ...attrs, class: undefined }"
    data-slot="input-group-control"
    :data-invalid="invalid || undefined"
    :aria-invalid="invalid ? 'true' : undefined"
    :data-1p-ignore="suppressPasswordManager ? 'true' : undefined"
    :data-bwignore="suppressPasswordManager ? 'true' : undefined"
    :data-form-type="suppressPasswordManager ? 'other' : undefined"
    :data-lpignore="suppressPasswordManager ? 'true' : undefined"
    :class="controlClass"
  />
</template>
