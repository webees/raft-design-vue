<script setup lang="ts">
import { computed, toRef, useAttrs } from "vue";
import { SelectTrigger } from "reka-ui";
import { select } from "./select.variants";
import { provideSelectFit, useSelectChrome } from "./select-context";

defineOptions({ name: "RaftSelectTrigger", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    asChild?: boolean;
    fit?: boolean;
    invalid?: boolean;
  }>(),
  { disabled: false, asChild: false, fit: false, invalid: false },
);

const attrs = useAttrs();
const chrome = useSelectChrome();
const fitRef = toRef(props, "fit");
provideSelectFit(fitRef);

const styles = computed(() => select({ chrome: chrome.value, fit: props.fit }));
const triggerClass = computed(() => styles.value.trigger({ className: attrs.class as string }));
const contentClass = computed(() => styles.value.triggerContent());
</script>

<template>
  <SelectTrigger
    v-bind="{ ...attrs, class: undefined }"
    :class="triggerClass"
    :disabled="disabled"
    :as-child="asChild"
    :data-invalid="invalid || undefined"
    :aria-invalid="invalid || undefined"
    data-slot="select-trigger"
  >
    <span
      data-slot="select-trigger-content"
      data-picker-trigger-content="select"
      class="flex min-w-0 flex-1 items-center gap-1.5"
      :class="contentClass"
    >
      <slot />
    </span>
  </SelectTrigger>
</template>
