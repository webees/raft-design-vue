<script setup lang="ts">
import { ComboboxContent } from "reka-ui";

import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import ComboboxPortal from "./ComboboxPortal.vue";

defineOptions({ name: "RaftComboboxContent", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
  }>(),
  { side: "bottom", align: "start", sideOffset: 4, alignOffset: 0 },
);
const attrs = useAttrs();
const classes = computed(() => cn(combobox().content(), props.className, attrs.class as string));
const vars = {
  "--available-width": "var(--reka-combobox-content-available-width)",
  "--available-height": "var(--reka-combobox-content-available-height)",
  "--anchor-width": "var(--reka-combobox-trigger-width)",
};
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="{ ...attrs, class: undefined }"
      data-slot="combobox-content"
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      :class="classes"
      :style="vars"
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
