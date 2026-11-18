<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxViewport } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { combobox } from "./combobox.recipe";

defineOptions({ name: "RaftComboboxList", inheritAttrs: false });

const attrs = useAttrs();
const styles = combobox();
const area = useScrollAreaContainer({ guttersPosition: "absolute", overscroll: "contain" });

const frameClass = computed(() =>
  cn(area.blockClassName.value, styles.listFrame({ class: attrs.class as string | undefined })),
);
const listClass = computed(() =>
  cn(area.scroller.value, styles.list({ class: attrs.class as string | undefined })),
);
const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const setContainer = (element: unknown) => {
  area.containerRef.value = toElement(element);
};
</script>

<template>
  <div data-slot="combobox-list-frame" :class="frameClass" :style="area.blockStyle.value">
    <ComboboxViewport
      :ref="setContainer"
      v-bind="restAttrs"
      data-slot="combobox-list"
      tabindex="-1"
      :class="listClass"
    >
      <slot />
    </ComboboxViewport>
    <ScrollAreaGutters :binding="area" />
  </div>
</template>
