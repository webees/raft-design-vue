<script setup lang="ts">
import type { Component } from "vue";

import { cn } from "../../lib/cn";
import { omitAttrs } from "../../lib/attrs";
import { toElement } from "../../lib/dom";
import ScrollAreaGutters from "./ScrollAreaGutters.vue";
import { useScrollAreaContainer } from "./use-scroll-area-container";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  viewport: Component;
  viewportSlot: string;
  frameClass?: string;
  listClass?: string;
  tabindex?: string;
}>();

const attrs = useAttrs();
const area = useScrollAreaContainer({ guttersPosition: "absolute", overscroll: "contain" });
const restAttrs = computed(() => omitAttrs(attrs, "class"));
const setContainer = (element: unknown) => {
  area.containerRef.value = toElement(element);
};
</script>

<template>
  <div
    :data-slot="`${viewportSlot}-frame`"
    :class="cn(area.blockClassName.value, frameClass)"
    :style="area.blockStyle.value"
  >
    <component
      :is="viewport"
      :ref="setContainer"
      v-bind="restAttrs"
      :data-slot="viewportSlot"
      :tabindex="tabindex"
      :class="cn(area.scroller.value, listClass)"
    >
      <slot />
    </component>
    <ScrollAreaGutters :binding="area" />
  </div>
</template>
