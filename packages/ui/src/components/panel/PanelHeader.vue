<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { panel, panelHeader } from "./panel.variants";

defineOptions({ name: "RaftPanelHeader", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "div", asChild: false });
const attrs = useAttrs();
const rootClass = computed(() => {
  const header = panelHeader().header({ className: attrs.class as string });
  return [header, panel().header({ className: "" })].filter(Boolean).join(" ");
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'panel-header'"
    data-panel-frame-header=""
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
