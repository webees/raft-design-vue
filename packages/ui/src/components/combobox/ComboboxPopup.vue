<script setup lang="ts">
import { combobox } from "./combobox.recipe";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftComboboxPopup", inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() => combobox().content({ class: attrs.class as string | undefined }));
const restAttrs = computed(() => omitAttrs(attrs, "class"));
const vars = {
  "--available-width": "var(--reka-combobox-content-available-width)",
  "--available-height": "var(--reka-combobox-content-available-height)",
  "--anchor-width": "var(--reka-combobox-trigger-width)",
};
</script>

<template>
  <div v-bind="restAttrs" data-slot="combobox-content" :class="classes" :style="vars"><slot /></div>
</template>
