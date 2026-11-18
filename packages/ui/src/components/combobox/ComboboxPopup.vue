<script setup lang="ts">
import { combobox } from "./combobox.recipe";

defineOptions({ name: "RaftComboboxPopup", inheritAttrs: false });

const attrs = useAttrs();
const classes = computed(() => combobox().content({ class: attrs.class as string | undefined }));
const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const vars = {
  "--available-width": "var(--reka-combobox-content-available-width)",
  "--available-height": "var(--reka-combobox-content-available-height)",
  "--anchor-width": "var(--reka-combobox-trigger-width)",
};
</script>

<template>
  <div v-bind="restAttrs" data-slot="combobox-content" :class="classes" :style="vars"><slot /></div>
</template>
