<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { SelectValue } from "reka-ui";

import { toElement } from "../../lib/dom";
import { useOverflowTitle } from "../../lib/use-overflow-title";
import { select } from "./select.variants";
import { selectItemLabels, useSelectFit, useSelectItems } from "./select-context";

defineOptions({ name: "RaftSelectValue", inheritAttrs: false });

const props = withDefaults(defineProps<{ placeholder?: string; title?: string }>(), {
  placeholder: undefined,
  title: undefined,
});

const attrs = useAttrs();
const fit = useSelectFit();
const items = useSelectItems();
const styles = select();
const valueEl = ref<HTMLElement | null>(null);
const setValue = (element: unknown) => {
  valueEl.value = toElement(element);
};
useOverflowTitle(valueEl, () => props.title);

const labels = computed(() => selectItemLabels(items.value));
const valueClass = computed(() =>
  styles.value({ className: [fit.value ? "col-start-1 row-start-1" : "", attrs.class as string] }),
);
const frameClass = computed(() => styles.fitFrame());
const sizerClass = computed(() => styles.sizer());
const sizerLabelClass = computed(() => styles.sizerLabel({ className: "after:content-[attr(data-label)]" }));
const sizerPlaceholderClass = computed(() =>
  styles.sizerPlaceholder({ className: "after:content-[attr(data-label)]" }),
);
</script>

<template>
  <span v-if="fit" :class="frameClass" data-slot="select-value-fit">
    <SelectValue
      :ref="setValue"
      v-bind="{ ...attrs, class: undefined }"
      :class="valueClass"
      :placeholder="placeholder"
      :title="title"
      data-slot="select-value"
    >
      <slot />
    </SelectValue>
    <span aria-hidden data-slot="select-value-sizer" :class="sizerClass">
      <span v-if="placeholder" :data-label="placeholder" :class="sizerPlaceholderClass" />
      <span v-for="(label, index) in labels" :key="index" :data-label="label" :class="sizerLabelClass" />
    </span>
  </span>
  <SelectValue
    v-else
    :ref="setValue"
    v-bind="{ ...attrs, class: undefined }"
    :class="valueClass"
    :placeholder="placeholder"
    :title="title"
    data-slot="select-value"
  >
    <slot />
  </SelectValue>
</template>
