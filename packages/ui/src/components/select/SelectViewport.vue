<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectViewport } from "reka-ui";

import { cn } from "../../lib/cn";
import { toElement } from "../../lib/dom";
import ScrollAreaGutters from "../scroll-area/ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "../scroll-area/use-scroll-area-container";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectList", inheritAttrs: false });

const attrs = useAttrs();
const styles = select();
const area = useScrollAreaContainer({ guttersPosition: "absolute", overscroll: "contain" });

const frameClass = computed(() => cn(area.blockClassName.value, styles.listFrame()));
const listClass = computed(() =>
  cn(area.scroller.value, styles.list({ className: attrs.class as string })),
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
  <div data-slot="select-list-frame" :class="frameClass" :style="area.blockStyle.value">
    <SelectViewport
      :ref="setContainer"
      v-bind="restAttrs"
      :class="listClass"
      data-slot="select-list"
    >
      <slot />
    </SelectViewport>
    <ScrollAreaGutters :binding="area" />
  </div>
</template>
